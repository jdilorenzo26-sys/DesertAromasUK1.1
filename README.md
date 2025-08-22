# Desert Aromas – Next.js 13 (Stable, Pages Router)

A clean, flat, luxury-styled storefront using **Next.js 13 (pages/ router)** and **Tailwind CSS**.

## 🔧 Quick Start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## 🚀 Deploy to Vercel
- Import this repo to Vercel (no special settings needed).
- Vercel installs deps automatically and builds Next.js.

## ✉️ Contact Form (Formspree)
- The contact page simulates success by default so you can test without errors.
- To enable real submissions:
  1) Create a form at Formspree.
  2) Copy the Form ID (looks like: `abcdwxyz`)
  3) Set a Vercel env var: `NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz`
  4) Re-deploy. The form will post to `https://formspree.io/f/<ID>` and redirect to `/thank-you` on success.

## 🛍 Collections Page
- Static grid with 4 sample perfumes (no hover effects).
- Edit the products in `pages/collections.js` (or we can wire this to a JSON file later if you prefer).

## 🖼 Branding
- Favicon: champagne-gold **DA** monogram.
- OG image: `/public/og-image.jpg` (1200x630). Replace with your own when ready.

## 📁 Structure
- `pages/` — classic Next.js pages (index, collections, about, contact, thank-you, privacy, terms)
- `components/Navbar.jsx` — simple top navigation
- `styles/globals.css` — Tailwind + palette
- `public/` — favicon, og image, product placeholders
- `tailwind.config.js`, `postcss.config.js`, `next.config.js`

## 🔐 Notes
- No persistent server storage (Vercel). If you later want an admin editor, we can add one that downloads a JSON for you to commit.
- For TikTok Shop links: update the `link` field on each product to your real product URLs.

Made with ❤️ for Desert Aromas.
