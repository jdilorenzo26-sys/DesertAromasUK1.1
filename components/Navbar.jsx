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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F3EFDB]/95 backdrop-blur-md border-b border-[#e6dccb] py-2 shadow-md"
          : "bg-[#F3EFDB]/90 backdrop-blur-md border-b border-[#F3EFDB] py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.JPG"
            alt="Desert Aromas Logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span
            className={`${playfair.className} tracking-wide transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            } text-[#c5a572]`}
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
              className={`px-4 py-2 rounded-xl transition-all border ${
                pathname === link.href
                  ? "bg-[#c5a572] text-white border-[#c5a572]"
                  : "border-[#c5a572] text-[#c5a572] hover:bg-[#c5a572] hover:text-white"
              }`}
            >
              {link.label}
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
        <div className="md:hidden bg-[#F3EFDB] px-6 py-4 space-y-4 border-t border-[#e6dccb]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-xl transition-all border text-center ${
                pathname === link.href
                  ? "bg-[#c5a572] text-white border-[#c5a572]"
                  : "border-[#c5a572] text-[#c5a572] hover:bg-[#c5a572] hover:text-white"
              }`}
              onClick={() => setMenuOpen(false)} // close menu on click
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
