// pages/search.js
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((r) => r.json());

// Build up to 3 badges from accords -> top -> heart -> base (deduped)
function buildBadges(p) {
  const take = 3;
  const seen = new Set();
  const out = [];

  const pushTokens = (str) => {
    if (!str) return;
    String(str)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((t) => {
        const key = t.toLowerCase();
        if (!seen.has(key) && out.length < take) {
          seen.add(key);
          out.push(t);
        }
      });
  };

  pushTokens(p?.accords);
  pushTokens(p?.top_notes);
  pushTokens(p?.heart_notes);
  pushTokens(p?.base_notes);

  return out;
}

const fetchKey = ({ q, category, sort, dir }) => {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (category) sp.set("category", category);
  sp.set("status", "live");
  sp.set("sort", sort);
  sp.set("dir", dir);
  sp.set("limit", "100");
  return `/api/products?${sp.toString()}`;
};

export default function SearchPage() {
  const router = useRouter();
  const initialQ = typeof router.query.query === "string" ? router.query.query : "";

  const [q, setQ] = useState(initialQ);
  const [debouncedQ, setDebouncedQ] = useState(initialQ);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("created_at");
  const [dir, setDir] = useState("desc");

  useEffect(() => {
    const nextQ = typeof router.query.query === "string" ? router.query.query : "";
    setQ(nextQ);
    setDebouncedQ(nextQ);
  }, [router.query.query]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const apiKey = useMemo(
    () => fetchKey({ q: debouncedQ, category, sort, dir }),
    [debouncedQ, category, sort, dir]
  );

  const { data, error, isLoading } = useSWR(apiKey, fetcher);
  const products = Array.isArray(data) ? data : [];

  function onSubmit(e) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("query", q.trim());
    router.push(`/search?${sp.toString()}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
          Search
        </h1>

        {/* Search bar */}
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="flex gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, accords, notes…"
              className="flex-1 px-4 py-3 rounded-full bg-[#1f1c17] border border-[#c5a572]/40 text-white placeholder-[#c5a572]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a572]"
            />
            <button className="px-5 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-[#c5a572] hover:text-black transition">
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-5xl mx-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white"
          >
            <option value="">All categories</option>
            <option value="new">new</option>
            <option value="featured">featured</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white"
          >
            <option value="created_at">Sort by Created</option>
            <option value="name">Sort by Name</option>
            <option value="price_text">Sort by Price Text</option>
          </select>
          <select
            value={dir}
            onChange={(e) => setDir(e.target.value)}
            className="px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white"
          >
            <option value="desc">↓ Desc</option>
            <option value="asc">↑ Asc</option>
          </select>
          <Link
            href="/collections"
            className="text-center px-3 py-2 rounded-full border border-[#c5a572]/60 text-[#c5a572] hover:bg-[#c5a572] hover:text-black transition"
          >
            Back to Shop
          </Link>
        </div>

        {/* Status line */}
        <div className="mt-4 text-center text-sm text-[#d4c7aa]/80">
          {isLoading
            ? "Searching…"
            : error
            ? "Failed to load results."
            : `${products.length} result${products.length === 1 ? "" : "s"} found`}
        </div>

        {/* Results grid with hover overlay + badges */}
        {!isLoading && !error && products.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => {
              const badges = buildBadges(p);
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group rounded-2xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 shadow-lg hover:shadow-[0_0_16px_rgba(198,165,114,0.35)] transition block"
                  aria-label={`View details for ${p.name}`}
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
                    <div className="text-[#e6dccb] font-medium truncate">
                      {p.name}
                    </div>
                    {p.price_text && (
                      <div className="text-[#c5a572] text-sm mt-1">
                        {p.price_text}
                      </div>
                    )}

                    {/* Badges */}
                    {badges.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {badges.map((b, i) => (
                          <span
                            key={`${b}-${i}`}
                            className="px-2.5 py-1 rounded-full border border-[#c5a572]/40 text-[11px] text-[#e6dccb] bg-[#1f1c17]/60"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* No results helper */}
        {!isLoading && !error && products.length === 0 && (
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <p className="text-[#d4c7aa]/90">
              No products matched{" "}
              <span className="text-white">“{debouncedQ || "your search"}”</span>.
            </p>
            <p className="mt-3 text-sm text-[#d4c7aa]/80">
              Try fewer words, a different category, or browse{" "}
              <Link href="/collections" className="underline hover:opacity-80">
                all products
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
