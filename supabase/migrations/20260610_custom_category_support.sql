-- Ensures design categories can store both preset and custom admin-entered values.

alter table public.designs
  alter column category type text using category::text,
  alter column category set not null;

comment on column public.designs.category is 'Supports preset categories and custom categories entered from the admin dashboard.';
