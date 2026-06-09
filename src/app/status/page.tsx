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
  const [pageDescription, setPageDescription] = useState("Enter your tracking code and instantly reveal your garment's progress, production milestones, and delivery status.");

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
    <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-[2rem] p-8 md:p-10 lg:p-12"
        >
          <div className="space-y-5">
            <div>
              <p className="section-label">Order Status</p>
              <h1 className="text-section-heading mt-3 text-[#111827]">{pageTitle}</h1>
              <div className="gold-line mt-5" />
            </div>
            <p className="text-body text-[#6B7280]">{pageDescription}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
            />
            <Button className="w-full sm:w-auto" onClick={lookup} disabled={loading || !code}>
              {loading ? "Looking up…" : "Check Status"}
            </Button>
          </div>
          <p className="mt-4 text-small text-[#6B7280]">
            Use the 6-digit booking code from your confirmation message to view progress and delivery updates.
          </p>
          {error ? (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
              {error}
            </div>
          ) : null}

          {record ? (
            <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <TrackingPanel initial={record} />
            </div>
          ) : null}
        </motion.div>
      </div>
    </main>
  );
}
