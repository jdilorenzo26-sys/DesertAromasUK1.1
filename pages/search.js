search.js

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products"; // ✅ import shared data

export default function SearchPage() {
  const router = useRouter();
  const { query } = router.query;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes((query || "").toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
          Search Results for "{query}"
        </h1>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="rounded-xl overflow-hidden border border-[#c5a572]/40 bg-[#2a2723]/70 shadow-lg hover:shadow-[#c5a572]/20 transition-all"
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
                  <h3 className="text-lg font-semibold text-[#c5a572]">{p.name}</h3>
                  <p className="mt-1 opacity-80">{p.price}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#d4c7aa]/80 mt-12">
            No products found matching "{query}".
          </p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-block px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
