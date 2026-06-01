"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrackingPanel } from "@/components/shared/tracking-panel";
import type { AppointmentRecord } from "@/types/domain";

export default function PublicStatusPage() {
  const [code, setCode] = useState("");
  const [record, setRecord] = useState<AppointmentRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = async () => {
    setLoading(true);
    setError(null);
    setRecord(null);
    try {
      const res = await fetch(`/api/status/${encodeURIComponent(code)}`);
      if (!res.ok) {
        setError("Tracking code not found");
        return;
      }
      const data = await res.json();
      setRecord(data);
    } catch {
      setError("Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-semibold">Track Your Order</h1>
        <p className="mt-2 text-zinc-400">Enter your tracking code to see the current status of your garment.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Input placeholder="Enter code" value={code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)} />
          <div className="sm:col-span-2 flex gap-3">
            <Button className="w-full sm:w-auto" onClick={lookup} disabled={loading || !code}>{loading ? "Looking up…" : "Check Status"}</Button>
          </div>
        </div>

        {error ? <div className="mt-4 text-sm text-rose-400">{error}</div> : null}

        {record ? (
          <div className="mt-8">
            <TrackingPanel initial={record} />
          </div>
        ) : null}
      </motion.div>
    </main>
  );
}
