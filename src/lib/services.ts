import { addDays, format } from "date-fns";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { mockAppointments, mockAvailability, mockDesigns } from "@/lib/mock-data";
import { generateCustomerCode, getProgressPercent } from "@/lib/utils";
import { STATUS_STAGES, type AppointmentPayload, type AppointmentRecord, type DesignItem } from "@/types/domain";

export async function getDesigns(): Promise<DesignItem[]> {
  const supabase = createServiceRoleClient();
  if (!supabase) return mockDesigns;

  const { data, error } = await supabase.from("designs").select("*").order("created_at", { ascending: false });
  if (error || !data) return mockDesigns;

  return data.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    description: d.description,
    price: d.price,
    imageUrl: d.image_url,
    available: d.available,
  }));
}

export async function createAppointment(payload: AppointmentPayload): Promise<AppointmentRecord> {
  const code = generateCustomerCode();
  const estimatedCompletionDate = format(addDays(new Date(payload.preferredDate), 14), "yyyy-MM-dd");
  const record: AppointmentRecord = {
    id: crypto.randomUUID(),
    ...payload,
    customerCode: code,
    status: STATUS_STAGES[0],
    statusIndex: 1,
    completionPercent: getProgressPercent(1, STATUS_STAGES.length),
    estimatedCompletionDate,
    adminNotes: "Awaiting appointment confirmation.",
    createdAt: new Date().toISOString(),
  };

  const supabase = createServiceRoleClient();
  if (!supabase) {
    mockAppointments.unshift(record);
    return record;
  }

  const { error } = await supabase.from("appointments").insert({
    id: record.id,
    customer_name: record.customerName,
    phone_number: record.phoneNumber,
    email: record.email,
    gender: record.gender,
    preferred_date: record.preferredDate,
    preferred_time: record.preferredTime,
    clothing_type: record.clothingType,
    measurement_notes: record.measurementNotes,
    custom_design: record.customDesign,
    customer_code: record.customerCode,
    status: record.status,
    status_index: record.statusIndex,
    completion_percent: record.completionPercent,
    estimated_completion_date: record.estimatedCompletionDate,
    admin_notes: record.adminNotes,
  });

  if (!error && payload.customDesign) {
    await supabase.from("custom_requests").insert({
      appointment_id: record.id,
      fabric_type: payload.customRequest?.fabricType ?? null,
      color: payload.customRequest?.color ?? null,
      measurements: payload.customRequest?.measurements ?? null,
      special_instructions: payload.customRequest?.specialInstructions ?? null,
      design_preferences: payload.customRequest?.designPreferences ?? null,
    });
  }

  if (error) {
    mockAppointments.unshift(record);
  }

  return record;
}

export async function findAppointment(phoneNumber: string, customerCode: string) {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return mockAppointments.find((a) => a.phoneNumber === phoneNumber && a.customerCode === customerCode) ?? null;
  }

  const { data } = await supabase
    .from("appointments")
    .select("*")
    .eq("phone_number", phoneNumber)
    .eq("customer_code", customerCode)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    customerName: data.customer_name,
    phoneNumber: data.phone_number,
    email: data.email,
    gender: data.gender,
    preferredDate: data.preferred_date,
    preferredTime: data.preferred_time,
    clothingType: data.clothing_type,
    measurementNotes: data.measurement_notes,
    customDesign: data.custom_design,
    customerCode: data.customer_code,
    status: data.status,
    statusIndex: data.status_index,
    completionPercent: data.completion_percent,
    estimatedCompletionDate: data.estimated_completion_date ?? "",
    adminNotes: data.admin_notes ?? "",
    createdAt: data.created_at,
  } as AppointmentRecord;
}

export async function findAppointmentByCode(customerCode: string) {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return mockAppointments.find((a) => a.customerCode === customerCode) ?? null;
  }

  const { data } = await supabase.from("appointments").select("*").eq("customer_code", customerCode).maybeSingle();
  if (!data) return null;

  return {
    id: data.id,
    customerName: data.customer_name,
    phoneNumber: data.phone_number,
    email: data.email,
    gender: data.gender,
    preferredDate: data.preferred_date,
    preferredTime: data.preferred_time,
    clothingType: data.clothing_type,
    measurementNotes: data.measurement_notes,
    customDesign: data.custom_design,
    customerCode: data.customer_code,
    status: data.status,
    statusIndex: data.status_index,
    completionPercent: data.completion_percent,
    estimatedCompletionDate: data.estimated_completion_date ?? "",
    adminNotes: data.admin_notes ?? "",
    createdAt: data.created_at,
  } as AppointmentRecord;
}

export async function getAppointments() {
  const supabase = createServiceRoleClient();
  if (!supabase) return mockAppointments;

  const { data } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
  if (!data) return mockAppointments;

  return data.map((a) => ({
    id: a.id,
    customerName: a.customer_name,
    phoneNumber: a.phone_number,
    email: a.email,
    gender: a.gender,
    preferredDate: a.preferred_date,
    preferredTime: a.preferred_time,
    clothingType: a.clothing_type,
    measurementNotes: a.measurement_notes,
    customDesign: a.custom_design,
    customerCode: a.customer_code,
    status: a.status,
    statusIndex: a.status_index,
    completionPercent: a.completion_percent,
    estimatedCompletionDate: a.estimated_completion_date ?? "",
    adminNotes: a.admin_notes ?? "",
    createdAt: a.created_at,
  })) as AppointmentRecord[];
}

export async function updateAppointmentStatus(id: string, statusIndex: number, adminNotes?: string) {
  const status = STATUS_STAGES[Math.max(0, Math.min(statusIndex - 1, STATUS_STAGES.length - 1))];
  const completionPercent = getProgressPercent(statusIndex, STATUS_STAGES.length);

  const supabase = createServiceRoleClient();
  if (!supabase) {
    const idx = mockAppointments.findIndex((a) => a.id === id);
    if (idx >= 0) {
      mockAppointments[idx].status = status;
      mockAppointments[idx].statusIndex = statusIndex;
      mockAppointments[idx].completionPercent = completionPercent;
      mockAppointments[idx].adminNotes = adminNotes ?? mockAppointments[idx].adminNotes;
    }
    return;
  }

  await supabase
    .from("appointments")
    .update({ status, status_index: statusIndex, completion_percent: completionPercent, admin_notes: adminNotes })
    .eq("id", id);
}

export async function getAvailability() {
  const supabase = createServiceRoleClient();
  if (!supabase) return { holidayMode: false, rules: mockAvailability };

  const { data } = await supabase.from("availability_rules").select("*").order("date", { ascending: true });
  if (!data) return { holidayMode: false, rules: mockAvailability };

  return {
    holidayMode: data.some((d) => d.holiday_mode),
    rules: data.map((d) => ({ id: d.id, date: d.date, slots: d.slots, isBlocked: d.is_blocked })),
  };
}
