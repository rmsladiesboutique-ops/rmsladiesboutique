import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white text-slate-950 shadow-[0_35px_90px_-40px_rgba(15,12,10,0.16)] transition-all duration-300 hover:-translate-y-[1px] dark:border-slate-700/70 dark:bg-slate-950 dark:text-slate-50 dark:shadow-[0_35px_90px_-40px_rgba(0,0,0,0.55)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 sm:p-7 md:p-8", className)} {...props} />;
}
