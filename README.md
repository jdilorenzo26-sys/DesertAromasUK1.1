# Desert Aromas – Next.js 13 (Pages Router, Fixed)

A clean, flat, luxury-styled storefront using **Next.js 13 (pages/ router)** and **Tailwind CSS**.

## Quick Start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel
- Import this folder to a Git repo, then to Vercel.
- No special settings needed.
- Aliases fixed via `jsconfig.json` (`@/*`).

## Contact Form (Formspree)
- Works in demo mode by default (simulated success + redirect).
- To enable real submissions:
  1) Create a form in Formspree.
  2) Set env var in Vercel: `NEXT_PUBLIC_FORMSPREE_ID=your_form_id`
  3) Redeploy.

## SEO
- Global title & description are set in `_app.js`.
- Open Graph & Twitter use `/public/og-banner.jpg`.
- `robots.txt` and `sitemap.xml` included (update domain in `public/sitemap.xml`).

## Collections Page
- Static grid (4 sample products, no hover effects).
- Update links to your real TikTok products.
