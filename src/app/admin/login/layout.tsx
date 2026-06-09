import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Login | RMS LADIES BOUTIQUE",
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
