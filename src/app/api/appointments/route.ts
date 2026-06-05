import { NextResponse } from "next/server";
import { z } from "zod";
import { createAppointment } from "@/lib/services";
import { sendBookingEmailNotification } from "@/lib/notifications";

const schema = z.object({
  customerName: z.string().min(2),
  phoneNumber: z
    .string()
    .regex(/^[+\d]?(?:[\d\-\s()]{7,20})$/, "Invalid phone number"),
  address: z.string().min(5),
  email: z.string().email().optional(),
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

  try {
    const appointment = await createAppointment(parsed.data);

    try {
      await sendBookingEmailNotification(appointment);
    } catch (notificationError) {
      console.error("Booking email notification failed:", notificationError);
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Create appointment failed:", error);
    const message = error instanceof Error ? error.message : "Unable to save appointment. Please try again later.";
    const status = /paused|unavailable/i.test(message) ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
