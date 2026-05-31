import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/services";

export async function GET() {
  const data = await getAvailability();
  return NextResponse.json(data);
}
