"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { DesignItem } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDesignsPage() {
  const [rows, setRows] = useState<DesignItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

  const uploadToStorage = async (file: File) => {
    const supabase = createClient();
    if (!supabase) return null;
    const path = `designs/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("design-catalog").upload(path, file, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from("design-catalog").getPublicUrl(path);
    return data.publicUrl;
  };

  const add = async () => {
    const payload = {
      title,
      category,
      description,
      price: Number(price),
      imageUrl,
      available: true,
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
        },
        ...prev,
      ]);
      setTitle("");
      setCategory("");
      setDescription("");
      setPrice("");
      setImageUrl("");
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
          <h1 className="text-2xl font-semibold">Design Management</h1>
          <p className="text-sm text-zinc-400">Create, update prices, enable or disable availability, and remove outdated designs.</p>
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <Textarea className="md:col-span-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="md:col-span-2 flex items-center gap-3">
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
                  <p className="text-sm text-zinc-400">{r.category} | ${r.price.toFixed(2)}</p>
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
