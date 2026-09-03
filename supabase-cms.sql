-- Run once in Supabase SQL Editor. Add your CMS user's auth.users ID to cms_admins.
create table if not exists public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_cms_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.cms_admins where user_id = auth.uid()) $$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), name text not null, category text not null check (category in ('Residential','Commercial')),
  type text not null, models text not null default '', description text not null default '', image_url text not null default '',
  display_order integer not null default 0, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
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

create policy "Public reads active products" on public.products for select to anon, authenticated using (is_active);
create policy "Public reads active services" on public.services for select to anon, authenticated using (is_active);
create policy "Public reads active brands" on public.brands for select to anon, authenticated using (is_active);
create policy "CMS admins manage products" on public.products for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());
create policy "CMS admins manage services" on public.services for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());
create policy "CMS admins manage brands" on public.brands for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Authenticated users can insert site content" on public.site_content;
drop policy if exists "Authenticated users can update site content" on public.site_content;
create policy "CMS admins manage site content" on public.site_content for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

insert into storage.buckets (id, name, public) values ('site-assets', 'site-assets', true) on conflict (id) do nothing;
create policy "CMS admins upload site assets" on storage.objects for insert to authenticated with check (bucket_id = 'site-assets' and public.is_cms_admin());
create policy "CMS admins update site assets" on storage.objects for update to authenticated using (bucket_id = 'site-assets' and public.is_cms_admin()) with check (bucket_id = 'site-assets' and public.is_cms_admin());
create policy "CMS admins delete site assets" on storage.objects for delete to authenticated using (bucket_id = 'site-assets' and public.is_cms_admin());
