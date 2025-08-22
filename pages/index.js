import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero_banner.png"
          alt="Luxury Perfume Collection"
          fill
          priority
          className="object-cover brightness-50"
        />
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
            Discover timeless, elegant fragrances crafted for those who seek
            sophistication. Bringing the rich scents of the Middle East to the UK.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            <Link
              href="/collections"
              className="inline-block px-8 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all shadow-lg"
            >
              Explore Collections
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-12 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
          Featured Fragrances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { id: 1, name: "Royal Musk", price: "£29.99", image: "/products/sample3.jpg" },
            { id: 2, name: "Saffron Noir", price: "£44.99", image: "/products/sample4.jpg" },
            { id: 3, name: "Island Vanilla Dunes", price: "£2.50 - £4.00", image: "/products/KHAD0002 (2).png" },
          ].map((p, i) => (
            <motion.div
              key={p.id}
              className="rounded-xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 backdrop-blur-sm shadow-lg hover:shadow-[#c5a572]/30 transition-all"
              whileHover={{ scale: 1.04 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <div className="aspect-square overflow-hidden bg-[#1f1c17] flex items-center justify-center">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-[#c5a572]">{p.name}</h3>
                <p className="mt-1 opacity-80">{p.price}</p>
                <Link
                  href="/collections"
                  className="inline-block mt-4 px-5 py-2 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all text-sm"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
{/* New Arrivals Carousel */}
<section className="max-w-6xl mx-auto px-6 py-20">
  <h2 className="text-3xl font-semibold text-center mb-12 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
    New Arrivals
  </h2>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative"
  >
    <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
      {[
        { id: 1, name: "Amber Oud Gold", price: "£39.99", image: "/products/sample1.jpg" },
        { id: 2, name: "Desert Rose", price: "£34.99", image: "/products/sample2.jpg" },
        { id: 3, name: "Velour Oud", price: "£54.99", image: "/products/sample3.jpg" },
        { id: 4, name: "Noir Elegance", price: "£44.99", image: "/products/sample4.jpg" },
      ].map((p, i) => (
        <motion.div
          key={p.id}
          className="min-w-[250px] sm:min-w-[300px] rounded-xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 backdrop-blur-sm shadow-md hover:shadow-[#c5a572]/30 transition-all"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
        >
          <div className="aspect-square overflow-hidden bg-[#1f1c17] flex items-center justify-center">
            <Image
              src={p.image}
              alt={p.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-[#c5a572]">{p.name}</h3>
            <p className="mt-1 opacity-80">{p.price}</p>
            <Link
              href="/collections"
              className="inline-block mt-3 px-5 py-2 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all text-sm"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>

      {/* Call to Action */}
      <section className="relative text-center px-6 py-24 bg-gradient-to-r from-[#2a2723] to-[#1f1c17] border-t border-[#3a352e]">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-[#c5a572]/10 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-3xl font-semibold mb-6">
            Elevate Your Scent Experience
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto mb-10">
            At Desert Aromas, we believe luxury fragrances should be accessible
            without compromise. Explore our curated collection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all"
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
