# SPL Corporate Services admin layout editor

The admin editor is available at `/admin`.

## Demo sign-in

- Email: `admin@splfintax.com`
- Password: `SPLAdmin@2026`

After signing in, the full-page editor loads the existing rendered HTML and matching CSS for Navbar links, Home, About, Services, Arjun, service-detail pages, Knowledge Bank, team profiles, and Contact. The Arjun editor target publishes to the independent `/arjun` path. Use **Format** for Prettier formatting, then **Save page** for a browser-local draft. Navbar edits change the public navigation entries. Service-detail and team-profile edits apply to their shared templates. **Restore original** returns a page to its React implementation. The live preview is alongside the editor.

To publish for visitors, select **Push to GitHub**. The repository defaults to `anjaneyuluj157-beep/spl2`, with branch `main`; change either if your Netlify site deploys from a different repository or branch. Create a fine-grained personal access token, grant it access to the selected repository, and enable **Contents: Read and write**. Commit the update to `public/site-edits.json`; the app loads that file on page load. If Netlify deploys that branch, visitors receive the edit after the deploy completes. The token is not retained when the dialog closes. The editor’s exported page CSS omits the broad `section { padding: 76px 0; }` rule so it is not unintentionally copied into a single page’s custom styles.

## Important security and storage notes

This is a frontend-only demo. The static credentials and session check are included in the client bundle and can be bypassed; they do **not** provide real security. Local drafts are saved in browser `localStorage`; use the GitHub commit action to make a published edit available to other visitors. The token is not written to local storage, but is used directly by the browser to call GitHub. The editor accepts HTML and CSS; scripts and unsafe markup are removed. Existing enquiry forms keep their submit handler on saved pages, but forms cannot be submitted inside the isolated preview. It cannot edit React/JSX source or launch desktop VS Code.

For production, move both admin authentication and GitHub publishing behind a trusted server or Netlify Function; do not rely on the demo password or distribute a write token to site users. The editor does not modify React/JSX source files.
