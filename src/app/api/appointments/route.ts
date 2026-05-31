import { NextResponse } from "next/server";
import { z } from "zod";
import { createAppointment } from "@/lib/services";
import { sendBookingEmailNotification } from "@/lib/notifications";

const schema = z.object({
  customerName: z.string().min(2),
  phoneNumber: z.string().min(8),
  email: z.string().email(),
  gender: z.string(),
  preferredDate: z.string(),
  preferredTime: z.string(),
  clothingType: z.string(),
  measurementNotes: z.string().optional(),
  customDesign: z.boolean(),
  customRequest: z
    .object({
      fabricType: z.string().optional(),
      color: z.string().optional(),
      measurements: z.string().optional(),
      specialInstructions: z.string().optional(),
      designPreferences: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const appointment = await createAppointment(parsed.data);
  await sendBookingEmailNotification(appointment);
  return NextResponse.json(appointment);
}
