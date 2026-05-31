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
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <Input placeholder="6-digit customer code" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} />
          <Button onClick={submit}>Track My Order</Button>
        </CardContent>
      </Card>
      {error && <p className="text-sm text-red-400">{error}</p>}

      {record && (
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">{record.customerName}</h3>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push(`/tracking/${record.customerCode}`)}>Open Timeline</Button>
                <Button variant="outline" onClick={generateQr}>Download QR</Button>
                <Button onClick={downloadInvoice}>Download Invoice</Button>
              </div>
            </div>
            <p className="text-sm text-zinc-300">Status: {record.status} ({record.completionPercent}%)</p>
            <p className="text-sm text-zinc-300">Estimated completion: {record.estimatedCompletionDate}</p>
            <p className="text-sm text-zinc-400">Admin notes: {record.adminNotes || "No notes yet"}</p>
            <StatusTimeline statusIndex={record.statusIndex} />
            <a className="text-sm text-amber-300 underline" href="https://wa.me/15552003456" target="_blank" rel="noreferrer">Contact us on WhatsApp</a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
