import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-amber-400/25 bg-gradient-to-r from-amber-100/80 via-fuchsia-100/55 to-teal-100/55 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-amber-900 shadow-[0_10px_25px_-20px_rgba(209,155,84,0.45)] transition-colors duration-200 dark:text-amber-100",
        className,
      )}
      {...props}
    />
  );
}
