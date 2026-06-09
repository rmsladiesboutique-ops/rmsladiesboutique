import { cn } from "@/lib/utils";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-[#111827]/12 bg-white px-4 text-sm text-[#1F2937] shadow-sm outline-none transition focus:border-[#B8864A]/60 focus:ring-2 focus:ring-[#B8864A]/25",
        props.className,
      )}
    />
  );
}
