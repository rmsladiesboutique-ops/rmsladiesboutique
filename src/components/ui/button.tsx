import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
  {
    variants: {
      variant: {
        default: "bg-amber-500 text-black hover:bg-amber-400 shadow-sm",
        solid: "bg-amber-500 text-black hover:bg-amber-400 shadow-sm",
        outline: "border border-amber-500/20 text-amber-100 hover:bg-amber-500/6",
        ghost: "text-zinc-200 hover:bg-zinc-800",
        full: "w-full bg-amber-500 text-black hover:bg-amber-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
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
