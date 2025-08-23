// pages/index.js
"use client";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  // Featured + New Arrivals from API
  const { data: featured, error: featErr, isLoading: featLoading } = useSWR(
    "/api/products?status=live&category=featured&limit=6&sort=created_at&dir=desc",
    fetcher
  );
  const { data: arrivals, error: arrErr, isLoading: arrLoading } = useSWR(
    "/api/products?status=live&category=new&limit=12&sort=created_at&dir=desc",
    fetcher
  );

  const feat = Array.isArray(featured) ? featured : [];
  const newArr = Array.isArray(arrivals) ? arrivals : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {/* Cinematic slow zoom background */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero_banner.png"
            alt="Luxury Perfume Collection"
            fill
            priority
            className="object-cover brightness-50"
          />
        </motion.div>

        {/* Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 px-6 max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent drop-shadow-lg"
          >
            Luxury Arabian Inspired Perfumes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-lg opacity-90 mb-8"
          >
            Discover timeless, elegant fragrances crafted for those who seek sophistication.
            Bringing the rich scents of the Middle East to the UK.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            <Link
              href="/collections"
              className="inline-block px-8 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all shadow-lg hover:shadow-[0_0_20px_rgba(198,165,114,0.6)]"
            >
              Explore Collections
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured (from DB) */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between gap-4 mb-12">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
            Featured Fragrances
          </h2>
          <Link
            href="/search?category=featured&sort=created_at&dir=desc"
            className="text-sm px-4 py-2 rounded-full border border-[#c5a572]/70 text-[#c5a572] hover:bg-[#c5a572] hover:text-black transition"
            aria-label="See all featured products"
          >
            See all Featured →
          </Link>
        </div>

        {featLoading && (
          <p className="text-center text-[#d4c7aa]/80">Loading featured…</p>
        )}
        {featErr && (
          <p className="text-center text-red-300">Failed to load featured.</p>
        )}
        {!featLoading && !featErr && feat.length === 0 && (
          <p className="text-center text-[#d4c7aa]/80">No featured products yet.</p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {feat.map((p, i) => (
            <motion.div
              key={p.id}
              className="group rounded-xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 backdrop-blur-sm shadow-lg hover:shadow-[0_0_20px_rgba(198,165,114,0.35)] transition-all"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/product/${p.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-[#1f1c17]">
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 rounded-full border border-white/60 text-white/95 text-sm backdrop-blur-sm">
                      View details
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-[#c5a572] truncate">
                    {p.name}
                  </h3>
                  {p.price_text && <p className="mt-1 opacity-80">{p.price_text}</p>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals Carousel (from DB) */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between gap-4 mb-12">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
            New Arrivals
          </h2>
          <Link
            href="/search?category=new&sort=created_at&dir=desc"
            className="text-sm px-4 py-2 rounded-full border border-[#c5a572]/70 text-[#c5a572] hover:bg-[#c5a572] hover:text-black transition"
            aria-label="See all new arrivals"
          >
            See all New Arrivals →
          </Link>
        </div>

        {arrLoading && (
          <p className="text-center text-[#d4c7aa]/80">Loading new arrivals…</p>
        )}
        {arrErr && (
          <p className="text-center text-red-300">Failed to load new arrivals.</p>
        )}
        {!arrLoading && !arrErr && newArr.length === 0 && (
          <p className="text-center text-[#d4c7aa]/80">No new arrivals yet.</p>
        )}

        {newArr.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
              {newArr.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="group min-w-[250px] sm:min-w-[300px] rounded-xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 backdrop-blur-sm shadow-md hover:shadow-[0_0_15px_rgba(198,165,114,0.4)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <Link href={`/product/${p.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-[#1f1c17]">
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 70vw, 300px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-4 py-2 rounded-full border border-white/60 text-white/95 text-sm backdrop-blur-sm">
                          View details
                        </span>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-[#c5a572] truncate">
                        {p.name}
                      </h3>
                      {p.price_text && <p className="mt-1 opacity-80">{p.price_text}</p>}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* Call to Action */}
      <section className="relative text-center px-6 py-24 bg-gradient-to-r from-[#2a2723] to-[#1f1c17] border-t border-[#3a352e]">
        <div className="absolute inset-0 bg-gradient-radial from-[#c5a572]/10 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.h2
            animate={{ textShadow: ["0 0 10px #c5a572", "0 0 20px #b69363", "0 0 10px #c5a572"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl font-semibold mb-6"
          >
            Elevate Your Scent Experience
          </motion.h2>
          <p className="opacity-80 max-w-2xl mx-auto mb-10">
            At Desert Aromas, we believe luxury fragrances should be accessible
            without compromise. Explore our curated collection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all hover:shadow-[0_0_18px_rgba(198,165,114,0.5)]"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition-all"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
