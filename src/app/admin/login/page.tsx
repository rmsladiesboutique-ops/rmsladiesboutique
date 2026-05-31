"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <Card className="w-full">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <Input placeholder="Admin id" value={id} onChange={(e) => setId(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button onClick={submit} className="w-full">Sign In</Button>
        </CardContent>
      </Card>
    </main>
  );
}
