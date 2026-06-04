"use client";

import React, { useEffect, useState } from "react";
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
  const [pageTitle, setPageTitle] = useState("Track Your Order");
  const [pageDescription, setPageDescription] = useState("Enter your tracking code and instantly reveal your garment’s progress, production milestones, and delivery status.");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site-settings");
        if (!res.ok) return;
        const data = await res.json();
        const homepage = data.homepageContent;
        if (homepage?.statusPageTitle) setPageTitle(homepage.statusPageTitle);
        if (homepage?.statusPageSubtitle) setPageDescription(homepage.statusPageSubtitle);
      } catch {
        // ignore
      }
    })();
  }, []);

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
    <main className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="glass-panel rounded-[2.5rem] border border-amber-200/20 p-6 md:p-8 lg:p-10">
        <div className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Order Status</p>
            <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{pageTitle}</h1>
          </div>
          <p className="text-base leading-8 text-foreground/72">{pageDescription}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
          <Input
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="Enter code"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
          />
          <Button className="w-full sm:w-auto" onClick={lookup} disabled={loading || !code}>{loading ? "Looking up…" : "Check Status"}</Button>
        </div>
        <p className="mt-3 text-sm text-foreground/60">Use the 6-digit booking code from your confirmation message to view progress and delivery updates.</p>

        <p className="mt-3 text-sm text-foreground/60">Use the 6-digit booking code from your confirmation message to view progress and delivery updates.</p>
        {error ? <div className="mt-4 rounded-[1.5rem] border border-rose-300/25 bg-rose-50/60 p-4 text-sm text-rose-500">{error}</div> : null}

        {record ? (
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/5 p-6 shadow-[0_30px_90px_-56px_rgba(37,25,15,0.45)]">
            <TrackingPanel initial={record} />
          </div>
        ) : null}
      </motion.div>
    </main>
  );
}
