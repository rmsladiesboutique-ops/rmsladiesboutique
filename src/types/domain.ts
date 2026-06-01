export const STATUS_STAGES = [
  "Appointment Submitted",
  "Appointment Confirmed",
  "Measurements Received",
  "Production Started",
  "Final Stitching",
  "Ready for Pickup",
] as const;

export type StatusStage = (typeof STATUS_STAGES)[number];

export type DesignItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
};

export type StatusHistoryEntry = {
  id: string;
  appointmentId: string;
  status: string;
  statusIndex: number;
  adminNotes: string | null;
  createdAt: string;
};

export type AppointmentPayload = {
  customerName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  preferredDate: string;
  preferredTime: string;
  clothingType: string;
  measurementNotes: string;
  customDesign: boolean;
  customRequest?: {
    fabricType?: string;
    color?: string;
    measurements?: string;
    specialInstructions?: string;
    designPreferences?: string;
  };
};

export type AppointmentRecord = AppointmentPayload & {
  id: string;
  customerCode: string;
  status: string;
  statusIndex: number;
  completionPercent: number;
  estimatedCompletionDate: string;
  adminNotes: string;
  createdAt: string;
  statusHistory?: StatusHistoryEntry[];
};

export type AvailabilityRule = {
  id: string;
  date: string;
  slots: string[];
  isBlocked: boolean;
};

export type AppSettings = {
  siteTitle: string;
  phoneNumber: string;
  whatsappTemplate: string;
  logoUrl: string;
  statusStages: string[];
};

export type EmailTemplate = {
  key: string;
  subject: string;
  body: string;
  updatedAt: string;
};

export type MeasurementField = {
  id: string;
  key: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  required: boolean;
  options?: string[];
  order: number;
};
