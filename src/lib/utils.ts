import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProgressPercent(stage: number, total: number) {
  if (total === 0) return 0;
  return Math.round((stage / total) * 100);
}

export function generateCustomerCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
