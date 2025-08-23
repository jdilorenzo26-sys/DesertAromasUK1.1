// pages/collections.js
"use client";
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

export default function Collections() {
  const { data, error, isLoading } = useSWR(
    "/api/products?status=live&sort=created_at&dir=desc&limit=100",
    fetcher
  );
  const products = Array.isArray(data) ? data : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
          Collections
        </h1>

        {isLoading && (
          <p className="text-center text-[#d4c7aa]/80">Loading products…</p>
        )}
        {error && (
          <p className="text-center text-red-300">Failed to load products.</p>
        )}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-center text-[#d4c7aa]/80">
            No products available yet.
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => {
            const badges = buildBadges(p);
            return (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="group rounded-2xl overflow-hidden border border-[#c5a572]/30 bg-[#2a2723]/70 shadow-lg hover:shadow-[0_0_18px_rgba(198,165,114,0.35)] transition block"
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
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 rounded-full border border-white/60 text-white/95 text-sm backdrop-blur-sm">
                      View details
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#e6dccb] truncate">
                    {p.name}
                  </h3>
                  {p.price_text && (
                    <p className="mt-1 text-[#c5a572]">{p.price_text}</p>
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
      </div>
    </main>
  );
}
