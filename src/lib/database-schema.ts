export const databaseSchema = `
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  favorite_service_id uuid,
  role text not null default 'client',
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  price_cents integer not null check (price_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null unique,
  status text not null default 'available'
    check (status in ('available', 'reserved', 'unavailable')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles(id),
  service_id uuid not null references public.services(id),
  slot_id uuid not null references public.availability_slots(id),
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  status text not null default 'reserved'
    check (status in ('reserved', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (slot_id)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  amount_cents integer not null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);
`;
