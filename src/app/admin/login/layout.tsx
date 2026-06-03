import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Login | Atelier Noir",
};

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.14),transparent_26%),linear-gradient(180deg,#ffffff_0%,#f8f3ef_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(249,207,109,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.08),transparent_26%),linear-gradient(180deg,#080606_0%,#0f0b09_100%)] dark:text-slate-100">
      {children}
    </div>
  );
}
