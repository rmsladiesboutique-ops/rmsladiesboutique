"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { MeasurementField } from "@/types/domain";

export default function AdminMeasurementsPage() {
  const [rows, setRows] = useState<MeasurementField[]>([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [required, setRequired] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/measurement-fields");
        if (!res.ok) {
          if (res.status === 401) router.push("/admin/login");
          return;
        }
        const d = await res.json();
        setRows(d);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [router]);

  const add = async () => {
    const payload = { label, type, required };
    const res = await fetch("/api/admin/measurement-fields", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) {
      if (res.status === 401) router.push("/admin/login");
      return;
    }
    if (res.ok) {
      const updated = await res.json();
      setRows((prev) => [updated, ...prev]);
      setLabel("");
      setType("text");
      setRequired(false);
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/measurement-fields?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardContent className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Measurement Fields</h1>
            <p className="mt-2 text-sm text-zinc-400">Manage the measurement inputs customers complete during booking.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
            <Input placeholder="Type (text|number|select|textarea)" value={type} onChange={(e) => setType(e.target.value)} />
            <label className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-100">
              <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-amber-500" />
              Required field
            </label>
            <Button onClick={add}>Add Field</Button>
          </div>

          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="rounded-3xl border border-zinc-800 p-4 shadow-sm shadow-black/10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-medium">{r.label}</div>
                    <div className="text-sm text-zinc-400">{r.type} {r.required ? "• required" : ""}</div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
