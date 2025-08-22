"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/collections", label: "Shop" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F3EFDB]/95 backdrop-blur-md border-b border-[#e6dccb] py-2 shadow-lg"
          : "bg-[#F3EFDB]/90 backdrop-blur-md border-b border-transparent py-4"
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full border transition-all duration-300 relative overflow-hidden group ${
                pathname === link.href
                  ? "bg-gradient-to-r from-[#b69363] to-[#c5a572] text-white border-transparent shadow-md"
                  : "border-[#c5a572]/60 text-[#c5a572] hover:text-white"
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#b69363] to-[#c5a572] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#c5a572]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F3EFDB] px-6 py-4 space-y-4 border-t border-[#e6dccb] animate-fadeIn">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-full border text-center transition-all duration-300 ${
                pathname === link.href
                  ? "bg-gradient-to-r from-[#b69363] to-[#c5a572] text-white border-transparent shadow-md"
                  : "border-[#c5a572]/60 text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
