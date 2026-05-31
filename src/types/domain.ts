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
  status: StatusStage;
  statusIndex: number;
  completionPercent: number;
  estimatedCompletionDate: string;
  adminNotes: string;
  createdAt: string;
};

export type AvailabilityRule = {
  id: string;
  date: string;
  slots: string[];
  isBlocked: boolean;
};
