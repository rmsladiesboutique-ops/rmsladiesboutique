"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DesignItem } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";

export default function AdminDesignsPage() {
  const [rows, setRows] = useState<DesignItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Occasion Wear");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const loadDesigns = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/designs");
      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setRows(data);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

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
    setErrorMessage(null);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/designs/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      setErrorMessage(`Image upload failed: ${text}`);
      console.error("Upload failed", text);
      return null;
    }

    const data = await res.json();
    return data.publicUrl as string | null;
  };

  const add = async () => {
    setErrorMessage(null);
    const priceValue = Number(price);

    if (!title.trim() || !description.trim() || !imageUrl.trim() || Number.isNaN(priceValue) || priceValue <= 0) {
      setErrorMessage("Please provide a title, description, valid price, and an image before adding the design.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        title: title.trim(),
        category,
        description: description.trim(),
        price: priceValue,
        imageUrl: imageUrl.trim(),
        available: true,
        isFeatured,
      };

      const res = await fetch("/api/admin/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setErrorMessage(data?.error ?? "Unable to add design. Please try again.");
        return;
      }

      await loadDesigns();
      setTitle("");
      setCategory("Occasion Wear");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setIsFeatured(false);
    } catch (err) {
      console.error(err);
      setErrorMessage("Unable to add design. Please try again.");
    } finally {
      setIsLoading(false);
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
        <CardContent className="space-y-8">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-400">Catalog control</p>
              <h1 className="text-3xl font-semibold">Design Management</h1>
              <p className="max-w-2xl text-sm text-zinc-400">
                Add new studio pieces, update pricing, mark featured designs, and keep the customer catalog polished.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button size="sm" variant="outline" onClick={cleanupUnuploaded}>Remove unuploaded</Button>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
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
                }}
              >
                Normalize categories
              </Button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-5 rounded-[2rem] border border-zinc-800 bg-zinc-950/70 p-6 shadow-[0_30px_70px_-48px_rgba(0,0,0,0.6)]">
              {errorMessage ? (
                <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
                  {errorMessage}
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label className="flex flex-col gap-2 text-sm text-zinc-400">
                  <span>Category</span>
                  <select
                    className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Occasion Wear</option>
                    <option>Bridal Wear</option>
                    <option>Simple Regular Wear</option>
                  </select>
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>

              <div className="grid gap-4">
                <label className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-400 bg-slate-900 text-amber-500"
                  />
                  <span>Mark this design as featured on the homepage</span>
                </label>
                <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Upload image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none file:cursor-pointer file:rounded-full file:border-0 file:bg-amber-500/10 file:px-4 file:py-2 file:text-sm file:text-amber-100"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const publicUrl = await uploadToStorage(file);
                        if (publicUrl) setImageUrl(publicUrl);
                      }}
                    />
                  </div>
                  <Button onClick={add} disabled={isLoading} className="h-fit w-full">
                    {isLoading ? "Adding…" : "Add Design"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/70 p-6 shadow-[0_30px_70px_-48px_rgba(0,0,0,0.6)]">
              <h2 className="text-xl font-semibold">Image preview</h2>
              <p className="mt-2 text-sm text-zinc-400">Paste a public image URL or upload a file to preview the design image before publishing.</p>
              <div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                {imageUrl ? (
                  <div className="relative h-72 w-full overflow-hidden rounded-3xl">
                    <Image src={imageUrl} alt="Design preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="grid h-72 place-items-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 text-sm text-zinc-500">
                    Image preview will appear here
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Current catalog</h2>
              <p className="text-sm text-zinc-400">Manage existing designs in the studio catalog.</p>
            </div>
            <div className="rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              {rows.length} items
            </div>
          </div>
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.id} className="grid gap-4 rounded-[2rem] border border-zinc-800 bg-zinc-950/70 p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)] sm:grid-cols-[160px_minmax(0,1fr)]">
                <div className="relative h-40 w-full overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-900">
                  <Image src={r.imageUrl} alt={r.title} fill className="object-cover" />
                </div>
                <div className="grid gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{r.title}</p>
                      <p className="text-sm text-zinc-400">{r.category}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.available ? "bg-emerald-500/10 text-emerald-200" : "bg-red-500/10 text-red-200"}`}>
                        {r.available ? "Available" : "Hidden"}
                      </span>
                      {r.isFeatured ? (
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">Featured</span>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-zinc-400">{r.description}</p>

                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-zinc-500">Price</label>
                      <Input
                        className="w-full"
                        type="number"
                        min="0"
                        step="0.01"
                        value={String(r.price)}
                        onChange={(e) => updatePrice(r.id, Number(e.target.value || 0))}
                      />
                    </div>
                    <label className="space-y-2 text-sm text-zinc-400">
                      Category
                      <select
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none"
                        value={r.category}
                        onChange={(e) => updateCategory(r.id, e.target.value)}
                      >
                        <option>Occasion Wear</option>
                        <option>Bridal Wear</option>
                        <option>Simple Regular Wear</option>
                      </select>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => toggle(r.id)}>{r.available ? "Hide" : "Publish"}</Button>
                    <Button size="sm" variant="outline" onClick={() => updateFeatured(r.id, !r.isFeatured)}>
                      {r.isFeatured ? "Unfeature" : "Feature"}
                    </Button>
                    <Button size="sm" variant="ghost" className="border border-red-500/30 text-red-200 hover:bg-red-500/10" onClick={() => remove(r.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
