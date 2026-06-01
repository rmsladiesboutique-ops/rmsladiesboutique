import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-black/10 bg-white/80 px-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-neutral-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-300/40 dark:border-white/10 dark:bg-black/30 dark:text-zinc-100",
        props.className,
      )}
    />
  );
}
