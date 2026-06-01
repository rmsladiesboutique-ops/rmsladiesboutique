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

export function CustomerLookup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [record, setRecord] = useState<AppointmentRecord | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async () => {
    const res = await fetch("/api/customer-lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, customerCode }),
    });

    if (!res.ok) {
      setError("No appointment found for these credentials.");
      setRecord(null);
      return;
    }

    const data = await res.json();
    setError("");
    setRecord(data);
  };

  const downloadInvoice = () => {
    if (!record) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Atelier Noir - Appointment Invoice", 14, 20);
    autoTable(doc, {
      startY: 30,
      body: [
        ["Customer", record.customerName],
        ["Code", record.customerCode],
        ["Phone", record.phoneNumber],
        ["Date", `${record.preferredDate} ${record.preferredTime}`],
        ["Service", record.clothingType],
        ["Status", record.status],
      ],
    });
    doc.save(`invoice-${record.customerCode}.pdf`);
  };

  const generateQr = async () => {
    if (!record) return;
    const dataUrl = await QRCode.toDataURL(`${window.location.origin}/tracking/${record.customerCode}`);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `customer-${record.customerCode}.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-700 dark:text-amber-200">Customer Access</p>
            <h2 className="mt-2 text-2xl font-semibold">Open your order dashboard</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <Input placeholder="6-digit customer code" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} />
            <Button onClick={submit} className="w-full md:w-auto">Track My Order</Button>
          </div>
        </CardContent>
      </Card>
      {error && <p className="text-sm text-red-400">{error}</p>}

      {record && (
        <Card>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">{record.customerName}</h3>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push(`/tracking/${record.customerCode}`)}>Open Timeline</Button>
                <Button variant="outline" onClick={generateQr}>Download QR</Button>
                <Button onClick={downloadInvoice}>Download Invoice</Button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[color:var(--border)] bg-black/5 p-4 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground/45">Status</p>
                <p className="mt-2 text-sm font-medium">{record.status}</p>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-black/5 p-4 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground/45">Progress</p>
                <p className="mt-2 text-sm font-medium">{record.completionPercent}% complete</p>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-black/5 p-4 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground/45">Estimated</p>
                <p className="mt-2 text-sm font-medium">{record.estimatedCompletionDate}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/65">Admin notes: {record.adminNotes || "No notes yet"}</p>
            <StatusTimeline statusIndex={record.statusIndex} />
            <a className="inline-flex w-fit items-center rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-800 dark:text-amber-100" href="https://wa.me/15552003456" target="_blank" rel="noreferrer">Contact us on WhatsApp</a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
