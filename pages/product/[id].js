// pages/product/[id].js
"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, error, isLoading } = useSWR(
    id ? `/api/products/${id}` : null,
    fetcher
  );

  const recKey =
    product && product.category
      ? `/api/products?status=live&category=${encodeURIComponent(
          product.category
        )}&limit=6&sort=created_at&dir=desc`
      : null;
  const { data: recs = [] } = useSWR(recKey, fetcher);

  const toArr = (v) =>
    Array.isArray(v)
      ? v
      : typeof v === "string"
      ? v.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  const accords = toArr(product?.accords);
  const topNotes = toArr(product?.top_notes);
  const heartNotes = toArr(product?.heart_notes);
  const baseNotes = toArr(product?.base_notes);

  const title = product?.name ? `${product.name} | Desert Aromas` : "Product | Desert Aromas";
  const desc = product?.description || "Discover luxury Arabian-inspired fragrances by Desert Aromas.";
  const img = product?.image_url || "/og-banner.jpg";
  const canonical = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    try {
      const shareData = {
        title: product?.name || "Desert Aromas",
        text: product?.description?.slice(0, 120) || "Luxury Arabian perfumes.",
        url: canonical,
      };
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard");
      }
    } catch (_) {}
  };

  // ----- Loading / error states -----
  if (error)
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto text-center text-red-300">Failed to load product.</div>
      </main>
    );

  if (isLoading || (!product && !error))
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-10 animate-pulse">
          <div className="lg:col-span-2 rounded-2xl border border-[#c5a572]/30 bg-[#2a2723]/70 h-[60vh]" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 w-3/4 bg-white/10 rounded" />
            <div className="h-6 w-1/3 bg-white/10 rounded" />
            <div className="h-32 w-full bg-white/10 rounded" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-white/10 rounded" />
              <div className="h-20 bg-white/10 rounded" />
              <div className="h-20 bg-white/10 rounded" />
            </div>
            <div className="h-12 w-1/2 bg-white/10 rounded" />
          </div>
        </div>
      </main>
    );

  if (!product)
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto text-center text-[#d4c7aa]/80">Product not found.</div>
      </main>
    );

  // ----- JSON-LD for SEO -----
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [img],
    description: product.description || "",
    brand: { "@type": "Brand", name: "Desert Aromas" },
    offers: product.price_text
      ? {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: product.price_text.replace(/[^\d.]/g, "") || "0",
          availability: "https://schema.org/InStock",
          url: canonical || "",
        }
      : undefined,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={img} />
        <meta property="og:site_name" content="Desert Aromas" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={img} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-12">
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-10">
          {/* Image column ~30% */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 shadow-lg"
          >
            <div className="group relative aspect-[3/4] bg-[#1f1c17]">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Info column ~70% */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h1 className="text-3xl sm:text-4xl font-semibold mb-3 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
              {product.name}
            </h1>

            {product.price_text && <div className="text-xl text-[#c5a572]">{product.price_text}</div>}

            {product.description && (
              <p className="mt-5 leading-relaxed text-[#e6dccb]/90">{product.description}</p>
            )}

            {/* Accords */}
            {accords.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-[#c5a572] mb-2">Accords</h3>
                <div className="flex flex-wrap gap-2">
                  {accords.map((a, i) => (
                    <span
                      key={`${a}-${i}`}
                      className="px-3 py-1 rounded-full border border-[#c5a572]/40 text-[#e6dccb] text-sm bg-[#1f1c17]/60"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {(topNotes.length || heartNotes.length || baseNotes.length) > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topNotes.length > 0 && (
                  <div>
                    <h4 className="text-[#c5a572] font-medium mb-1">Top</h4>
                    <ul className="text-[#e6dccb]/90 text-sm space-y-1">
                      {topNotes.map((n, i) => (
                        <li key={`top-${i}`}>• {n}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {heartNotes.length > 0 && (
                  <div>
                    <h4 className="text-[#c5a572] font-medium mb-1">Heart</h4>
                    <ul className="text-[#e6dccb]/90 text-sm space-y-1">
                      {heartNotes.map((n, i) => (
                        <li key={`heart-${i}`}>• {n}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {baseNotes.length > 0 && (
                  <div>
                    <h4 className="text-[#c5a572] font-medium mb-1">Base</h4>
                    <ul className="text-[#e6dccb]/90 text-sm space-y-1">
                      {baseNotes.map((n, i) => (
                        <li key={`base-${i}`}>• {n}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {product.buy_url && (
                <a
                  href={product.buy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition"
                >
                  Buy Now
                </a>
              )}
              <button
                onClick={handleShare}
                className="px-6 py-3 rounded-full border border-white/30 text-white/90 hover:bg-white hover:text-black transition"
              >
                Share
              </button>
              <Link
                href="/collections"
                className="px-6 py-3 rounded-full border border-white/30 text-white/90 hover:bg-white hover:text-black transition"
              >
                Back to Collections
              </Link>
            </div>
          </motion.div>
        </section>

        {/* You may also like */}
        {Array.isArray(recs) && recs.filter((r) => r.id !== product.id).length > 0 && (
          <section className="max-w-6xl mx-auto mt-16">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recs
                .filter((r) => r.id !== product.id)
                .slice(0, 6)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="group rounded-xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 shadow-lg hover:shadow-[0_0_20px_rgba(198,165,114,0.35)] transition block"
                  >
                    <div className="relative aspect-square bg-[#1f1c17]">
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-4 py-2 rounded-full border border-white/60 text-white/95 text-sm backdrop-blur-sm">
                          View details
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-[#e6dccb] font-medium truncate">{p.name}</div>
                      {p.price_text && <div className="text-[#c5a572] text-sm mt-1">{p.price_text}</div>}
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Buy bar on mobile */}
      {product.buy_url && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
          <div className="mx-4 mb-4 rounded-full overflow-hidden border border-[#c5a572]/40 shadow-lg">
            <a
              href={product.buy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-3 bg-gradient-to-r from-[#b69363] to-[#c5a572] text-white"
            >
              Buy Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
