import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Afnan - Turathi Electric Sample", price: "£2.50-£4.00", image: "/products/375x500.108244.2x.png", link: "https://vm.tiktok.com/ZNdXug9Hh/" },
  { id: 2, name: "Khadlaj - Island Vanilla Dunes Sample", price: "£2.50-£4.00", image: "/products/KHAD0002 (2).png", link: "https://vm.tiktok.com/ZNdXuc1tV/" },
  { id: 3, name: "Royal Musk", price: "£29.99", image: "/products/sample3.jpg", link: "https://www.tiktok.com/" },
  { id: 4, name: "Saffron Noir", price: "£44.99", image: "/products/sample4.jpg", link: "https://www.tiktok.com/" },
];

export default function Collections() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
        Collections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((p) => (
          <motion.div
            key={p.id}
            className="rounded-xl overflow-hidden border border-[#c5a572]/40 bg-[#2a2723]/70 shadow-lg hover:shadow-[#c5a572]/20 transition-all"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square flex items-center justify-center overflow-hidden bg-[#1f1c17]">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-[#c5a572]">{p.name}</h3>
              <p className="mt-1 opacity-80">{p.price}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-2 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all"
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
