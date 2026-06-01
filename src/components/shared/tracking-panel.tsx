"use client";

import { StatusTimeline } from "@/components/shared/status-timeline";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeStatus } from "@/hooks/use-realtime-status";
import type { AppointmentRecord } from "@/types/domain";
import { motion } from "framer-motion";

export function TrackingPanel({ initial }: { initial: AppointmentRecord }) {
  const record = useRealtimeStatus(initial);

  return (
    <Card className="mt-8">
      <CardContent className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <p className="text-lg">{record.customerName}</p>
          <p className="text-sm text-zinc-300">Current status: {record.status}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-300">Progress: {record.completionPercent}%</p>
            <p className="text-sm text-zinc-400">Estimated: {record.estimatedCompletionDate}</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800 mt-2">
            <motion.div
              className="h-full bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${record.completionPercent}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
          <p className="text-sm text-zinc-400">Admin notes: {record.adminNotes || "No notes yet"}</p>
        </motion.div>

        <StatusTimeline statusIndex={record.statusIndex} />
      </CardContent>
    </Card>
  );
}
