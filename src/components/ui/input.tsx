import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] shadow-sm outline-none transition-all duration-200 placeholder:text-[#6B7280] focus:border-[#B8864A]/50 focus:ring-2 focus:ring-[#B8864A]/20 hover:border-[#B8864A]/25",
        props.className,
      )}
    />
  );
}
