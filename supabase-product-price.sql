-- Safe for existing products. No records or existing prices are overwritten.
alter table public.products add column if not exists price text;
notify pgrst, 'reload schema';
