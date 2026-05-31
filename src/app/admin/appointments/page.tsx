"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircleMore, PhoneCall } from "lucide-react";
import { STATUS_STAGES, type AppointmentRecord } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CUSTOM_STATUS_VALUE = "__custom__";

type StatusDraft = {
  value: string;
  customValue: string;
};

const actionLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-amber-500/50 px-3 py-2 text-xs font-medium text-amber-100 transition-all hover:bg-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70";

function getWhatsAppUrl(phoneNumber: string, customerName: string) {
  const digits = phoneNumber.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello ${customerName}, this is RMS Ladies Boutique. I am reaching out about your appointment and update status.`,
  );

  return `https://wa.me/${digits}?text=${message}`;
}

function getTelUrl(phoneNumber: string) {
  return `tel:${phoneNumber}`;
}

export default function AdminAppointmentsPage() {
  const [rows, setRows] = useState<AppointmentRecord[]>([]);
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [statusDrafts, setStatusDrafts] = useState<Record<string, StatusDraft>>({});

  useEffect(() => {
    fetch("/api/admin/appointments")
      .then((res) => res.json())
      .then((data: AppointmentRecord[]) => {
        setRows(data);
        setStatusDrafts(
          Object.fromEntries(
            data.map((row) => {
              const matchesPreset = STATUS_STAGES.includes(row.status as (typeof STATUS_STAGES)[number]);
              return [row.id, { value: matchesPreset ? row.status : CUSTOM_STATUS_VALUE, customValue: matchesPreset ? "" : row.status }];
            }),
          ),
        );
      });
  }, []);

  const filtered = useMemo(() => rows.filter((r) => r.customerName.toLowerCase().includes(query.toLowerCase()) || r.phoneNumber.includes(query)), [rows, query]);

  const updateStatus = async (id: string) => {
    const row = rows.find((entry) => entry.id === id);
    const draft = statusDrafts[id];

    if (!row || !draft) {
      return;
    }

    const isCustom = draft.value === CUSTOM_STATUS_VALUE;
    const status = isCustom ? draft.customValue.trim() : draft.value;
    const statusIndex = isCustom ? row.statusIndex : STATUS_STAGES.indexOf(draft.value as (typeof STATUS_STAGES)[number]) + 1;

    if (!status) {
      return;
    }

    await fetch("/api/admin/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, statusIndex: isCustom ? undefined : statusIndex, adminNotes: notes[id] }),
    });

    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              statusIndex: isCustom ? r.statusIndex : statusIndex,
              completionPercent: isCustom ? r.completionPercent : Math.round((statusIndex / 6) * 100),
              adminNotes: notes[id] ?? r.adminNotes,
            }
          : r,
      ),
    );

    setStatusDrafts((prev) => ({
      ...prev,
      [id]: { value: isCustom ? CUSTOM_STATUS_VALUE : draft.value, customValue: isCustom ? status : "" },
    }));
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
                    <td className="p-2">
                      <div className="space-y-2">
                        <select
                          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-amber-500"
                          value={statusDrafts[r.id]?.value ?? r.status}
                          onChange={(e) =>
                            setStatusDrafts((prev) => ({
                              ...prev,
                              [r.id]: {
                                value: e.target.value,
                                customValue: e.target.value === CUSTOM_STATUS_VALUE ? prev[r.id]?.customValue ?? r.status : "",
                              },
                            }))
                          }
                        >
                          {STATUS_STAGES.map((stage) => (
                            <option key={stage} value={stage}>
                              {stage}
                            </option>
                          ))}
                          <option value={CUSTOM_STATUS_VALUE}>Custom status…</option>
                        </select>
                        {statusDrafts[r.id]?.value === CUSTOM_STATUS_VALUE ? (
                          <Input
                            placeholder="Type custom status"
                            value={statusDrafts[r.id]?.customValue ?? ""}
                            onChange={(e) =>
                              setStatusDrafts((prev) => ({
                                ...prev,
                                [r.id]: { value: CUSTOM_STATUS_VALUE, customValue: e.target.value },
                              }))
                            }
                          />
                        ) : null}
                      </div>
                    </td>
                    <td className="p-2">
                      <Input
                        placeholder="Internal note"
                        value={notes[r.id] ?? r.adminNotes ?? ""}
                        onChange={(e) => setNotes((prev) => ({ ...prev, [r.id]: e.target.value }))}
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                          <a className={actionLinkClass} href={getTelUrl(r.phoneNumber)} aria-label={`Call ${r.customerName}`}>
                            <PhoneCall className="h-4 w-4" />
                            Call
                          </a>
                          <a
                            className={actionLinkClass}
                            href={getWhatsAppUrl(r.phoneNumber, r.customerName)}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Message ${r.customerName} on WhatsApp`}
                          >
                            <MessageCircleMore className="h-4 w-4" />
                            WhatsApp
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => updateStatus(r.id)}>Save Status</Button>
                          <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>
                        </div>
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
