"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schema = z.object({
  customerName: z.string().min(2),
  phoneNumber: z.string().min(8),
  email: z.string().email(),
  gender: z.string().default("Female"),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  clothingType: z.string().min(2),
  measurementNotes: z.string().optional(),
  customDesign: z.boolean().default(false),
  fabricType: z.string().optional(),
  color: z.string().optional(),
  measurements: z.string().optional(),
  specialInstructions: z.string().optional(),
  designPreferences: z.string().optional(),
});

type Values = z.infer<typeof schema>;

type Props = {
  availableDates: string[];
  availableSlots: string[];
};

export function BookingForm({ availableDates, availableSlots }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { customDesign: false, gender: "Female" },
  });
  const customDesign = watch("customDesign");

  const onSubmit = async (values: Values) => {
    setLoading(true);
    const payload = {
      customerName: values.customerName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      gender: values.gender,
      preferredDate: values.preferredDate,
      preferredTime: values.preferredTime,
      clothingType: values.clothingType,
      measurementNotes: values.measurementNotes ?? "",
      customDesign: values.customDesign,
      customRequest: values.customDesign
        ? {
            fabricType: values.fabricType,
            color: values.color,
            measurements: values.measurements,
            specialInstructions: values.specialInstructions,
            designPreferences: values.designPreferences,
          }
        : undefined,
    };

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) return;
    const data = await res.json();
    router.push(`/book/confirmation/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2 rounded-[2rem] border border-white/10 bg-black/5 p-6 shadow-[0_25px_80px_-42px_rgba(37,25,15,0.45)]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-foreground/55">Appointment Details</p>
          <h2 className="text-2xl font-semibold">Tell us what you need</h2>
          <p className="text-sm leading-7 text-foreground/70">Share the basics below, then add custom design notes if you want a truly one-of-a-kind creation.</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Input placeholder="Customer name" {...register("customerName")} />
        {errors.customerName && <p className="mt-1 text-xs text-red-400">Name is required</p>}
      </div>
      <div className="space-y-1.5">
        <Input placeholder="Phone number" {...register("phoneNumber")} />
        {errors.phoneNumber && <p className="mt-1 text-xs text-red-400">Phone number is required</p>}
      </div>
      <div className="space-y-1.5">
        <Input placeholder="Email" type="email" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-400">Valid email is required</p>}
      </div>
      <input type="hidden" value="Female" {...register("gender")} />
      <div className="space-y-1.5">
        <p className="text-sm text-foreground/65">Appointments are available exclusively for women.</p>
      </div>
      <div className="space-y-1.5">
        <Select {...register("preferredDate")}>
          <option value="">Preferred date</option>
          {availableDates.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </Select>
      </div>
      <div className="space-y-1.5">
        <Select {...register("preferredTime")}>
          <option value="">Preferred time</option>
          {availableSlots.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </div>
      <div className="space-y-1.5">
        <Input placeholder="Clothing type" {...register("clothingType")} />
      </div>
      <label className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4 text-sm text-foreground/80 shadow-sm">
        <input type="checkbox" {...register("customDesign")} className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400" />
        <span>Request custom design</span>
      </label>
      <div className="md:col-span-2 space-y-1.5">
        <Textarea placeholder="Measurement notes" {...register("measurementNotes")} />
      </div>

      {customDesign && (
        <>
          <div className="space-y-1.5">
            <Input placeholder="Fabric type" {...register("fabricType")} />
          </div>
          <div className="space-y-1.5">
            <Input placeholder="Color" {...register("color")} />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Input placeholder="Measurements details" {...register("measurements")} />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Textarea placeholder="Special instructions" {...register("specialInstructions")} />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Textarea placeholder="Design preferences" {...register("designPreferences")} />
          </div>
        </>
      )}

      <div className="md:col-span-2">
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Submitting..." : "Confirm Appointment"}</Button>
      </div>
    </form>
  );
}
