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
        <section className="hero-grid rounded-[2rem] p-8 md:p-10 lg:p-12">
          <Badge>Secure Access</Badge>
          <h1 className="mt-5 max-w-xl text-4xl leading-[1.05] md:text-6xl">Enter the atelier command room.</h1>
          <p className="mt-4 max-w-xl text-sm text-foreground/70 md:text-base">
            Sign in to manage appointments, update production stages, and keep the boutique running with a cleaner, more professional workflow.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-foreground/70">
            <ShieldCheck className="h-5 w-5 text-amber-700 dark:text-amber-200" />
            Protected administrative workspace
          </div>
        </section>

        <Card className="self-center">
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-200">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Admin Login</h2>
                <p className="text-sm text-foreground/65">Use the admin credentials to unlock the dashboard.</p>
              </div>
            </div>
            <Input placeholder="Admin id" value={id} onChange={(e) => setId(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button onClick={submit} className="w-full">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
