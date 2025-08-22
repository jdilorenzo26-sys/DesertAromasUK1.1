import '@/styles/globals.css'
import Head from 'next/head'
import Navbar from '@/components/Navbar'

const SITE_TITLE = 'Desert Aromas | Luxury Arabian Inspired Perfumes';
const SITE_DESC = 'Discover our luxury Arabian-inspired perfumes. Elegant, timeless fragrances crafted for those who seek sophistication.';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D4AF37" />
        <link rel="icon" href="/favicon.ico" />
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESC} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-banner.jpg" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESC} />
        <meta name="twitter:image" content="/og-banner.jpg" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}
