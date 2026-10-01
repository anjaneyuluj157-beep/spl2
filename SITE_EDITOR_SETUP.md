# SPL Corporate Services visual editor setup

The editor is available at `/admin`. It keeps the existing public site working until Supabase is configured. Published settings are stored in Supabase and loaded by each visitor's browser.

## 1. Create the backend

1. Create a Supabase project. The editor uses Supabase Auth and its Postgres database; the free plan may be suitable for a small site, subject to Supabase's current limits and terms.
2. In the Supabase dashboard, open **SQL Editor** and run the contents of `supabase/site_editor.sql`.
3. In **Authentication → Users**, create the administrator account and verify its email if email confirmation is enabled.
4. Return to **SQL Editor**, replace `your-admin-email@example.com` in the final example statement with that account's email, uncomment the statement, and run it. This adds that user to the admin allowlist. Authentication alone does not grant publish access.

## 2. Configure the Vite app

Copy `.env.example` to `.env` if needed, then set:

- `VITE_SUPABASE_URL` to the project's Project URL.
- `VITE_SUPABASE_ANON_KEY` to the project's public anon/publishable key.

Restart the Vite dev server after changing environment variables. Then sign in at `/admin` with the allowlisted account.

## 3. Publish changes

The first editor version can update the brand name/tagline, navigation labels/order/visibility/destinations, site palette, and the marked text fields. Click **Publish changes** to make these settings available to public visitors. The preview has a page selector; marked copy can also be selected by clicking it in the preview.

For production, add the same two `VITE_SUPABASE_*` values to the hosting provider's environment settings and rebuild/redeploy the Vite site. Do not add a service-role key to `.env`, frontend code, or any `VITE_` variable. The SQL row-level security policies are the authority for deciding who can publish.

## Scope note

This first version edits the existing React site's settings and marked content safely. It does not yet support arbitrary drag-and-drop creation/reordering of every React section or replacing every image; that requires converting the existing pages into a complete page-builder component model.
