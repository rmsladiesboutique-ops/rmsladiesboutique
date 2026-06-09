import { cn } from "@/lib/utils";

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-xl border border-[#E5E7EB] bg-white p-4 text-sm text-[#1F2937] shadow-sm outline-none transition-all duration-200 placeholder:text-[#6B7280] focus:border-[#B8864A]/50 focus:ring-2 focus:ring-[#B8864A]/20 hover:border-[#B8864A]/25",
        props.className,
      )}
    />
  );
}
