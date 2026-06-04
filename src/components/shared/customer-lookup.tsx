"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusTimeline } from "@/components/shared/status-timeline";
import type { AppointmentRecord } from "@/types/domain";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function CustomerLookup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [record, setRecord] = useState<AppointmentRecord | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  const validateInputs = () => {
    setValidationError("");
    
    if (!phoneNumber.trim()) {
      setValidationError("Please enter your phone number");
      return false;
    }
    
    if (phoneNumber.trim().length < 8) {
      setValidationError("Phone number must be at least 8 digits");
      return false;
    }
    
    if (!customerCode.trim()) {
      setValidationError("Please enter your 6-digit code");
      return false;
    }
    
    if (customerCode.trim().length !== 6 || !/^\d{6}$/.test(customerCode.trim())) {
      setValidationError("Code must be exactly 6 digits");
      return false;
    }
    
    return true;
  };

  const submit = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/customer-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phoneNumber: phoneNumber.trim(), 
          customerCode: customerCode.trim() 
        }),
      });

      if (!res.ok) {
        setError("We couldn't find an appointment matching those credentials. Please double-check your phone number and code.");
        setRecord(null);
        return;
      }

      const data = await res.json();
      setError("");
      setRecord(data);
    } catch (err) {
      setError("An error occurred while fetching your appointment. Please try again.");
      setRecord(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const downloadInvoice = () => {
    if (!record) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("RMS Ladies Boutique - Appointment Invoice", 14, 20);
    autoTable(doc, {
      startY: 30,
      body: [
        ["Customer Name", record.customerName],
        ["Booking Code", record.customerCode],
        ["Phone", record.phoneNumber],
        ["Appointment Date", `${record.preferredDate} at ${record.preferredTime}`],
        ["Service Type", record.clothingType],
        ["Current Status", record.status],
        ["Progress", `${record.completionPercent}% complete`],
        ["Estimated Completion", record.estimatedCompletionDate],
      ],
    });
    doc.save(`appointment-${record.customerCode}.pdf`);
  };

  const generateQr = async () => {
    if (!record) return;
    const dataUrl = await QRCode.toDataURL(`${window.location.origin}/tracking/${record.customerCode}`);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `booking-${record.customerCode}.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-700 dark:text-amber-200">Secure Lookup</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Track Your Appointment</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Enter your phone number and 6-digit booking code to view your order status</p>
          </div>
          
          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number
                </label>
                <Input 
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="e.g., +1 555 123 4567" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  className="text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 dark:text-slate-300 mb-2">
                  6-Digit Code
                </label>
                <Input 
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="e.g., 123456" 
                  value={customerCode} 
                  onChange={(e) => setCustomerCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  maxLength={6}
                  className="text-base tracking-widest"
                />
              </div>
            </div>

            {validationError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200/50 bg-red-50/50 p-3 dark:border-red-900/30 dark:bg-red-950/20">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{validationError}</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200/50 bg-red-50/50 p-3 dark:border-red-900/30 dark:bg-red-950/20">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <Button 
              onClick={submit} 
              className="w-full" 
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                'Track My Appointment'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {record && (
        <Card className="border-emerald-200/50 dark:border-emerald-900/30">
          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{record.customerName}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Booking Code: {record.customerCode}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-amber-200/30 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Status</p>
                <p className="mt-2 text-lg font-semibold text-amber-900 dark:text-amber-100">{record.status}</p>
              </div>
              <div className="rounded-2xl border border-blue-200/30 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                <p className="text-xs uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">Progress</p>
                <div className="mt-2">
                  <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">{record.completionPercent}%</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-blue-200/40 overflow-hidden dark:bg-blue-900/40">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-500"
                      style={{ width: `${record.completionPercent}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-200/30 bg-emerald-50/50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">Estimated Ready</p>
                <p className="mt-2 text-lg font-semibold text-emerald-900 dark:text-emerald-100">{record.estimatedCompletionDate}</p>
              </div>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-200/50 bg-slate-50/50 p-4 dark:border-slate-700/50 dark:bg-slate-900/20">
              <p className="text-xs uppercase tracking-[0.08em] font-semibold text-slate-700 dark:text-slate-300">Appointment Details</p>
              <div className="grid gap-2 text-sm">
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-medium text-slate-900 dark:text-white">Date & Time:</span> {record.preferredDate} at {record.preferredTime}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-medium text-slate-900 dark:text-white">Service:</span> {record.clothingType}
                </p>
                {record.adminNotes && (
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium text-slate-900 dark:text-white">Notes:</span> {record.adminNotes}
                  </p>
                )}
              </div>
            </div>

            <StatusTimeline statusIndex={record.statusIndex} />

            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/tracking/${record.customerCode}`)}
                className="w-full"
              >
                View Timeline
              </Button>
              <Button 
                variant="outline" 
                onClick={generateQr}
                className="w-full"
              >
                Download QR Code
              </Button>
              <Button 
                onClick={downloadInvoice}
                className="w-full"
              >
                Download Receipt
              </Button>
            </div>

            <a 
              className="inline-flex items-center justify-center w-full rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-800 dark:text-emerald-100 hover:bg-emerald-500/20 transition-colors gap-2" 
              href="https://wa.me/15552003456" 
              target="_blank" 
              rel="noreferrer"
            >
              💬 Contact Us on WhatsApp for Updates
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
