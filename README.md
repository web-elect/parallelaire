# Parallel Aire - Netlify Deployment

Upload the entire contents of this folder to one new GitHub repository.

Then in Netlify, choose **Add new site** > **Import an existing project** > select that GitHub repository.

Do not change the build settings. Netlify reads `netlify.toml` automatically.

For the CMS, add the Supabase values from `.env.example` in Netlify under **Site configuration** > **Environment variables**.
