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
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(result?.error ?? "Invalid admin credentials");
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="mx-auto grid min-h-[72vh] max-w-7xl items-center px-4 py-10 md:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hero-grid rounded-[2.5rem] border border-amber-200/20 bg-gradient-to-br from-amber-50/70 via-fuchsia-50/50 to-teal-50/70 p-8 md:p-10 lg:p-12">
          <Badge className="px-4 py-2">Secure Access</Badge>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] md:text-6xl">Enter the atelier command room.</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-foreground/72 md:text-lg">
            Sign in to manage appointments, production stages, availability, and designs from a refined administrative workspace.
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-[1.75rem] border border-white/20 bg-black/5 p-4 text-sm text-foreground/75">
            <ShieldCheck className="h-5 w-5 text-amber-700" />
            Protected administrative workspace
          </div>
        </section>

        <Card className="self-center border border-white/10 bg-white/10 shadow-[0_30px_90px_-50px_rgba(30,22,16,0.55)]">
          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 to-fuchsia-400/15 text-amber-700">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Admin Login</h2>
                <p className="text-sm text-foreground/65">Use the admin credentials to unlock the dashboard.</p>
              </div>
            </div>
            <Input placeholder="Admin id" value={id} onChange={(e) => setId(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="rounded-[1.5rem] border border-rose-300/30 bg-rose-50/80 p-3 text-sm text-rose-500">{error}</p>}
            <Button onClick={submit} className="w-full">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
