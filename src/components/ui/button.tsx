import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#d6b07d] via-[#c28f61] to-[#8d7a63] text-white shadow-[0_18px_50px_-18px_rgba(145,111,79,0.65)] hover:-translate-y-0.5 hover:brightness-105",
        solid: "bg-gradient-to-r from-[#d6b07d] via-[#c28f61] to-[#8d7a63] text-white shadow-[0_18px_50px_-18px_rgba(145,111,79,0.65)] hover:-translate-y-0.5 hover:brightness-105",
        outline: "border border-[#c9a47d]/35 bg-white/85 text-foreground shadow-sm shadow-[#c9a47d]/15 hover:border-[#c9a47d]/60 hover:bg-[#fff8ef] dark:bg-slate-900/80 dark:hover:bg-slate-800/90",
        ghost: "text-foreground/80 hover:bg-black/10 hover:text-foreground dark:hover:bg-white/10",
        full: "w-full bg-gradient-to-r from-amber-400 via-amber-500 to-fuchsia-500 text-black shadow-[0_20px_60px_-20px_rgba(194,159,75,0.8)] hover:-translate-y-0.5 hover:brightness-110",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-10 px-4",
        lg: "h-14 px-10",
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
