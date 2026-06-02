-- Add the missing address column to the appointments table.
-- This migration should be applied to the remote Supabase database.

alter table public.appointments
  add column if not exists address text not null default '';
