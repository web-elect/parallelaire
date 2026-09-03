-- Run once in Supabase SQL Editor. Add your CMS user's auth.users ID to cms_admins.
create table if not exists public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.cms_admins enable row level security;

create or replace function public.is_cms_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.cms_admins where user_id = auth.uid()) $$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), name text not null, category text not null check (category in ('Residential','Commercial')),
  type text not null, models text not null default '', description text not null default '', image_url text not null default '',
  display_order integer not null default 0, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.products add column if not exists price text;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(), name text not null, description text not null default '', image_url text not null default '',
  cta_text text not null default 'LEARN MORE', display_order integer not null default 0, is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(), name text not null, logo_url text not null default '', display_order integer not null default 0,
  is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.brands enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "Public reads active products" on public.products;
drop policy if exists "Public reads active services" on public.services;
drop policy if exists "Public reads active brands" on public.brands;
drop policy if exists "CMS admins manage products" on public.products;
drop policy if exists "CMS admins manage services" on public.services;
drop policy if exists "CMS admins manage brands" on public.brands;
create policy "Public reads active products" on public.products for select to anon, authenticated using (is_active);
create policy "Public reads active services" on public.services for select to anon, authenticated using (is_active);
create policy "Public reads active brands" on public.brands for select to anon, authenticated using (is_active);
create policy "CMS admins manage products" on public.products for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());
create policy "CMS admins manage services" on public.services for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());
create policy "CMS admins manage brands" on public.brands for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Authenticated users can insert site content" on public.site_content;
drop policy if exists "Authenticated users can update site content" on public.site_content;
drop policy if exists "CMS admins manage site content" on public.site_content;
create policy "CMS admins manage site content" on public.site_content for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

insert into storage.buckets (id, name, public) values ('site-assets', 'site-assets', true) on conflict (id) do nothing;
update storage.buckets set file_size_limit = 5242880,
allowed_mime_types = array['image/jpeg','image/png','image/webp','image/svg+xml']
where id = 'site-assets';
drop policy if exists "Authenticated users can upload site assets" on storage.objects;
drop policy if exists "Authenticated users can update site assets" on storage.objects;
drop policy if exists "Authenticated users can delete site assets" on storage.objects;
-- Restrictive policies also constrain any older permissive write policies.
drop policy if exists "Require admin for site asset inserts" on storage.objects;
create policy "Require admin for site asset inserts" on storage.objects as restrictive for insert to anon, authenticated
with check (bucket_id <> 'site-assets' or public.is_cms_admin());
drop policy if exists "Require admin for site asset updates" on storage.objects;
create policy "Require admin for site asset updates" on storage.objects as restrictive for update to anon, authenticated
using (bucket_id <> 'site-assets' or public.is_cms_admin()) with check (bucket_id <> 'site-assets' or public.is_cms_admin());
drop policy if exists "Require admin for site asset deletes" on storage.objects;
create policy "Require admin for site asset deletes" on storage.objects as restrictive for delete to anon, authenticated
using (bucket_id <> 'site-assets' or public.is_cms_admin());
drop policy if exists "Public can view site assets" on storage.objects;
create policy "Public can view site assets" on storage.objects for select to anon, authenticated using (bucket_id = 'site-assets');
drop policy if exists "CMS admins upload site assets" on storage.objects;
drop policy if exists "CMS admins update site assets" on storage.objects;
drop policy if exists "CMS admins delete site assets" on storage.objects;
create policy "CMS admins upload site assets" on storage.objects for insert to authenticated with check (bucket_id = 'site-assets' and public.is_cms_admin());
create policy "CMS admins update site assets" on storage.objects for update to authenticated using (bucket_id = 'site-assets' and public.is_cms_admin()) with check (bucket_id = 'site-assets' and public.is_cms_admin());
create policy "CMS admins delete site assets" on storage.objects for delete to authenticated using (bucket_id = 'site-assets' and public.is_cms_admin());

-- Seed the products, services, and brands already shown on the website.
-- This runs only when the relevant table is still empty.
do $$ begin
  if not exists (select 1 from public.products) then
    insert into public.products (name, category, type, models, description, image_url, display_order) values
    ('Wall Mounted','Residential','Wall Mounted','Optima • Aura','Residential wall-mounted air conditioning units.','https://strapi.carrier.com.ph/uploads/Image_23_12aadcdd46.png',1),
    ('Window Type','Residential','Window Type','Optima • Aura','Carrier window-type air conditioning units.','https://strapi.carrier.com.ph/uploads/CAR_Optima_Inverter_0_75_HP_1_0_HP_1_45ec258d94.png',2),
    ('Floor Mounted','Residential','Floor Mounted','Slim • Opus','Floor-mounted comfort for residential spaces.','https://strapi.carrier.com.ph/uploads/carrier_opus_668a980c25.webp',3),
    ('Floor Mounted','Commercial','Floor Mounted','Optima','Commercial floor-mounted cooling solutions.','https://strapi.carrier.com.ph/uploads/Image_20_ea0469d063.png',4),
    ('Under Ceiling','Commercial','Under Ceiling','Commercial Series','Under-ceiling commercial air conditioning.','https://brandportal.carrier.com/transform/da527147-7b33-49da-ba3f-fcf331fb7c82/carrier-40vmu-30k-underceiling-indoor-unit',5),
    ('Cassette Type','Commercial','Cassette Type','Optima Cassette','Ceiling cassette systems for commercial areas.','https://strapi.carrier.com.ph/uploads/Image_25_b12cf24e90.png',6),
    ('VRF','Commercial','VRF','XCT7 System','Variable refrigerant flow system solutions.','https://strapi.carrier.com.ph/uploads/Image_11_4f19e889a4.png',7);
  end if;
  if not exists (select 1 from public.services) then
    insert into public.services (name, description, image_url, display_order) values
    ('Aircon Sales','Wide selection of trusted brands and high-quality airconditioning units.','/service-air-sales.jpg',1),
    ('Parts Sales','Genuine and high-quality aircon parts for all brands and models.','/service-parts.jpg',2),
    ('Installation Services','Professional installation for residential, commercial, and industrial spaces.','/install.jpg',3),
    ('Maintenance Services','Regular cleaning and maintenance to keep your aircon running efficiently.','/maintenance.jpg',4);
  end if;
  if not exists (select 1 from public.brands) then
    insert into public.brands (name, logo_url, display_order) values
    ('Carrier','/assets/brands/carrier.png',1),('Midea','/assets/brands/midea.png',2),('Toshiba','/assets/brands/toshiba.svg',3),('Condura','/assets/brands/condura.png',4),('Panasonic','/assets/brands/panasonic.png',5),('Mitsubishi','/assets/brands/mitsubishi.svg',6),('LG','/assets/brands/lg.png',7),('Daikin','/assets/brands/daikin.png',8),('Samsung','/assets/brands/samsung.png',9),('Koppel','/assets/brands/koppel.svg',10),('Kolin','/assets/brands/kolin.png',11);
  end if;
end $$;
