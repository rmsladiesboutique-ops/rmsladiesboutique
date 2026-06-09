"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleMore, PhoneCall } from "lucide-react";
import { STATUS_STAGES, type AppointmentRecord, type StatusHistoryEntry } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

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
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyEntries, setHistoryEntries] = useState<StatusHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const router = useRouter();

  const loadAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
      const data = (await res.json()) as AppointmentRecord[];
      setRows(data);
      setStatusDrafts(
        Object.fromEntries(
          data.map((row) => {
            const matchesPreset = STATUS_STAGES.includes(row.status as (typeof STATUS_STAGES)[number]);
            return [row.id, { value: matchesPreset ? row.status : CUSTOM_STATUS_VALUE, customValue: matchesPreset ? "" : row.status }];
          }),
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

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

    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, statusIndex: isCustom ? undefined : statusIndex, adminNotes: notes[id] }),
      });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }

    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              statusIndex: isCustom ? r.statusIndex : statusIndex,
              completionPercent: isCustom ? r.completionPercent : Math.round((statusIndex / STATUS_STAGES.length) * 100),
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

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
      await loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const viewHistory = async (id: string) => {
    setHistoryLoading(true);
    setHistoryOpen(true);

    try {
      const res = await fetch(`/api/admin/appointments/${id}/history`);
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        setHistoryEntries([]);
        return;
      }

      const data = (await res.json()) as StatusHistoryEntry[];
      setHistoryEntries(data);
    } catch {
      setHistoryEntries([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <Card>
        <CardContent className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-400">Appointments</p>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold">Customer bookings</h1>
                <span className="rounded-full bg-zinc-900 px-3 py-1 text-sm text-zinc-300">{filtered.length} matching</span>
                <span className="rounded-full bg-zinc-900 px-3 py-1 text-sm text-zinc-300">{rows.length} total</span>
              </div>
              <p className="text-sm text-zinc-400">Search, update status, and manage bookings with one tap.</p>
            </div>
            <Input placeholder="Search customer or phone" className="w-full max-w-xs" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="hidden sm:block overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-950/60 p-3">
            <table className="w-full min-w-[720px] text-left text-sm">
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
                          <Button size="sm" variant="ghost" onClick={() => viewHistory(r.id)}>View History</Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <div className="mt-4 rounded-3xl border border-dashed border-zinc-700 bg-black/10 p-6 text-center text-sm text-zinc-400">No appointments match your search. Adjust the query or refresh the page.</div>
            ) : null}
          </div>

          {/* Mobile card list */}
          <div className="block sm:hidden space-y-3">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-zinc-700 bg-black/10 p-6 text-center text-sm text-zinc-400">
                No appointments available. Try another search or add bookings through the public form.
              </div>
            ) : null}
            {filtered.map((r) => (
              <div key={r.id} className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-sm shadow-black/20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{r.customerName}</div>
                    <div className="text-sm text-zinc-400">{r.phoneNumber} • {r.preferredDate}</div>
                    <div className="mt-2 text-sm text-zinc-200">{r.clothingType}</div>
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
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

                  <div>
                    <Input placeholder="Internal note" value={notes[r.id] ?? r.adminNotes ?? ""} onChange={(e) => setNotes((prev) => ({ ...prev, [r.id]: e.target.value }))} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <a className={`${actionLinkClass} w-full`} href={getTelUrl(r.phoneNumber)} aria-label={`Call ${r.customerName}`}>
                      <PhoneCall className="h-4 w-4" />
                      Call
                    </a>
                    <a className={`${actionLinkClass} w-full`} href={getWhatsAppUrl(r.phoneNumber, r.customerName)} target="_blank" rel="noreferrer" aria-label={`Message ${r.customerName} on WhatsApp`}>
                      <MessageCircleMore className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button className="w-full sm:w-auto" size="sm" variant="outline" onClick={() => updateStatus(r.id)}>Save Status</Button>
                      <Button className="w-full sm:w-auto" size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>
                      <Button className="w-full sm:w-auto" size="sm" variant="ghost" onClick={() => viewHistory(r.id)}>View History</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {historyOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setHistoryOpen(false)} />
              <div className="relative w-[min(800px,95%)] max-h-[80vh] overflow-auto rounded-md bg-zinc-950 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Status History</h3>
                  <Button size="sm" variant="ghost" onClick={() => setHistoryOpen(false)}>Close</Button>
                </div>

                <div className="mt-4 space-y-3">
                  {historyLoading ? (
                    <div>Loading…</div>
                  ) : historyEntries.length === 0 ? (
                    <div className="text-zinc-400">No history available.</div>
                  ) : (
                    historyEntries.map((h) => (
                      <div key={h.id} className="rounded-md border border-zinc-800 p-3">
                        <div className="flex items-center justify-between text-sm text-zinc-300">
                          <div className="font-medium">{h.status}</div>
                          <div className="text-zinc-500">{new Date(h.createdAt).toLocaleString()}</div>
                        </div>
                        {h.adminNotes ? <div className="mt-2 text-sm text-zinc-400">Note: {h.adminNotes}</div> : null}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
}
