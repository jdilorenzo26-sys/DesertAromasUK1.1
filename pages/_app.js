import '@/styles/globals.css'
import Head from 'next/head'
import Navbar from '@/components/Navbar'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D4AF37" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Luxury Arabic-inspired perfumes, curated in the UK. Discover elegance with Desert Aromas." />
        <meta property="og:title" content="Desert Aromas UK | Luxury Arabian-Inspired Perfumes" />
        <meta property="og:description" content="Luxury Arabic-inspired perfumes, curated in the UK. Discover elegance with Desert Aromas." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Desert Aromas UK | Luxury Arabian-Inspired Perfumes" />
        <meta name="twitter:description" content="Luxury Arabic-inspired perfumes, curated in the UK." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <title>Desert Aromas UK | Luxury Arabian-Inspired Perfumes</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}
