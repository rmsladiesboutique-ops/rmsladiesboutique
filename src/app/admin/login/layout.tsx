import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Login | Atelier Noir",
};

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.14),_transparent_26%),linear-gradient(180deg,_#ffffff_0%,_#f8f3ef_100%)]">
      {children}
    </div>
  );
}
