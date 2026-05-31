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
  gender: z.string().min(1),
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
    defaultValues: { customDesign: false },
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <div>
        <Input placeholder="Customer name" {...register("customerName")} />
        {errors.customerName && <p className="mt-1 text-xs text-red-400">Name is required</p>}
      </div>
      <Input placeholder="Phone number" {...register("phoneNumber")} />
      <Input placeholder="Email" type="email" {...register("email")} />
      <Select {...register("gender")}>
        <option value="">Select gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </Select>
      <Select {...register("preferredDate")}>
        <option value="">Preferred date</option>
        {availableDates.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </Select>
      <Select {...register("preferredTime")}>
        <option value="">Preferred time</option>
        {availableSlots.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Select>
      <Input placeholder="Clothing type" {...register("clothingType")} />
      <label className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-200">
        <input type="checkbox" {...register("customDesign")} /> Request custom design
      </label>
      <div className="md:col-span-2">
        <Textarea placeholder="Measurement notes" {...register("measurementNotes")} />
      </div>

      {customDesign && (
        <>
          <Input placeholder="Fabric type" {...register("fabricType")} />
          <Input placeholder="Color" {...register("color")} />
          <Input placeholder="Measurements details" {...register("measurements")} className="md:col-span-2" />
          <Textarea placeholder="Special instructions" {...register("specialInstructions")} className="md:col-span-2" />
          <Textarea placeholder="Design preferences" {...register("designPreferences")} className="md:col-span-2" />
        </>
      )}

      <div className="md:col-span-2">
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Submitting..." : "Confirm Appointment"}</Button>
      </div>
    </form>
  );
}
