import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-700 dark:text-amber-200", className)}
      {...props}
    />
  );
}
