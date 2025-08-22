import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <Image
          src="/hero_banner.png" // 🔥 Replace with your banner image
          alt="Luxury Perfume Collection"
          fill
          priority
          className="object-cover brightness-50"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent drop-shadow-lg">
            Luxury Arabian Inspired Perfumes
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Discover timeless, elegant fragrances crafted for those who seek
            sophistication. Bringing the rich scents of the Middle East to the UK.
          </p>
          <Link
            href="/collections"
            className="inline-block px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all shadow-md"
          >
            Explore Collections
          </Link>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
          Featured Fragrances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[ 
            { id: 1, name: "Royal Musk", price: "£29.99", image: "/products/sample3.jpg" },
            { id: 2, name: "Saffron Noir", price: "£44.99", image: "/products/sample4.jpg" },
            { id: 3, name: "Island Vanilla Dunes", price: "£2.50 - £4.00", image: "/products/KHAD0002 (2).png" },
          ].map((p) => (
            <motion.div
              key={p.id}
              className="rounded-xl overflow-hidden border border-[#c5a572]/40 bg-[#2a2723]/70 shadow-lg hover:shadow-[#c5a572]/20 transition-all"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#c5a572]">
                  {p.name}
                </h3>
                <p className="mt-1 opacity-80">{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center px-6 py-20 bg-gradient-to-r from-[#2a2723] to-[#1f1c17] border-t border-[#3a352e]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-6">
            Elevate Your Scent Experience
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto mb-8">
            At Desert Aromas, we believe luxury fragrances should be accessible
            without compromise. Explore our curated collection today.
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all"
          >
            Learn More
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
