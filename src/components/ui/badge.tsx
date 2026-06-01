import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-amber-500/25 bg-gradient-to-r from-amber-200/50 via-fuchsia-100/45 to-teal-100/45 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-amber-900 shadow-[0_10px_20px_-18px_rgba(209,155,84,0.6)] dark:text-amber-100",
        className,
      )}
      {...props}
    />
  );
}
