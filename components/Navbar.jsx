"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { Menu, X, Search } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [openSuggest, setOpenSuggest] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Debounced fetch for suggestions
  useEffect(() => {
    const t = setTimeout(async () => {
      const term = q.trim();
      if (!term) { setResults([]); return; }
      try {
        setLoading(true);
        const r = await fetch(`/api/products?q=${encodeURIComponent(term)}&limit=6&status=live`);
        const j = await r.json();
        setResults(Array.isArray(j) ? j : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  const goSearch = (e) => {
    e?.preventDefault?.();
    const term = q.trim();
    if (!term) return;
    setOpenSuggest(false);
    setMenuOpen(false);
    router.push(`/search?query=${encodeURIComponent(term)}`);
  };

  const links = useMemo(() => ([
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/collections", label: "Shop" },
  ]), []);

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-[#1f1c17] to-[#2a2723] backdrop-blur-md border-b border-[#3a352e] py-2 shadow-xl"
          : "bg-gradient-to-r from-[#1f1c17] to-[#2a2723] backdrop-blur-md border-b border-transparent py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.JPG"
            alt="Desert Aromas Logo"
            width={44}
            height={44}
            className="rounded-full border border-[#c5a572]/30 shadow-sm"
            priority
          />
          <span
            className={`${playfair.className} tracking-wide transition-all duration-500 ${
              scrolled ? "text-xl" : "text-2xl"
            } bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent`}
          >
            Desert Aromas
          </span>
        </Link>

        {/* Desktop: links + search */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-full border transition-all duration-300 relative overflow-hidden group ${
                pathname === l.href
                  ? "bg-gradient-to-r from-[#b69363] to-[#c5a572] text-white border-transparent shadow-md"
                  : "border-[#c5a572]/60 text-[#c5a572] hover:text-white"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#b69363] to-[#c5a572] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">{l.label}</span>
            </Link>
          ))}

          {/* Search */}
          <div className="relative">
            <form onSubmit={goSearch} className="flex items-center">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setOpenSuggest(true); }}
                onFocus={() => setOpenSuggest(true)}
                onBlur={() => setTimeout(() => setOpenSuggest(false), 150)} // allow click
                placeholder="Search fragrances…"
                className="w-56 px-4 py-2 rounded-full bg-[#1f1c17] border border-[#c5a572]/40 text-white placeholder-[#c5a572]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a572]"
              />
              <button className="ml-2 p-2 rounded-full border border-[#c5a572]/60 text-[#c5a572] hover:bg-[#c5a572] hover:text-black transition" aria-label="Search">
                <Search size={18} />
              </button>
            </form>

            {/* Suggestions */}
            {openSuggest && (q.trim() || loading) && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto rounded-xl bg-[#2a2723] border border-[#c5a572]/30 shadow-xl">
                {loading && (
                  <div className="px-4 py-3 text-sm text-[#d4c7aa]/80">Searching…</div>
                )}
                {!loading && results.length === 0 && (
                  <div className="px-4 py-3 text-sm text-[#d4c7aa]/80">
                    No matches for “{q.trim()}”
                  </div>
                )}
                {!loading && results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition"
                    onMouseDown={(e) => e.preventDefault()} // keep focus for click
                  >
                    <div className="w-10 h-10 rounded overflow-hidden bg-[#1f1c17] border border-[#c5a572]/30 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-white truncate">{p.name}</div>
                      <div className="text-xs text-[#c5a572] truncate">
                        {p.price_text || ""}
                      </div>
                      {p.accords && (
                        <div className="text-[11px] text-[#d4c7aa]/70 truncate">
                          {p.accords}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
                {!loading && (
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={goSearch}
                    className="w-full text-left px-4 py-2 text-sm text-[#c5a572] hover:bg-white/5"
                  >
                    See all results for “{q.trim()}”
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#c5a572]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu including search */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#3a352e] px-6 py-4 space-y-4 bg-gradient-to-r from-[#1f1c17] to-[#2a2723]">
          {/* Search */}
          <form onSubmit={goSearch} className="flex items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search fragrances…"
              className="flex-1 px-4 py-2 rounded-full bg-[#1f1c17] border border-[#c5a572]/40 text-white placeholder-[#c5a572]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a572]"
            />
            <button className="ml-2 p-2 rounded-full border border-[#c5a572]/60 text-[#c5a572] hover:bg-[#c5a572] hover:text-black transition">
              <Search size={18} />
            </button>
          </form>

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-full border text-center transition ${
                pathname === l.href
                  ? "bg-gradient-to-r from-[#b69363] to-[#c5a572] text-white border-transparent shadow-md"
                  : "border-[#c5a572]/60 text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
