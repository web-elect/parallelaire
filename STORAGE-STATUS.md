# CMS storage status

CMS uploads use the existing public Supabase bucket `site-assets`. The browser uploads directly to Storage and database records store public Storage URLs. No upload handler writes to repository folders. `images.unoptimized` prevents Next image optimization from proxying images through the hosting service.

New uploads require an approved CMS admin, valid decodable JPG/PNG/WebP, a maximum of 5 MB (1 MB for logos), and a unique object name. The media selector lists Supabase objects and reuses their URLs. Replacing/removing a reference does not delete the old object: safe reference-aware garbage collection is not implemented yet.

## Migration pending

No configured Supabase project or authenticated admin session is available locally. Existing images have NOT been migrated or verified in remote Storage.

Temporary fallback exceptions: Hero, About, service images, brand logos, project photos, and the contact image remain in `public`; product defaults use Carrier remote URLs. Keep these until a verified migration updates persisted references. Do not remove fallback files before the database and rendered site point at verified Storage objects.

Permanent assets: favicon and company logo may remain bundled.

The project/gallery and contact-image data paths still need migration to CMS-managed Storage references. This change must not be described as a complete media migration or an end-to-end Storage PASS.

Apply the updated `supabase-cms.sql` to enforce Storage write policies. Remote application and permission verification remain pending. Supabase-hosted media uses Supabase bandwidth/storage quotas; Netlify still serves site code.
