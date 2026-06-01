import { cn } from "@/lib/utils";

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-xl border border-black/10 bg-white/80 p-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-neutral-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-300/40 dark:border-white/10 dark:bg-black/30 dark:text-zinc-100",
        props.className,
      )}
    />
  );
}
