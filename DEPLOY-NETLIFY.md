# PARALLEL AIRE - NETLIFY DEPLOY

Use this if you want:

- GitHub = where your files live
- Netlify = your final live website link

## 1. Push these files/folders to GitHub

Keep these in your repo:

- `app`
- `lib`
- `public`
- `scripts`
- `package.json`
- `package-lock.json`
- `netlify.toml`
- `vite.config.ts`
- `next.config.ts`
- `next-env.d.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `.gitignore`
- `.env.example`
- `SUPABASE-CMS-SETUP.md`
- `DEPLOY-NETLIFY.md`

Do not upload these generated folders:

- `.next`
- `.vinext`
- `.wrangler`
- `dist`
- `gh-pages-dist`
- `docs`
- `node_modules`

## 2. Create the GitHub repo

1. Create a new GitHub repository.
2. Upload or push the project files.
3. Make sure `package.json` and `netlify.toml` are in the root of the repo.

## 3. Connect GitHub to Netlify

1. Log in to Netlify.
2. Click `Add new site`.
3. Click `Import an existing project`.
4. Choose `GitHub`.
5. Authorize GitHub if asked.
6. Select your PARALLEL AIRE repository.

## 4. Use these exact Netlify settings

- **Branch to deploy:** `main`
- **Base directory:** leave blank
- **Build command:** leave blank if Netlify reads `netlify.toml`
- **Publish directory:** leave blank if Netlify reads `netlify.toml`
- **Node version:** leave blank if Netlify reads `netlify.toml`
- **Environment variables:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If Netlify does not auto-read the config, use:

- **Build command:** `npm run build:docs`
- **Publish directory:** `docs`
- **Node version:** `22.13.0`

## 5. Deploy

1. Click `Deploy site`.
2. Wait for the build to finish.
3. Netlify will give you a live URL.
4. Your public site will load from `/`
5. Your built-in CMS will be available at `/admin`

## 6. If you update the website later

1. Edit the files locally.
2. Push the changes to GitHub.
3. Netlify will auto-redeploy the site.

## 7. If the build fails

Check these first:

- `package.json` exists in the repo root
- `netlify.toml` exists in the repo root
- publish directory is `docs`
- build command is `npm run build:docs`
- Supabase environment variables are added in Netlify
- you did not upload `node_modules`

## 8. Recommended

Use Netlify as the final public link.

You do **not** need GitHub Pages if Netlify is your final live site.
