import { cn } from "@/lib/utils";

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-xl border border-[#111827]/12 bg-white p-4 text-sm text-[#1F2937] shadow-sm outline-none transition placeholder:text-[#6B7280] focus:border-[#B8864A]/60 focus:ring-2 focus:ring-[#B8864A]/25",
        props.className,
      )}
    />
  );
}
