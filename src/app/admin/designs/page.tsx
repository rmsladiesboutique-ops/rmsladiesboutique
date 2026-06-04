"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DesignItem } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDesignsPage() {
  const [rows, setRows] = useState<DesignItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Occasion Wear");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/designs");
        if (!res.ok) {
          if (res.status === 401) router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [router]);

  const cleanupUnuploaded = async () => {
    try {
      const res = await fetch(`/api/admin/designs/cleanup`, { method: "POST" });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
      const data = await res.json();
      // refresh list
      const r = await fetch("/api/admin/designs");
      if (r.ok) setRows(await r.json());
      alert(`Removed ${data.deletedCount ?? 0} unuploaded designs`);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadToStorage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/designs/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Upload failed", await res.text());
      return null;
    }

    const data = await res.json();
    return data.publicUrl as string | null;
  };

  const add = async () => {
    const payload = {
      title,
      category,
      description,
      price: Number(price),
      imageUrl,
      available: true,
      isFeatured,
    };

    const res = await fetch("/api/admin/designs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status === 401) router.push("/admin/login");
      return;
    }

    if (res.ok) {
      setRows((prev) => [
        {
          id: crypto.randomUUID(),
          title,
          category,
          description,
          price: Number(price),
          imageUrl,
          available: true,
          isFeatured,
        },
        ...prev,
      ]);
      setTitle("");
      setCategory("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setIsFeatured(false);
    }
  };

  const toggle = async (id: string) => {
    const target = rows.find((r) => r.id === id);
    if (!target) return;
    const next = !target.available;
    try {
      const res = await fetch("/api/admin/designs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, id, available: next }),
      });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, available: next } : r)));
  };

  const updateFeatured = async (id: string, nextFeatured: boolean) => {
    const target = rows.find((r) => r.id === id);
    if (!target) return;
    try {
      const res = await fetch("/api/admin/designs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, id, isFeatured: nextFeatured }),
      });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, isFeatured: nextFeatured } : r)));
  };

  const updatePrice = async (id: string, nextPrice: number) => {
    const target = rows.find((r) => r.id === id);
    if (!target) return;
    try {
      const res = await fetch("/api/admin/designs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, id, price: nextPrice }),
      });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, price: nextPrice } : r)));
  };

  const updateCategory = async (id: string, nextCategory: string) => {
    const target = rows.find((r) => r.id === id);
    if (!target) return;
    try {
      const res = await fetch("/api/admin/designs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, id, category: nextCategory }),
      });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, category: nextCategory } : r)));
  };

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/designs?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Design Management</h1>
            <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={cleanupUnuploaded}>Remove unuploaded</Button>
                <Button size="sm" variant="ghost" onClick={async () => {
                  try {
                    const res = await fetch(`/api/admin/designs/normalize`, { method: "POST" });
                    if (!res.ok) {
                      if (res.status === 401) router.push("/admin/login");
                      return;
                    }
                    const data = await res.json();
                    const r = await fetch("/api/admin/designs");
                    if (r.ok) setRows(await r.json());
                    alert(`Normalized ${data.updatedCount ?? 0} categories`);
                  } catch (err) {
                    console.error(err);
                  }
                }}>Normalize categories</Button>
            </div>
          </div>
          <p className="text-sm text-zinc-400">Create, update prices, enable or disable availability, and remove outdated designs.</p>
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label className="flex flex-col">
              <span className="mb-2 text-sm text-zinc-400">Category</span>
              <select className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Occasion Wear</option>
                <option>Bridal Wear</option>
                <option>Simple Regular Wear</option>
              </select>
            </label>
            <Input type="number" min="0" step="0.01" inputMode="decimal" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <label className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-slate-400 bg-slate-900 text-amber-500" />
              <span>Mark this design as featured on the homepage</span>
            </label>
            <Textarea className="md:col-span-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-end">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const publicUrl = await uploadToStorage(file);
                  if (publicUrl) setImageUrl(publicUrl);
                }}
              />
              <Button onClick={add}>Add Design</Button>
            </div>
          </div>
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-zinc-800 p-3">
                <div>
                  <p className="font-medium">{r.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <select className="rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100 outline-none" value={r.category} onChange={(e) => updateCategory(r.id, e.target.value)}>
                      <option>Occasion Wear</option>
                      <option>Bridal Wear</option>
                      <option>Simple Regular Wear</option>
                    </select>
                    <p className="text-sm text-zinc-400">| ${r.price.toFixed(2)}</p>
                    <label className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-100">
                      <input type="checkbox" checked={r.isFeatured} onChange={(e) => updateFeatured(r.id, e.target.checked)} className="h-4 w-4 rounded border-slate-400 bg-slate-900 text-amber-500" />
                      Featured
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    className="w-24"
                    value={String(r.price)}
                    onChange={(e) => updatePrice(r.id, Number(e.target.value || 0))}
                  />
                  <Button size="sm" variant="outline" onClick={() => toggle(r.id)}>{r.available ? "Disable" : "Enable"}</Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
