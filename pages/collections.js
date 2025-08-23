// pages/collections.js
"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import products from "@/data/products";

export default function Collections() {
  const [query, setQuery] = useState("");

  // Case-insensitive filter by product name
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-16">
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
        Collections
      </h1>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative"
          role="search"
          aria-label="Search products"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search perfumes…"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#2a2723]/90 border border-[#c5a572]/40 text-white placeholder-[#c5a572]/60 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a572]/80" />
        </form>
        {/* Small helper text */}
        <p className="text-center text-sm text-[#d4c7aa]/70 mt-3">
          Showing {filtered.length} {filtered.length === 1 ? "result" : "results"}
          {query ? ` for “${query}”` : ""}.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-[#d4c7aa]/80">
            No products match “{query}”.{" "}
            <button
              onClick={() => setQuery("")}
              className="underline text-[#c5a572] hover:text-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          filtered.map((p, i) => (
            <div
              key={p.id}
              className="rounded-2xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 backdrop-blur-sm shadow-lg transition-all hover:shadow-[0_0_20px_rgba(198,165,114,0.35)]"
            >
              <div className="aspect-square overflow-hidden bg-[#1f1c17] flex items-center justify-center">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-[#e6dccb]">{p.name}</h3>
                <p className="mt-2 text-[#c5a572]">{p.price}</p>
                <Link
                  href={`/product/${p.id}`}
                  className="inline-block mt-4 px-6 py-2 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
