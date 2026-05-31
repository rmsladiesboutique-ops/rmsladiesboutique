"use client";

import { useState } from "react";
import { mockAvailability } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminAvailabilityPage() {
  const [holidayMode, setHolidayMode] = useState(false);
  const [rules, setRules] = useState(mockAvailability);

  const toggleDate = (id: string) => setRules((prev) => prev.map((r) => (r.id === id ? { ...r, isBlocked: !r.isBlocked } : r)));

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Availability Management</h1>
            <Button variant="outline" onClick={() => setHolidayMode((s) => !s)}>{holidayMode ? "Disable" : "Enable"} Holiday Mode</Button>
          </div>
          <p className="text-sm text-zinc-400">Customers only see open slots from this configuration.</p>
          <div className="space-y-3">
            {rules.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-md border border-zinc-800 p-3">
                <div>
                  <p>{r.date}</p>
                  <p className="text-sm text-zinc-400">{r.slots.length ? r.slots.join(", ") : "No slots"}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toggleDate(r.id)}>{r.isBlocked ? "Unblock" : "Block"}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
