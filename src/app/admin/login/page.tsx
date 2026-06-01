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
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 rounded-[2rem] border border-zinc-200/80 bg-white/95 p-6 shadow-[0_30px_70px_-45px_rgba(15,15,15,0.3)] backdrop-blur-xl md:grid-cols-[1.15fr_0.85fr] md:p-10 lg:p-12">
        <section className="space-y-6">
          <Badge className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">Admin Portal</Badge>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Secure administrator access</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-zinc-600">
              Only authenticated administrators may access the management workspace. Sign in with the admin credentials to continue.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
            <div className="flex items-center gap-3 text-sm text-zinc-700">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <span>Protected environment — appointment, design, and settings control.</span>
            </div>
          </div>
        </section>

        <Card className="bg-zinc-950/90 text-white shadow-xl shadow-amber-500/10">
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
              <label className="block text-sm font-medium text-zinc-300">Admin ID</label>
              <Input autoComplete="username" placeholder="admin" value={id} onChange={(e) => setId(e.target.value)} className="bg-zinc-900/90 text-white border-zinc-700 focus:border-amber-500" />

              <label className="block text-sm font-medium text-zinc-300">Password</label>
              <Input autoComplete="current-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-zinc-900/90 text-white border-zinc-700 focus:border-amber-500" />

              {error && (
                <div className="rounded-2xl border border-rose-400/30 bg-rose-500/5 p-3 text-sm text-rose-500">
                  {error}
                </div>
              )}
            </div>

            <Button onClick={submit} className="w-full bg-amber-500 text-zinc-950 hover:bg-amber-400">Sign in securely</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
