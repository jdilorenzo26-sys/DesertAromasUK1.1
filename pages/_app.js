import "@/styles/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Capital F to match filename

// Site-wide metadata
const META = {
  title: "Desert Aromas | Luxury Arabian Inspired Perfumes",
  description:
    "Discover our luxury Arabian-inspired perfumes. Elegant, timeless fragrances crafted for those who seek sophistication.",
  url: "https://desertaromas.com", // 🔧 Replace with your actual domain
  image: "/og-banner.jpg",
};

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Basic Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D4AF37" />
        <link rel="icon" href="/favicon.ico" />
        <title>{META.title}</title>
        <meta name="description" content={META.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={META.url} />
        <meta property="og:image" content={META.image} />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />
        <meta name="twitter:image" content={META.image} />
      </Head>

      {/* Layout */}
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
