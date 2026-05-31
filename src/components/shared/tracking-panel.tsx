"use client";

import { StatusTimeline } from "@/components/shared/status-timeline";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeStatus } from "@/hooks/use-realtime-status";
import type { AppointmentRecord } from "@/types/domain";

export function TrackingPanel({ initial }: { initial: AppointmentRecord }) {
  const record = useRealtimeStatus(initial);

  return (
    <Card className="mt-8">
      <CardContent className="space-y-5">
        <p className="text-lg">{record.customerName}</p>
        <p className="text-sm text-zinc-300">Current status: {record.status}</p>
        <p className="text-sm text-zinc-300">Progress: {record.completionPercent}%</p>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full bg-amber-400" style={{ width: `${record.completionPercent}%` }} />
        </div>
        <p className="text-sm text-zinc-400">Estimated completion: {record.estimatedCompletionDate}</p>
        <p className="text-sm text-zinc-400">Admin notes: {record.adminNotes || "No notes yet"}</p>
        <StatusTimeline statusIndex={record.statusIndex} />
      </CardContent>
    </Card>
  );
}
