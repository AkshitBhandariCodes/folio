# Akshit Bhandari — Portfolio

A Next.js portfolio with a monochrome cricket banner, project briefs, and a web résumé.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Validate with `npm run typecheck` and `npm run build`.

## Content

- `app/page.tsx`: profile and homepage sections
- `data/projects.ts`: compact project metadata
- `components/project-brief.tsx`: short challenge and solution notes
- `components/profile-banner.tsx`: monochrome photograph with optional clip playback
- `app/llms.txt/route.ts`: machine-readable portfolio links
- `components/footer.tsx`: pixel garden, interactive Pal, and contact links
- `components/navigation.tsx`: section index, keyboard command menu, persistent dark/light theme
- `app/globals.css`: typography, themes, layout, interactions, and responsive styles

Bricolage Grotesque is used for headlines, Geist Sans for body copy, and Geist Pixel for secondary information. The self-hosted fonts and their licenses are in `public/fonts/`.

## Guestbook

`lib/supabase.ts` uses the existing Supabase project and typed `guestbook_messages` schema. Copy `.env.example` to `.env.local` and set the public URL and anon key. Local configuration has been copied from the previous portfolio without printing its values.

Public reads return only approved messages, excluding emails. GitHub/Google OAuth use the existing providers; permit the deployed URL and `http://localhost:3000/` in Supabase Auth redirect settings when testing locally. Signed-in submissions use RLS and enter pending moderation. Administrators are checked through the existing `current_user_is_admin` RPC, with approve/delete controls backed by the existing policies. No new tables or policies are applied.

## Visitors

Run `supabase/portfolio-visitors.sql` in the existing Supabase project to enable the visitor badge. The script can be reapplied and preserves existing visitor records. Total counts distinct browser IDs. The eye shows distinct browsers seen in the last 90 seconds, with a heartbeat every 25 seconds while a portfolio page is visible.

## Media and engineering sources

The banner loops the existing Kohli signing clip in monochrome with a pointer-controlled color spotlight. The web résumé and /llms.txt share the transcription of the original PDF. The optional SnipWise launch film comes from the owner's `snipwise-launch-video` project. Project screenshots and marks come from the actual sites and repositories. The profile uses the owner’s supplied illustrated portrait.

SnipWise's narrative follows the current `PROJECT.md` and beta release notes, not the stale extension writeup. Sync design remains distinguished from the current Windows beta. Push2Prod follows the newer current-state docs, with EKS/SQS deployment work marked as planned. Deviators follows the schema, handlers, and event notes without unverified uptime claims.

The macOS-style portfolio lives in the separate [Portfolio repository](https://github.com/AkshitBhandariCodes/Portfolio).

The cursor companion uses the [Neko sprite sheet](https://github.com/crgimenes/neko/tree/434c51a0beceef5535d7424c18c22678f861127c). The upstream license is included in `public/neko/LICENSE.txt`.

Display headings use [Not Jam Serif 15](https://not-jam.itch.io/not-jam-serif-12), distributed under CC0. The license is in `public/fonts/NotJamSerif-CC0.txt`. The Google sign-in mark comes from [Google’s official brand assets](https://developers.google.com/identity/branding-guidelines).
