import { addDays, formatISO } from "date-fns";
import { STATUS_STAGES, type AppointmentRecord, type AvailabilityRule, type DesignItem } from "@/types/domain";

export const mockDesigns: DesignItem[] = [
  {
    id: "d1",
    title: "Midnight Tuxedo",
    category: "Formal",
    description: "Hand-finished tuxedo with satin lapels and custom lining.",
    price: 900,
    imageUrl: "https://images.unsplash.com/photo-1593032465171-8bd0f9af6f2e?auto=format&fit=crop&w=1200&q=80",
    available: true,
  },
  {
    id: "d2",
    title: "Royal Sherwani",
    category: "Traditional",
    description: "Embroidered sherwani crafted for weddings and grand events.",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
    available: true,
  },
  {
    id: "d3",
    title: "Classic Three-Piece",
    category: "Business",
    description: "Tailored vest and blazer set designed for executive wear.",
    price: 750,
    imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=80",
    available: false,
  },
];

export const mockAvailability: AvailabilityRule[] = [
  { id: "a1", date: "2026-06-02", slots: ["10:00", "12:00", "14:00"], isBlocked: false },
  { id: "a2", date: "2026-06-03", slots: ["11:00", "13:00", "16:00"], isBlocked: false },
  { id: "a3", date: "2026-06-04", slots: [], isBlocked: true },
];

export const mockAppointments: AppointmentRecord[] = [
  {
    id: "b1",
    customerName: "Aarav Mehta",
    phoneNumber: "+15550001111",
    email: "aarav@example.com",
    gender: "Female",
    preferredDate: "2026-06-02",
    preferredTime: "12:00",
    clothingType: "Wedding Sherwani",
    measurementNotes: "Slim fit chest, relaxed shoulder.",
    customDesign: true,
    customRequest: {
      fabricType: "Silk blend",
      color: "Ivory",
      measurements: "Chest 40, Waist 34",
      specialInstructions: "Lightweight embroidery",
      designPreferences: "Minimal collar embellishment",
    },
    customerCode: "572184",
    status: STATUS_STAGES[3],
    statusIndex: 4,
    completionPercent: 67,
    estimatedCompletionDate: formatISO(addDays(new Date(), 10), { representation: "date" }),
    adminNotes: "Final fitting scheduled for next week.",
    createdAt: new Date().toISOString(),
  },
];
