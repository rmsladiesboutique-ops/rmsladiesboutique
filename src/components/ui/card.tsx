import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white shadow-[0_35px_90px_-40px_rgba(15,12,10,0.16)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[1px] dark:border-white/10 dark:bg-slate-950/95 dark:shadow-[0_35px_90px_-40px_rgba(0,0,0,0.55)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 sm:p-7 md:p-8", className)} {...props} />;
}
