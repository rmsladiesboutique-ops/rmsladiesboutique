"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type AvailabilityRule = {
  id: string;
  date: string;
  slots: string[];
  isBlocked: boolean;
};

type AvailabilityPayload = {
  holidayMode: boolean;
  rules: AvailabilityRule[];
};

export default function AdminAvailabilityPage() {
  const router = useRouter();
  const [availability, setAvailability] = useState<AvailabilityPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newSlots, setNewSlots] = useState("");

  const loadAvailability = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/availability", { credentials: "include", cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to load availability");
      }
      const data = await res.json();
      setAvailability(data);
    } catch (err) {
      setError((err as Error)?.message || "Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  const rules = availability?.rules ?? [];
  const holidayMode = availability?.holidayMode ?? false;

  const saveAvailabilityState = async (nextAvailability: AvailabilityPayload) => {
    const previousAvailability = availability;
    setAvailability(nextAvailability);
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/availability", {
        method: "PATCH",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextAvailability),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setAvailability(previousAvailability);
        setError(data?.error || "Unable to save availability");
        return;
      }

      const data = await res.json().catch(() => null);
      if (data?.availability) {
        setAvailability(data.availability);
      } else if (data) {
        setAvailability(data);
      }
    } catch (err) {
      setAvailability(previousAvailability);
      setError((err as Error)?.message || "Unable to save availability");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleRule = async (id: string) => {
    if (!availability) return;

    const nextAvailability = {
      ...availability,
      rules: availability.rules.map((rule) =>
        rule.id === id ? { ...rule, isBlocked: !rule.isBlocked } : rule,
      ),
    };

    await saveAvailabilityState(nextAvailability);
  };

  const handleToggleHoliday = async () => {
    if (!availability) return;

    const nextAvailability = {
      ...availability,
      holidayMode: !availability.holidayMode,
    };

    await saveAvailabilityState(nextAvailability);
  };

  const handleAddRule = async () => {
    if (!newDate.trim()) {
      return;
    }

    const nextRule: AvailabilityRule = {
      id: crypto.randomUUID(),
      date: newDate,
      slots: newSlots
        .split(",")
        .map((slot) => slot.trim())
        .filter(Boolean),
      isBlocked: false,
    };

    const nextAvailability: AvailabilityPayload = {
      holidayMode: availability?.holidayMode ?? false,
      rules: [...(availability?.rules ?? []), nextRule],
    };

    setNewDate("");
    setNewSlots("");
    await saveAvailabilityState(nextAvailability);
  };

  const handleSave = async () => {
    if (!availability) return;
    await saveAvailabilityState(availability);
  };

  const handleDeleteRule = async (id: string) => {
    if (!availability) return;
    if (!window.confirm("Are you sure you want to delete this availability rule?")) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/availability?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }

        setError(data?.error || "Unable to delete availability rule");
        return;
      }

      if (data?.availability) {
        setAvailability(data.availability);
      } else {
        await loadAvailability();
      }
    } catch (err) {
      setError((err as Error)?.message || "Unable to delete availability rule");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-panel space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="section-label">Scheduling</p>
            <h1 className="text-section-heading text-[#111827]">Availability Management</h1>
            <p className="text-small text-[#6B7280]">Customers only see open slots from this configuration.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleToggleHoliday} disabled={loading || !availability}>
              {holidayMode ? "Disable" : "Enable"} Holiday Mode
            </Button>
            <Button onClick={handleSave} disabled={loading || saving || !availability}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>

        {error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p>
        ) : null}

        {loading ? (
          <p className="text-small text-[#6B7280]">Loading availability...</p>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="admin-stat-card">
                <p className="text-sm font-semibold text-[#111827]">Holiday Mode</p>
                <p className="mt-2 text-small text-[#6B7280]">
                  {holidayMode
                    ? "Holiday mode is on. Booking is paused across the studio."
                    : "Holiday mode is off. Customers can book open slot dates."}
                </p>
              </div>
              <div className="admin-stat-card">
                <p className="text-sm font-semibold text-[#111827]">Rule count</p>
                <p className="mt-2 text-small text-[#6B7280]">
                  {rules.length} date{rules.length === 1 ? "" : "s"} configured.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {rules.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAF7F2] p-5 text-sm text-[#6B7280]">
                  No availability rules found. Add dates and slots to open booking days.
                </div>
              ) : (
                rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-[#FAF7F2] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-[#111827]">{rule.date}</p>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            rule.isBlocked
                              ? "bg-rose-100 text-rose-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {rule.isBlocked ? "Blocked" : "Open"}
                        </span>
                      </div>
                      <p className="mt-1 text-small text-[#6B7280]">
                        {rule.slots.length ? rule.slots.join(", ") : "No slots configured"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => handleToggleRule(rule.id)}>
                        {rule.isBlocked ? "Unblock" : "Block"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <h2 className="text-card-heading text-[#111827]">Add new date</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-[#6B7280]">
                  Date
                  <input
                    type="date"
                    value={newDate}
                    onChange={(event) => setNewDate(event.target.value)}
                    className="admin-select"
                  />
                </label>
                <label className="space-y-2 text-sm text-[#6B7280]">
                  Slots (comma separated)
                  <input
                    type="text"
                    placeholder="10:00, 12:00, 14:00"
                    value={newSlots}
                    onChange={(event) => setNewSlots(event.target.value)}
                    className="admin-select"
                  />
                </label>
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={handleAddRule} disabled={!newDate.trim()}>
                  Add date
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
