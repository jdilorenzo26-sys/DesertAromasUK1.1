import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Luxury font pairing (Playfair for headings, Inter for body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Preload OG image for socials */}
        <link rel="preload" as="image" href="/og-banner.jpg" />

        {/* Brand theme color (gold accent) */}
        <meta name="theme-color" content="#D4AF37" />
      </Head>
      <body className="bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
