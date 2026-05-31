"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AppointmentRecord } from "@/types/domain";

export function useRealtimeStatus(initial: AppointmentRecord) {
  const [record, setRecord] = useState(initial);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    const channel = supabase
      .channel(`appointment-${initial.customerCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "appointments",
          filter: `customer_code=eq.${initial.customerCode}`,
        },
        (payload) => {
          const row = payload.new as {
            status: string;
            status_index: number;
            completion_percent: number;
            admin_notes: string | null;
            estimated_completion_date: string | null;
          };

          setRecord((prev) => ({
            ...prev,
            status: row.status as AppointmentRecord["status"],
            statusIndex: row.status_index,
            completionPercent: row.completion_percent,
            adminNotes: row.admin_notes ?? "",
            estimatedCompletionDate: row.estimated_completion_date ?? prev.estimatedCompletionDate,
          }));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initial.customerCode]);

  return record;
}
