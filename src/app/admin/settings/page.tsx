"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppSettings, type HomepageContent } from "@/types/domain";

function parsePairs(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [first, ...rest] = line.split("|").map((part) => part.trim());
      return { first: first ?? "", second: rest.join(" | ") ?? "" };
    });
}

function serializePairs(items?: { title: string; description: string }[]) {
  return (items ?? []).map((item) => `${item.title} | ${item.description}`).join("\n");
}

function serializeStats(items?: { value: string; label: string }[]) {
  return (items ?? []).map((item) => `${item.value} | ${item.label}`).join("\n");
}

function parseStats(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, ...rest] = line.split("|").map((part) => part.trim());
      return { value: value ?? "", label: rest.join(" | ") ?? "" };
    });
}

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
          logoUrl: data.logoUrl ?? "",
          statusStages: data.statusStages ?? [],
          homepageContent: data.homepageContent ?? {},
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return <div className="p-6">Loading…</div>;

  const homepage = settings?.homepageContent ?? {};

  const updateHomepage = (updates: Partial<HomepageContent>) => {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            homepageContent: {
              ...(prev.homepageContent ?? {}),
              ...updates,
            },
          }
        : prev,
    );
  };

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
        homepageContent: settings.homepageContent,
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
          <Textarea value={settings?.whatsappTemplate ?? ""} onChange={(e) => setSettings((s) => (s ? { ...s, whatsappTemplate: e.target.value } : s))} />
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

        <div className="space-y-4 rounded-xl border border-zinc-700/70 bg-zinc-950/70 p-4">
          <h2 className="text-lg font-semibold">Homepage Content</h2>

          <div>
            <label className="block text-sm text-zinc-300">Hero Badge</label>
            <Input value={homepage.heroBadge} onChange={(e) => updateHomepage({ heroBadge: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Hero Headline</label>
            <Input value={homepage.heroHeadline} onChange={(e) => updateHomepage({ heroHeadline: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Hero Description</label>
            <Textarea value={homepage.heroDescription} onChange={(e) => updateHomepage({ heroDescription: e.target.value })} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-zinc-300">Primary CTA</label>
              <Input value={homepage.heroPrimaryCta} onChange={(e) => updateHomepage({ heroPrimaryCta: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-zinc-300">Secondary CTA</label>
              <Input value={homepage.heroSecondaryCta} onChange={(e) => updateHomepage({ heroSecondaryCta: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Feature Section Title</label>
            <Input value={homepage.featureSectionTitle} onChange={(e) => updateHomepage({ featureSectionTitle: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Feature Section Subtitle</label>
            <Textarea value={homepage.featureSectionSubtitle} onChange={(e) => updateHomepage({ featureSectionSubtitle: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Hero Stats (value | label per line)</label>
            <Textarea value={serializeStats(homepage.heroStats)} onChange={(e) => updateHomepage({ heroStats: parseStats(e.target.value) })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Feature Cards (title | description per line)</label>
            <Textarea value={serializePairs(homepage.featureCards)} onChange={(e) => updateHomepage({ featureCards: parsePairs(e.target.value).map((item) => ({ title: item.first, description: item.second })) })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Featured Collection Title</label>
            <Input value={homepage.featuredCollectionTitle} onChange={(e) => updateHomepage({ featuredCollectionTitle: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Featured Collection Items (title | description per line)</label>
            <Textarea value={serializePairs(homepage.featuredCollectionItems)} onChange={(e) => updateHomepage({ featuredCollectionItems: parsePairs(e.target.value).map((item) => ({ title: item.first, description: item.second })) })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Pricing Title</label>
            <Input value={homepage.pricingTitle} onChange={(e) => updateHomepage({ pricingTitle: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Pricing Items (title | description per line)</label>
            <Textarea value={serializePairs(homepage.pricingItems)} onChange={(e) => updateHomepage({ pricingItems: parsePairs(e.target.value).map((item) => ({ title: item.first, description: item.second })) })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Testimonials Title</label>
            <Input value={homepage.testimonialsTitle} onChange={(e) => updateHomepage({ testimonialsTitle: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">Testimonials Items (name | quote per line)</label>
            <Textarea value={serializePairs(homepage.testimonialsItems)} onChange={(e) => updateHomepage({ testimonialsItems: parsePairs(e.target.value).map((item) => ({ title: item.first, description: item.second })) })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">CTA Title</label>
            <Input value={homepage.ctaTitle} onChange={(e) => updateHomepage({ ctaTitle: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">CTA Description</label>
            <Textarea value={homepage.ctaDescription} onChange={(e) => updateHomepage({ ctaDescription: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm text-zinc-300">CTA Button Text</label>
            <Input value={homepage.ctaButton} onChange={(e) => updateHomepage({ ctaButton: e.target.value })} />
          </div>
        </div>

        <div>
          <Button onClick={onSave} disabled={saving}>{saving ? "Saving…" : "Save Settings"}</Button>
        </div>
      </div>
    </main>
  );
}
