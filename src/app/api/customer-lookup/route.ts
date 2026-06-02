import { NextResponse } from "next/server";
import { z } from "zod";
import { findAppointment } from "@/lib/services";

const schema = z.object({
  phoneNumber: z.string().min(8, "Phone number must be at least 8 digits").transform(v => v.replace(/\D/g, '').slice(-10)),
  customerCode: z.string().length(6, "Code must be exactly 6 digits").regex(/^\d{6}$/, "Code must contain only digits"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const errorMessage = parsed.error.errors[0]?.message || "Invalid input format";
      return NextResponse.json(
        { error: errorMessage }, 
        { status: 400 }
      );
    }

    const appointment = await findAppointment(
      parsed.data.phoneNumber, 
      parsed.data.customerCode
    );
    
    if (!appointment) {
      return NextResponse.json(
        { error: "No appointment found. Please verify your phone number and booking code." }, 
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Customer lookup error:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving your appointment. Please try again." }, 
      { status: 500 }
    );
  }
}
