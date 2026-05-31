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
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
	id uuid primary key default gen_random_uuid(),
	customer_name text not null,
	phone_number text not null,
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

create table if not exists public.availability_rules (
	id uuid primary key default gen_random_uuid(),
	date date not null unique,
	slots text[] not null default '{}',
	is_blocked boolean not null default false,
	holiday_mode boolean not null default false,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.designs enable row level security;
alter table public.appointments enable row level security;
alter table public.custom_requests enable row level security;
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
