import type { AppointmentRecord } from "@/types/domain";

export async function sendBookingEmailNotification(appointment: AppointmentRecord) {
  // Integrate Resend/SendGrid/SMTP provider here.
  console.info(`Email notification queued for ${appointment.email} (${appointment.customerCode})`);
}

export async function sendAppointmentReminder(appointment: AppointmentRecord) {
  // This can be called by a scheduled job or Vercel Cron endpoint.
  console.info(`Reminder queued for ${appointment.phoneNumber} (${appointment.customerCode})`);
}
