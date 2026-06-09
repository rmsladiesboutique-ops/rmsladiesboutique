"use client";

import { STATUS_STAGES } from "@/types/domain";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function StatusTimeline({ statusIndex }: { statusIndex: number }) {
  return (
    <ol className="space-y-4 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
      {STATUS_STAGES.map((stage, index) => {
        const active = index + 1 <= statusIndex;
        return (
          <motion.li
            key={stage}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
          >
            <div className={cn("mt-1 h-3 w-3 rounded-full ring-4 ring-transparent", active ? "bg-[#B8864A] ring-[#B8864A]/20" : "bg-[#6B7280]/30")} />
            <div>
              <p className={cn("text-sm font-medium", active ? "text-[#1F2937]" : "text-[#6B7280]")}>{stage}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
