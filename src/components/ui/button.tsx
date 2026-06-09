import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8864A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#B8864A] to-[#a57743] text-white shadow-[0_4px_14px_-4px_rgba(184,134,74,0.5),0_18px_40px_-18px_rgba(184,134,74,0.55)] hover:scale-[1.03] hover:from-[#9a6f3a] hover:to-[#8a6530] hover:shadow-[0_6px_20px_-4px_rgba(184,134,74,0.6),0_0_40px_-10px_rgba(212,175,55,0.3)] active:scale-[0.98]",
        solid:
          "bg-gradient-to-r from-[#B8864A] to-[#a57743] text-white shadow-[0_18px_50px_-18px_rgba(184,134,74,0.55)] hover:scale-[1.03] hover:from-[#9a6f3a] hover:to-[#8a6530] active:scale-[0.98]",
        secondary:
          "bg-[#111827] text-white shadow-[0_18px_50px_-18px_rgba(17,24,39,0.45)] hover:scale-[1.03] hover:bg-[#1f2937] active:scale-[0.98]",
        outline:
          "border border-[#B8864A]/35 bg-white text-[#1F2937] shadow-sm hover:scale-[1.02] hover:border-[#B8864A]/60 hover:bg-[#FAF7F2]",
        ghost: "text-[#1F2937] hover:bg-[#111827]/5 hover:text-[#111827]",
        full: "w-full bg-gradient-to-r from-[#B8864A] to-[#a57743] text-white shadow-[0_20px_60px_-20px_rgba(184,134,74,0.55)] hover:scale-[1.02] hover:from-[#9a6f3a] hover:to-[#8a6530]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
