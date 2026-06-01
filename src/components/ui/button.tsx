import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-amber-400 via-amber-500 to-fuchsia-500 text-black shadow-[0_20px_60px_-20px_rgba(194,159,75,0.8)] hover:-translate-y-0.5 hover:brightness-110",
        solid: "bg-gradient-to-r from-amber-400 via-amber-500 to-fuchsia-500 text-black shadow-[0_20px_60px_-20px_rgba(194,159,75,0.8)] hover:-translate-y-0.5 hover:brightness-110",
        outline: "border border-amber-500/30 bg-white/10 text-foreground shadow-sm shadow-amber-200/20 hover:border-amber-400/50 hover:bg-amber-500/10",
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
