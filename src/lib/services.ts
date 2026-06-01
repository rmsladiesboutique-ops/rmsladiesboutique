import { addDays, format } from "date-fns";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { mockAppointments, mockAvailability, mockDesigns } from "@/lib/mock-data";
import { generateCustomerCode, getProgressPercent } from "@/lib/utils";
import {
  STATUS_STAGES,
  type AppointmentPayload,
  type AppointmentRecord,
  type DesignItem,
  type StatusHistoryEntry,
  type AppSettings,
  type EmailTemplate,
  type HomepageContent,
  type MeasurementField,
} from "@/types/domain";

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

export async function updateAppointmentStatus(id: string, status: string, adminNotes?: string, statusIndex?: number) {
  const supabase = createServiceRoleClient();

  if (!supabase) {
    const idx = mockAppointments.findIndex((a) => a.id === id);
    if (idx >= 0) {
      const nextStatusIndex = statusIndex ?? mockAppointments[idx].statusIndex;
      const nextCompletionPercent = getProgressPercent(nextStatusIndex, STATUS_STAGES.length);
      mockAppointments[idx].status = status;
      mockAppointments[idx].statusIndex = nextStatusIndex;
      mockAppointments[idx].completionPercent = nextCompletionPercent;
      mockAppointments[idx].adminNotes = adminNotes ?? mockAppointments[idx].adminNotes;
    }
    return;
  }

  const { data: current } = await supabase.from("appointments").select("status_index, completion_percent").eq("id", id).maybeSingle();
  const nextStatusIndex = statusIndex ?? current?.status_index ?? 1;
  const nextCompletionPercent = statusIndex === undefined ? current?.completion_percent ?? getProgressPercent(nextStatusIndex, STATUS_STAGES.length) : getProgressPercent(nextStatusIndex, STATUS_STAGES.length);

  await supabase
    .from("appointments")
    .update({ status, status_index: nextStatusIndex, completion_percent: nextCompletionPercent, admin_notes: adminNotes })
    .eq("id", id);
}

export async function getAppointmentHistory(appointmentId: string): Promise<StatusHistoryEntry[]> {
  const supabase = createServiceRoleClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("appointment_status_history")
    .select("*")
    .eq("appointment_id", appointmentId)
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((d) => ({
    id: d.id,
    appointmentId: d.appointment_id,
    status: d.new_status ?? d.new_status,
    statusIndex: d.new_status_index ?? d.new_status_index ?? 0,
    adminNotes: d.notes ?? null,
    createdAt: d.created_at,
  }));
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

export async function getSettings(): Promise<AppSettings | null> {
  const supabase = createServiceRoleClient();
  if (!supabase) return null;

  const { data } = await supabase.from("app_settings").select("*").maybeSingle();
  if (!data) return null;

  return {
    siteTitle: data.site_title ?? "",
    phoneNumber: data.phone_number ?? "",
    whatsappTemplate: data.whatsapp_template ?? "",
    logoUrl: data.logo_url ?? "",
    statusStages: (data.status_stages as string[]) ?? [],
    homepageContent: (data.homepage_content as HomepageContent) ?? undefined,
  };
}

export async function updateSettings(payload: Partial<AppSettings>) {
  const supabase = createServiceRoleClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("app_settings")
    .upsert(
      {
        id: "singleton",
        site_title: payload.siteTitle,
        phone_number: payload.phoneNumber,
        whatsapp_template: payload.whatsappTemplate,
        logo_url: payload.logoUrl,
        homepage_content: payload.homepageContent,
        status_stages: payload.statusStages,
      },
      { onConflict: "id" },
    )
    .select()
    .maybeSingle();

  if (error) return null;
  return data;
}

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  const supabase = createServiceRoleClient();
  if (!supabase) return [];

  const { data } = await supabase.from("email_templates").select("*").order("updated_at", { ascending: false });
  if (!data) return [];
  return data.map((d) => ({ key: d.key, subject: d.subject, body: d.body, updatedAt: d.updated_at }));
}

export async function upsertEmailTemplate(t: { key: string; subject: string; body: string }) {
  const supabase = createServiceRoleClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("email_templates")
    .upsert({ key: t.key, subject: t.subject, body: t.body, updated_at: new Date().toISOString() }, { onConflict: "key" })
    .select()
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function deleteEmailTemplate(key: string) {
  const supabase = createServiceRoleClient();
  if (!supabase) return null;
  const { error } = await supabase.from("email_templates").delete().eq("key", key);
  return error ? null : true;
}

export async function getMeasurementFields(): Promise<MeasurementField[]> {
  const supabase = createServiceRoleClient();
  if (!supabase) return [];

  const { data } = await supabase.from("measurement_fields").select("*").order("ordering", { ascending: true });
  if (!data) return [];

  return data.map((d) => ({
    id: d.id,
    key: d.key,
    label: d.label,
    type: (d.type as "text" | "number" | "select" | "textarea"),
    required: d.required,
    options: d.options ?? [],
    order: d.ordering,
  }));
}

export async function upsertMeasurementField(f: Partial<MeasurementField> & { key?: string }) {
  const supabase = createServiceRoleClient();
  if (!supabase) return null;
  const payload: Partial<MeasurementField> & { key?: string; ordering?: number } = {
    key: f.key,
    label: f.label,
    type: f.type ?? "text",
    required: f.required ?? false,
    options: f.options ?? [],
    ordering: f.order ?? 100,
  };
  const { data, error } = await supabase.from("measurement_fields").upsert(payload, { onConflict: "key" }).select().maybeSingle();
  if (error) return null;
  return data;
}

export async function deleteMeasurementField(id: string) {
  const supabase = createServiceRoleClient();
  if (!supabase) return null;
  const { error } = await supabase.from("measurement_fields").delete().eq("id", id);
  return error ? null : true;
}
