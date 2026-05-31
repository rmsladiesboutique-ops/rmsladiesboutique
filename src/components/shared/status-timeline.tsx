"use client";

import { STATUS_STAGES } from "@/types/domain";
import { cn } from "@/lib/utils";

export function StatusTimeline({ statusIndex }: { statusIndex: number }) {
  return (
    <ol className="space-y-4">
      {STATUS_STAGES.map((stage, index) => {
        const active = index + 1 <= statusIndex;
        return (
          <li key={stage} className="flex items-start gap-3">
            <div className={cn("mt-1 h-3 w-3 rounded-full", active ? "bg-amber-400" : "bg-zinc-700")} />
            <div>
              <p className={cn("text-sm", active ? "text-zinc-100" : "text-zinc-500")}>{stage}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
