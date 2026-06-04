create extension if not exists "pgcrypto";

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
	select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

create table if not exists public.designs (
	id uuid primary key default gen_random_uuid(),
	title text not null,
	category text not null,
	description text not null,
	price numeric(10,2) not null,
	image_url text not null,
	available boolean not null default true,
	is_featured boolean not null default false,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
	id uuid primary key default gen_random_uuid(),
	customer_name text not null,
	phone_number text not null,
	address text not null,
	email text not null,
	gender text not null,
	preferred_date date not null,
	preferred_time text not null,
	clothing_type text not null,
	measurement_notes text,
	custom_design boolean not null default false,
	customer_code text not null unique,
	status text not null default 'Appointment Submitted',
	status_index int not null default 1,
	completion_percent int not null default 16,
	estimated_completion_date date,
	admin_notes text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.custom_requests (
	id uuid primary key default gen_random_uuid(),
	appointment_id uuid not null references public.appointments(id) on delete cascade,
	fabric_type text,
	color text,
	measurements text,
	special_instructions text,
	design_preferences text,
	created_at timestamptz not null default now()
);

create table if not exists public.appointment_status_history (
	id uuid primary key default gen_random_uuid(),
	appointment_id uuid not null references public.appointments(id) on delete cascade,
	status text not null,
	status_index int not null,
	admin_notes text,
	created_at timestamptz not null default now()
);

create table if not exists public.availability_rules (
	id uuid primary key default gen_random_uuid(),
	date date not null unique,
	slots text[] not null default '{}',
	is_blocked boolean not null default false,
	holiday_mode boolean not null default false,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

-- Application settings singleton
CREATE TABLE IF NOT EXISTS app_settings (
	id text PRIMARY KEY,
	site_title text,
	phone_number text,
	contact_email text,
	whatsapp_template text,
	logo_url text,
	homepage_content jsonb DEFAULT '{}',
	status_stages text[] DEFAULT ARRAY['Appointment Submitted','Appointment Confirmed','Measurements Received','Production Started','Final Stitching','Ready for Pickup']::text[],
	updated_at timestamptz DEFAULT now()
);

-- ensure singleton row exists
INSERT INTO app_settings (id, site_title) VALUES ('singleton', 'RMS Ladies Boutique') ON CONFLICT (id) DO NOTHING;

-- Email templates for notifications
CREATE TABLE IF NOT EXISTS email_templates (
	key text PRIMARY KEY,
	subject text NOT NULL,
	body text NOT NULL,
	updated_at timestamptz DEFAULT now()
);

-- Measurement fields for appointment forms
CREATE TABLE IF NOT EXISTS measurement_fields (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	key text NOT NULL UNIQUE,
	label text NOT NULL,
	type text NOT NULL DEFAULT 'text',
	required boolean NOT NULL DEFAULT false,
	options text[] DEFAULT '{}'::text[],
	ordering int NOT NULL DEFAULT 100,
	created_at timestamptz DEFAULT now()
);
alter table public.designs enable row level security;
alter table public.appointments enable row level security;
alter table public.custom_requests enable row level security;
alter table public.appointment_status_history enable row level security;
alter table public.availability_rules enable row level security;

drop policy if exists "Admins can manage designs" on public.designs;
create policy "Admins can manage designs"
on public.designs for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage availability" on public.availability_rules;
create policy "Admins can manage availability"
on public.availability_rules for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage appointments" on public.appointments;
create policy "Admins can manage appointments"
on public.appointments for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage custom requests" on public.custom_requests;
create policy "Admins can manage custom requests"
on public.custom_requests for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can manage appointment status history" on public.appointment_status_history;
create policy "Admins can manage appointment status history"
on public.appointment_status_history for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public can read design-catalog objects" on storage.objects;
create policy "Public can read design-catalog objects"
on storage.objects for select
using (bucket_id = 'design-catalog');

drop policy if exists "Admins can write design-catalog objects" on storage.objects;
create policy "Admins can write design-catalog objects"
on storage.objects for insert
with check (bucket_id = 'design-catalog' and public.is_admin_user());

drop policy if exists "Admins can update design-catalog objects" on storage.objects;
create policy "Admins can update design-catalog objects"
on storage.objects for update
using (bucket_id = 'design-catalog' and public.is_admin_user())
with check (bucket_id = 'design-catalog' and public.is_admin_user());

drop policy if exists "Admins can delete design-catalog objects" on storage.objects;
create policy "Admins can delete design-catalog objects"
on storage.objects for delete
using (bucket_id = 'design-catalog' and public.is_admin_user());

insert into storage.buckets (id, name, public)
values ('design-catalog', 'design-catalog', true)
on conflict (id) do nothing;

do $$
begin
	if not exists (
		select 1
		from pg_publication pub
		join pg_publication_rel rel on rel.prpubid = pub.oid
		join pg_class cls on cls.oid = rel.prrelid
		join pg_namespace nsp on nsp.oid = cls.relnamespace
		where pub.pubname = 'supabase_realtime'
		  and nsp.nspname = 'public'
		  and cls.relname = 'appointments'
	) then
		alter publication supabase_realtime add table public.appointments;
	end if;
end $$;

do $$
begin
	if not exists (
		select 1
		from pg_publication pub
		join pg_publication_rel rel on rel.prpubid = pub.oid
		join pg_class cls on cls.oid = rel.prrelid
		join pg_namespace nsp on nsp.oid = cls.relnamespace
		where pub.pubname = 'supabase_realtime'
		  and nsp.nspname = 'public'
		  and cls.relname = 'appointment_status_history'
	) then
		alter publication supabase_realtime add table public.appointment_status_history;
	end if;
end $$;
