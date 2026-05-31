"use client";

import { useEffect, useMemo, useState } from "react";
import { STATUS_STAGES, type AppointmentRecord } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminAppointmentsPage() {
  const [rows, setRows] = useState<AppointmentRecord[]>([]);
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/admin/appointments")
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  const filtered = useMemo(() => rows.filter((r) => r.customerName.toLowerCase().includes(query.toLowerCase()) || r.phoneNumber.includes(query)), [rows, query]);

  const updateStatus = async (id: string, statusIndex: number) => {
    await fetch("/api/admin/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, statusIndex, adminNotes: notes[id] }),
    });

    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, statusIndex, status: STATUS_STAGES[statusIndex - 1], completionPercent: Math.round((statusIndex / 6) * 100), adminNotes: notes[id] ?? r.adminNotes } : r)));
  };

  const remove = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold">Appointments</h1>
            <Input placeholder="Search customer or phone" className="max-w-xs" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left text-sm">
              <thead className="text-zinc-400">
                <tr>
                  <th className="p-2">Customer</th><th className="p-2">Phone</th><th className="p-2">Type</th><th className="p-2">Date</th><th className="p-2">Status</th><th className="p-2">Admin Note</th><th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-zinc-800">
                    <td className="p-2">{r.customerName}</td>
                    <td className="p-2">{r.phoneNumber}</td>
                    <td className="p-2">{r.clothingType}</td>
                    <td className="p-2">{r.preferredDate}</td>
                    <td className="p-2">{r.status}</td>
                    <td className="p-2">
                      <Input
                        placeholder="Internal note"
                        value={notes[r.id] ?? r.adminNotes ?? ""}
                        onChange={(e) => setNotes((prev) => ({ ...prev, [r.id]: e.target.value }))}
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, Math.min(r.statusIndex + 1, 6))}>Next Stage</Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
