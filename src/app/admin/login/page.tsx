"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const router = useRouter();

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (loading || retryAfter) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id: id.trim().toLowerCase(), password }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        retryAfterSeconds?: number;
      } | null;

      if (!response.ok) {
        if (response.status === 429 && result?.retryAfterSeconds) {
          setRetryAfter(result.retryAfterSeconds);
          const interval = setInterval(() => {
            setRetryAfter((prev) => {
              if (prev === null || prev <= 1) {
                clearInterval(interval);
                return null;
              }
              return prev - 1;
            });
          }, 1000);
        }
        setError(result?.error ?? "Invalid credentials. Please try again.");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left brand panel */}
      <section className="relative hidden w-1/2 overflow-hidden bg-[#111827] lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,175,55,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="relative p-12">
          <Image
            src="/rms-logo.jpeg"
            alt="RMS Boutique"
            width={160}
            height={64}
            className="h-14 w-auto rounded-2xl border border-white/10 bg-white/5 p-1 object-contain"
          />
        </div>
        <div className="relative space-y-6 p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">Admin Portal</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white">
            Secure operations workspace
          </h1>
          <p className="max-w-md text-body text-white/60">
            Manage appointments, designs, availability, and customer orders from a protected environment.
          </p>
          <div className="gold-line bg-gradient-to-r from-[#D4AF37] to-[#B8864A]" />
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />
            <div className="space-y-1 text-sm text-white/70">
              <p className="font-semibold text-white">Enterprise-grade protection</p>
              <p>Scrypt password hashing · Rate-limited login · Signed HTTP-only sessions</p>
            </div>
          </div>
        </div>
        <div className="relative p-12 text-xs text-white/30">
          © {new Date().getFullYear()} RMS Ladies Boutique
        </div>
      </section>

      {/* Right login form */}
      <section className="flex w-full flex-col items-center justify-center bg-[#FAF7F2] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-[#D4AF37] lg:mx-0">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#111827]">Sign in</h2>
            <p className="mt-2 text-small text-[#6B7280]">
              Enter your administrator credentials to continue.
            </p>
          </div>

          <form onSubmit={submit} className="admin-panel space-y-5">
            <div>
              <label htmlFor="admin-id" className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Admin ID
              </label>
              <Input
                id="admin-id"
                autoComplete="username"
                placeholder="Enter admin ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={loading || !!retryAfter}
                required
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Password
              </label>
              <div className="relative">
                <Input
                  id="admin-password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || !!retryAfter}
                  required
                  className="pr-12"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error ? (
              <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            {retryAfter ? (
              <p className="text-center text-sm text-[#6B7280]">
                Locked out. Try again in <span className="font-semibold text-[#B8864A]">{retryAfter}s</span>
              </p>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !!retryAfter || !id.trim() || !password}
            >
              {loading ? "Signing in…" : "Sign in securely"}
            </Button>
          </form>

          <p className="text-center text-[0.7rem] text-[#6B7280]">
            Unauthorized access is prohibited and monitored.
          </p>
        </div>
      </section>
    </main>
  );
}
