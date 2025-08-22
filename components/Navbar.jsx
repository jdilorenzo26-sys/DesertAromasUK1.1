"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 py-2 shadow-md"
          : "bg-white/80 backdrop-blur-md border-b border-gray-200 py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className={`tracking-wide font-bold transition-all duration-300 ${
            scrolled ? "text-xl" : "text-2xl"
          } text-[#f7e7ce]`}
        >
          Desert Aromas
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/about" className="hover:opacity-80">
            About
          </Link>
          <Link href="/contact" className="hover:opacity-80">
            Contact
          </Link>
          <Link href="/collections" className="btn-outline">
            Shop
          </Link>
        </div>
      </div>
    </nav>
  );
}
