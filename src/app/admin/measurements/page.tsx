"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MeasurementField } from "@/types/domain";

export default function AdminMeasurementsPage() {
  const [rows, setRows] = useState<MeasurementField[]>([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [required, setRequired] = useState(false);

  useEffect(() => {
    fetch("/api/admin/measurement-fields").then((r) => r.json()).then((d) => setRows(d));
  }, []);

  const add = async () => {
    const payload = { label, type, required };
    const res = await fetch("/api/admin/measurement-fields", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      const updated = await res.json();
      setRows((prev) => [updated, ...prev]);
      setLabel("");
      setType("text");
      setRequired(false);
    }
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/measurement-fields?id=${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Measurement Fields</h1>
      <div className="space-y-4">
        <Input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        <Input placeholder="Type (text|number|select|textarea)" value={type} onChange={(e) => setType(e.target.value)} />
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} /> <div className="text-sm text-zinc-400">Required</div>
        </div>
        <Button onClick={add}>Add Field</Button>

        <div className="space-y-2 mt-6">
          {rows.map((r) => (
            <div key={r.id} className="rounded-md border border-zinc-800 p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.label}</div>
                <div className="text-sm text-zinc-400">{r.type} {r.required ? "• required" : ""}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
