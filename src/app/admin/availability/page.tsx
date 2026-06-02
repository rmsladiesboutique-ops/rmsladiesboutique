"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  const [availability, setAvailability] = useState<AvailabilityPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newSlots, setNewSlots] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/availability")
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.error || "Failed to load availability");
        }
        return res.json();
      })
      .then((data) => {
        setAvailability(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const rules = availability?.rules ?? [];
  const holidayMode = availability?.holidayMode ?? false;

  const handleToggleRule = (id: string) => {
    setAvailability((prev) =>
      prev
        ? {
            ...prev,
            rules: prev.rules.map((rule) =>
              rule.id === id ? { ...rule, isBlocked: !rule.isBlocked } : rule,
            ),
          }
        : prev,
    );
  };

  const handleToggleHoliday = () => {
    setAvailability((prev) => (prev ? { ...prev, holidayMode: !prev.holidayMode } : prev));
  };

  const handleAddRule = () => {
    if (!newDate.trim()) {
      return;
    }

    setAvailability((prev) =>
      prev
        ? {
            ...prev,
            rules: [
              ...prev.rules,
              {
                id: crypto.randomUUID(),
                date: newDate,
                slots: newSlots
                  .split(",")
                  .map((slot) => slot.trim())
                  .filter(Boolean),
                isBlocked: false,
              },
            ],
          }
        : {
            holidayMode: false,
            rules: [
              {
                id: crypto.randomUUID(),
                date: newDate,
                slots: newSlots
                  .split(",")
                  .map((slot) => slot.trim())
                  .filter(Boolean),
                isBlocked: false,
              },
            ],
          },
    );

    setNewDate("");
    setNewSlots("");
  };

  const handleSave = async () => {
    if (!availability) return;
    setSaving(true);
    setError(null);

    const res = await fetch("/api/admin/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(availability),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || "Unable to save availability");
      setSaving(false);
      return;
    }

    const data = await res.json();
    setAvailability(data);
    setSaving(false);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <Card>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Availability Management</h1>
              <p className="text-sm text-zinc-400">Customers only see open slots from this configuration.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={handleToggleHoliday} disabled={loading || !availability}>
                {holidayMode ? "Disable" : "Enable"} Holiday Mode
              </Button>
              <Button onClick={handleSave} disabled={loading || saving || !availability}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>

          {error ? <p className="rounded-lg border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-700">{error}</p> : null}
          {loading ? (
            <p className="text-sm text-zinc-400">Loading availability...</p>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <p className="text-sm font-medium">Holiday Mode</p>
                  <p className="mt-2 text-sm text-zinc-400">{holidayMode ? "Holiday mode is on. Booking is paused across the studio." : "Holiday mode is off. Customers can book open slot dates."}</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <p className="text-sm font-medium">Rule count</p>
                  <p className="mt-2 text-sm text-zinc-400">{rules.length} available date{rules.length === 1 ? "" : "s"} configured.</p>
                </div>
              </div>

              <div className="space-y-3">
                {rules.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-zinc-700 p-5 text-sm text-zinc-400">No availability rules found. Add dates and slots to open booking days.</div>
                ) : (
                  rules.map((rule) => (
                    <div key={rule.id} className="flex flex-col gap-3 rounded-md border border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium">{rule.date}</p>
                        <p className="text-sm text-zinc-400">{rule.slots.length ? rule.slots.join(", ") : "No slots"}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleToggleRule(rule.id)}>
                        {rule.isBlocked ? "Unblock" : "Block"}
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <div className="rounded-xl border border-zinc-800 p-5">
                <h2 className="text-lg font-semibold">Add new date</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-zinc-400">
                    Date
                    <input
                      type="date"
                      value={newDate}
                      onChange={(event) => setNewDate(event.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-white outline-none focus:border-amber-300"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-zinc-400">
                    Slots (comma separated)
                    <input
                      type="text"
                      placeholder="10:00, 12:00, 14:00"
                      value={newSlots}
                      onChange={(event) => setNewSlots(event.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-white outline-none focus:border-amber-300"
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
        </CardContent>
      </Card>
    </main>
  );
}
