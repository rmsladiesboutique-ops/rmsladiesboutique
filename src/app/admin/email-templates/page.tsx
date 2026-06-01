"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EmailTemplate } from "@/types/domain";

export default function AdminEmailTemplatesPage() {
  const [rows, setRows] = useState<EmailTemplate[]>([]);
  const [key, setKey] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/email-templates");
        if (!res.ok) {
          if (res.status === 401) router.push("/admin/login");
          return;
        }
        const d = await res.json();
        setRows(d);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [router]);

  const save = async () => {
    const payload = { key, subject, body };
    const res = await fetch("/api/admin/email-templates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) {
      if (res.status === 401) router.push("/admin/login");
      return;
    }
    if (res.ok) {
      const updated = await res.json();
      setRows((prev) => [updated, ...prev.filter((r) => r.key !== updated.key)]);
      setKey("");
      setSubject("");
      setBody("");
    }
  };

  const remove = async (k: string) => {
    try {
      const res = await fetch(`/api/admin/email-templates?key=${encodeURIComponent(k)}`, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
      setRows((prev) => prev.filter((r) => r.key !== k));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Email Templates</h1>
      <div className="space-y-4">
        <Input placeholder="Template Key" value={key} onChange={(e) => setKey(e.target.value)} />
        <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Textarea placeholder="Body (use {name}, {code}, etc.)" value={body} onChange={(e) => setBody(e.target.value)} />
        <Button onClick={save}>Save Template</Button>

        <div className="space-y-2 mt-6">
          {rows.map((r) => (
            <div key={r.key} className="rounded-md border border-zinc-800 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.key}</div>
                  <div className="text-sm text-zinc-400">{r.subject}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => remove(r.key)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
