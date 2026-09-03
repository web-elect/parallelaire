# Parallel Aire CMS + Supabase Setup

This site now includes a simple built-in CMS at:

`/admin`

The public website reads editable content from Supabase, and the CMS saves content and uploaded images there.

## 1. Environment Variables

Create a local `.env.local` file from `.env.example` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For Netlify, add the same two values in:

`Site settings -> Environment variables`

## 2. Create the Table

For the upgraded CMS, run the complete `supabase-cms.sql` file first. It creates the Products, Services, Brands, CMS Admins, and secure Storage policies.

After creating the CMS login user, run this once with that user's UUID from Authentication > Users:

```sql
insert into public.cms_admins (user_id)
values ('YOUR_CMS_USER_UUID')
on conflict (user_id) do nothing;
```

The older `site_content` setup below remains supported for Website Content.

Run this SQL in the Supabase SQL editor:

```sql
create table if not exists public.site_content (
  slug text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_content (slug, content)
values ('home', '{}'::jsonb)
on conflict (slug) do nothing;
```

## 3. Enable Row Level Security

```sql
alter table public.site_content enable row level security;
```

## 4. Policies

Public can read the website content:

```sql
create policy "Public can read site content"
on public.site_content
for select
to public
using (true);
```

Authenticated CMS users can insert/update:

```sql
create policy "Authenticated users can insert site content"
on public.site_content
for insert
to authenticated
with check (true);

create policy "Authenticated users can update site content"
on public.site_content
for update
to authenticated
using (true)
with check (true);
```

## 5. Create the Storage Bucket

Create a public bucket named:

`site-assets`

Then run:

```sql
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;
```

## 6. Storage Policies

Public can view uploaded assets:

```sql
create policy "Public can view site assets"
on storage.objects
for select
to public
using (bucket_id = 'site-assets');
```

Authenticated CMS users can upload/update:

```sql
create policy "Authenticated users can upload site assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

create policy "Authenticated users can update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');
```

Optional delete policy:

```sql
create policy "Authenticated users can delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');
```

## 7. Create the CMS Login User

In Supabase:

`Authentication -> Users -> Add user`

Use your preferred admin email and password.

That account signs into:

`/admin`

## 8. What the CMS Can Edit Right Now

- company name/tagline/footer text
- top utility bar text
- social links
- hero content and hero image
- about section content and image
- service section heading
- full raw JSON for services, contact info, inquiry options, support points, and testimonials

## 9. How Image Upload Works

When you upload an image in the CMS:

- the file is sent to Supabase Storage
- it is saved under the `site-assets` bucket
- the public URL is stored in the site content
- the deployed website uses that URL immediately after save

## 10. Recommended Flow

1. Deploy the site
2. Set the two Supabase environment variables
3. Run the SQL above
4. Create the `site-assets` bucket
5. Create one CMS admin user
6. Open `/admin`
7. Sign in and update content
