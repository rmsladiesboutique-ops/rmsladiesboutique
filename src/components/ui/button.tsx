import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
  {
    variants: {
      variant: {
        default: "bg-amber-500 text-black shadow-[0_14px_30px_-18px_rgba(184,137,47,0.8)] hover:-translate-y-0.5 hover:bg-amber-400",
        solid: "bg-amber-500 text-black shadow-[0_14px_30px_-18px_rgba(184,137,47,0.8)] hover:-translate-y-0.5 hover:bg-amber-400",
        outline: "border border-amber-500/25 bg-transparent text-foreground hover:border-amber-400/45 hover:bg-amber-500/8",
        ghost: "text-foreground/80 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5",
        full: "w-full bg-amber-500 text-black shadow-[0_14px_30px_-18px_rgba(184,137,47,0.8)] hover:-translate-y-0.5 hover:bg-amber-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3.5",
        lg: "h-12 px-8",
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
