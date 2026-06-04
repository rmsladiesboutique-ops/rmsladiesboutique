"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [id, setId] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async () => {
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ id: id.trim().toLowerCase(), password: password.trim() }),
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(result?.error ?? "Invalid admin credentials");
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="mx-auto flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,225,190,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,180,95,0.12),transparent_30%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-black/10 bg-white/95 p-6 shadow-[0_30px_70px_-45px_rgba(15,15,15,0.3)] backdrop-blur-xl text-slate-950 dark:border-white/10 dark:bg-slate-950/95 dark:text-slate-100 md:grid md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:p-10 lg:p-12">
          <section className="space-y-6">
            <Badge className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">Admin Portal</Badge>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">Secure administrator access</h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-700 dark:text-slate-300">
                Only authenticated administrators may access the management workspace. Sign in with the admin credentials to continue.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
                <span>Protected environment — appointment, design, and settings control.</span>
              </div>
            </div>
          </section>

          <Card className="bg-white/95 text-slate-950 shadow-xl shadow-amber-500/10 dark:bg-slate-950/95 dark:text-white">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-500/15 text-amber-300">
                  <LockKeyhole className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Admin Sign in</h2>
                  <p className="text-sm text-zinc-400">Enter the admin credentials to continue to the dashboard.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="admin-id" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Admin ID</label>
                  <Input id="admin-id" autoComplete="username" placeholder="admin" value={id} onChange={(e) => setId(e.target.value)} className="border-slate-300 bg-slate-50 text-slate-950 focus:border-amber-500 dark:border-slate-700 dark:bg-slate-900/90 dark:text-white" />
                </div>

                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <Input id="admin-password" autoComplete="current-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="border-slate-300 bg-slate-50 text-slate-950 focus:border-amber-500 dark:border-slate-700 dark:bg-slate-900/90 dark:text-white" />
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-400/30 bg-rose-500/5 p-3 text-sm text-rose-500">
                    {error}
                  </div>
                )}
              </div>

              <Button type="button" onClick={submit} className="w-full bg-amber-500 text-zinc-950 hover:bg-amber-400 dark:text-slate-950">Sign in securely</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
