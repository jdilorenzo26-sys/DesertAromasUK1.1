import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Afnan - Turathi Electric Sample", price: "£2.50-£4.00", image: "/products/375x500.108244.2x.png", link: "https://vm.tiktok.com/ZNdXug9Hh/" },
  { id: 2, name: "Khadlaj - Island Vanilla Dunes Sample", price: "£2.50-£4.00", image: "/products/KHAD0002 (2).png", link: "https://vm.tiktok.com/ZNdXuc1tV/" },
  { id: 3, name: "Royal Musk", price: "£29.99", image: "/products/sample3.jpg", link: "https://www.tiktok.com/" },
  { id: 4, name: "Saffron Noir", price: "£44.99", image: "/products/sample4.jpg", link: "https://www.tiktok.com/" },
];

export default function Collections() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Collections
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        className="text-center max-w-2xl mx-auto mb-12 text-[#e6dccb]/80 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Explore our hand-picked range of Arabian-inspired fragrances — from 
        timeless classics to exciting new releases. Each scent is chosen for 
        its elegance, quality, and ability to transport you into a world of 
        luxury.
      </motion.p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            className="rounded-2xl bg-gradient-to-b from-[#1f1c17] to-[#2a2723] border border-[#c5a572]/30 shadow-lg overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            whileHover={{
              scale: 1.02,
              boxShadow: [
                "0 0 20px 4px rgba(198,165,114,0.3)",
                "0 0 35px 10px rgba(198,165,114,0.55)",
                "0 0 20px 4px rgba(198,165,114,0.3)",
              ],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {/* Product Image */}
            <div className="aspect-square overflow-hidden">
              <motion.img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>

            {/* Product Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-[#e6dccb]">{p.name}</h3>
              <p className="mt-2 text-[#c5a572] text-lg">{p.price}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 rounded-full text-white font-medium bg-gradient-to-r from-[#b69363] to-[#c5a572] hover:opacity-90 transition-all shadow-md"
              >
                Buy on TikTok
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
