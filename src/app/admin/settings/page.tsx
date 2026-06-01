"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppSettings } from "@/types/domain";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<AppSettings | null>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) {
          if (res.status === 401) router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setSettings({
          siteTitle: data.siteTitle ?? "",
          phoneNumber: data.phoneNumber ?? "",
          whatsappTemplate: data.whatsappTemplate ?? "",
          logoUrl: data.logoUrl ?? "/rms-logo.jpeg",
          statusStages: data.statusStages ?? [],
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return <div className="p-6">Loading…</div>;

  const onSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const payload = {
        siteTitle: settings.siteTitle,
        phoneNumber: settings.phoneNumber,
        whatsappTemplate: settings.whatsappTemplate,
        logoUrl: settings.logoUrl,
        statusStages: settings.statusStages,
      };

      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        alert("Save failed");
        return;
      }
      alert("Settings saved");
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Site Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-300">Site Title</label>
          <Input value={settings?.siteTitle ?? ""} onChange={(e) => setSettings((s) => (s ? { ...s, siteTitle: e.target.value } : s))} />
        </div>

        <div>
          <label className="block text-sm text-zinc-300">Contact Phone</label>
          <Input value={settings?.phoneNumber ?? ""} onChange={(e) => setSettings((s) => (s ? { ...s, phoneNumber: e.target.value } : s))} />
        </div>

        <div>
          <label className="block text-sm text-zinc-300">WhatsApp Template (use {name} placeholder)</label>
          <Textarea value={settings?.whatsappTemplate ?? ""} onChange={() => {}} />
        </div>

        <div>
          <label className="block text-sm text-zinc-300">Logo URL</label>
          <Input value={settings?.logoUrl ?? ""} onChange={(e) => setSettings((s) => (s ? { ...s, logoUrl: e.target.value } : s))} />
        </div>

        <div>
          <label className="block text-sm text-zinc-300">Status Stages (one per line)</label>
          <Textarea
            value={(settings?.statusStages ?? []).join("\n")}
            onChange={(e) => setSettings((s) => (s ? { ...s, statusStages: e.target.value.split(/\r?\n/).map((v) => v.trim()).filter(Boolean) } : s))}
          />
        </div>

        <div>
          <Button onClick={onSave} disabled={saving}>{saving ? "Saving…" : "Save Settings"}</Button>
        </div>
      </div>
    </main>
  );
}
