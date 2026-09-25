create extension if not exists "pgcrypto";

create type public.business_user_role as enum ('owner', 'admin', 'dispatcher', 'driver');
create type public.sale_status as enum ('draft', 'signed', 'cancelled');
create type public.payment_method as enum ('cash', 'transfer', 'credit', 'other');

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text not null default 'America/Mexico_City',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.business_users (
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.business_user_role not null,
  created_at timestamptz not null default now(),
  primary key (business_id, user_id)
);

create table public.devices (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  name text not null,
  activation_code_hash text,
  activation_expires_at timestamptz,
  activated_at timestamptz,
  route_id uuid,
  driver_id uuid,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, id),
  foreign key (business_id, driver_id) references public.business_users(business_id, user_id) on delete restrict
);

create table public.routes (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  code text not null,
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, id),
  unique (business_id, code)
);

alter table public.devices add constraint devices_route_fk foreign key (business_id, route_id) references public.routes(business_id, id) on delete set null;

create table public.route_assignments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  route_id uuid not null,
  driver_id uuid not null,
  device_id uuid,
  service_date date not null,
  created_at timestamptz not null default now(),
  unique (business_id, route_id, service_date),
  foreign key (business_id, route_id) references public.routes(business_id, id) on delete restrict,
  foreign key (business_id, device_id) references public.devices(business_id, id) on delete set null,
  foreign key (business_id, driver_id) references public.business_users(business_id, user_id) on delete restrict
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  name text not null,
  address text,
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, id),
  unique (business_id, name)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  name text not null,
  unit_price_cents bigint not null check (unit_price_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, id),
  unique (business_id, name)
);

create table public.customer_prices (
  business_id uuid not null references public.businesses(id) on delete restrict,
  customer_id uuid not null,
  product_id uuid not null,
  unit_price_cents bigint not null check (unit_price_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (customer_id, product_id),
  foreign key (business_id, customer_id) references public.customers(business_id, id) on delete cascade,
  foreign key (business_id, product_id) references public.products(business_id, id) on delete cascade
);

create table public.sales (
  id uuid primary key,
  business_id uuid not null references public.businesses(id) on delete restrict,
  note_number text not null,
  route_id uuid not null,
  driver_id uuid not null,
  device_id uuid not null,
  customer_id uuid not null,
  occurred_at timestamptz not null,
  subtotal_cents bigint not null check (subtotal_cents >= 0),
  total_cents bigint not null check (total_cents >= 0),
  payment_method public.payment_method not null,
  status public.sale_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  synced_at timestamptz,
  unique (business_id, note_number),
  unique (business_id, id),
  foreign key (business_id, route_id) references public.routes(business_id, id) on delete restrict,
  foreign key (business_id, device_id) references public.devices(business_id, id) on delete restrict,
  foreign key (business_id, customer_id) references public.customers(business_id, id) on delete restrict,
  foreign key (business_id, driver_id) references public.business_users(business_id, user_id) on delete restrict
);

create table public.sale_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  sale_id uuid not null,
  product_id uuid not null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents bigint not null check (unit_price_cents >= 0),
  subtotal_cents bigint not null check (subtotal_cents >= 0),
  created_at timestamptz not null default now(),
  foreign key (business_id, sale_id) references public.sales(business_id, id) on delete restrict,
  foreign key (business_id, product_id) references public.products(business_id, id) on delete restrict
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  sale_id uuid not null,
  method public.payment_method not null,
  amount_cents bigint not null check (amount_cents >= 0),
  created_at timestamptz not null default now(),
  foreign key (business_id, sale_id) references public.sales(business_id, id) on delete restrict
);

create table public.delivery_proofs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  sale_id uuid not null,
  receiver_name text not null,
  signature_storage_path text,
  latitude double precision,
  longitude double precision,
  accuracy_meters double precision,
  captured_at timestamptz,
  signed_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (business_id, sale_id),
  foreign key (business_id, sale_id) references public.sales(business_id, id) on delete restrict
);

create table public.sync_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete restrict,
  entity_type text not null,
  entity_id uuid not null,
  idempotency_key uuid not null,
  status text not null,
  error_code text,
  created_at timestamptz not null default now(),
  unique (business_id, idempotency_key)
);

create index sales_business_date_idx on public.sales (business_id, occurred_at desc);
create index sales_business_status_idx on public.sales (business_id, status);
create index customers_business_active_idx on public.customers (business_id, active);
create index products_business_active_idx on public.products (business_id, active);
create index sync_events_entity_idx on public.sync_events (business_id, entity_type, entity_id);

create or replace function public.is_business_member(target_business_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.business_users
    where business_id = target_business_id and user_id = auth.uid()
  );
$$;

alter table public.businesses enable row level security;
alter table public.profiles enable row level security;
alter table public.business_users enable row level security;
alter table public.devices enable row level security;
alter table public.routes enable row level security;
alter table public.route_assignments enable row level security;
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.customer_prices enable row level security;
alter table public.sales enable row level security;
alter table public.sale_items enable row level security;
alter table public.payments enable row level security;
alter table public.delivery_proofs enable row level security;
alter table public.sync_events enable row level security;

create policy business_member_read on public.businesses for select using (public.is_business_member(id));
create policy business_user_self_read on public.business_users for select using (user_id = auth.uid() or public.is_business_member(business_id));
create policy profile_self_read on public.profiles for select using (id = auth.uid());

create policy tenant_read_devices on public.devices for select using (public.is_business_member(business_id));
create policy tenant_read_routes on public.routes for select using (public.is_business_member(business_id));
create policy tenant_read_assignments on public.route_assignments for select using (public.is_business_member(business_id));
create policy tenant_read_customers on public.customers for select using (public.is_business_member(business_id));
create policy tenant_read_products on public.products for select using (public.is_business_member(business_id));
create policy tenant_read_customer_prices on public.customer_prices for select using (public.is_business_member(business_id));
create policy tenant_read_sales on public.sales for select using (public.is_business_member(business_id));
create policy tenant_read_sale_items on public.sale_items for select using (public.is_business_member(business_id));
create policy tenant_read_payments on public.payments for select using (public.is_business_member(business_id));
create policy tenant_read_delivery_proofs on public.delivery_proofs for select using (public.is_business_member(business_id));
create policy tenant_read_sync_events on public.sync_events for select using (public.is_business_member(business_id));

comment on table public.sales is 'La inserción sincronizada debe validarse mediante una Edge Function o RPC idempotente; no confiar en totales del cliente.';
comment on column public.delivery_proofs.signature_storage_path is 'Referencia a Supabase Storage; el archivo no se guarda en PostgreSQL.';
