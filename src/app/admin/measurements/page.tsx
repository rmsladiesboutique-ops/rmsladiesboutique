"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MeasurementField } from "@/types/domain";

export const dynamic = "force-dynamic";

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
    const res = await fetch("/api/admin/measurement-fields", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
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
      const res = await fetch(`/api/admin/measurement-fields?id=${encodeURIComponent(id)}`, { method: "DELETE" });
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
    <div className="admin-page">
      <div className="admin-panel space-y-6">
        <div>
          <p className="section-label">Configuration</p>
          <h1 className="text-section-heading text-[#111827]">Measurement Fields</h1>
          <p className="mt-2 text-small text-[#6B7280]">
            Manage the measurement inputs customers complete during booking.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
          <Input placeholder="Type (text|number|select|textarea)" value={type} onChange={(e) => setType(e.target.value)} />
          <label className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#FAF7F2] px-4 py-3 text-sm text-[#1F2937]">
            <input
              type="checkbox"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
              className="h-4 w-4 rounded border-[#E5E7EB] text-[#B8864A]"
            />
            Required field
          </label>
          <Button onClick={add}>Add Field</Button>
        </div>

        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="admin-mobile-card">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold text-[#111827]">{r.label}</div>
                  <div className="text-small text-[#6B7280]">
                    {r.type} {r.required ? "• required" : ""}
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-rose-600 hover:bg-rose-50" onClick={() => remove(r.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
