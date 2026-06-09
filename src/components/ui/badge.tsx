import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#B8864A]/30 bg-[#FAF7F2] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#9a6f3a]",
        className,
      )}
      {...props}
    />
  );
}
