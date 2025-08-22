"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
          ? "bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e6dccb] py-2 shadow-md"
          : "bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#f1e8d9] py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg" // <-- add your logo file in /public/logo.png
            alt="Desert Aromas Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span
            className={`tracking-wide font-serif transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            } text-[#c5a572]`}
          >
            Desert Aromas
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center space-x-6 font-medium">
          <Link href="/about" className="hover:text-[#c5a572] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#c5a572] transition-colors">
            Contact
          </Link>
          <Link
            href="/collections"
            className="px-4 py-2 border border-[#c5a572] text-[#c5a572] rounded-xl hover:bg-[#c5a572] hover:text-white transition-all"
          >
            Shop
          </Link>
        </div>
      </div>
    </nav>
  );
}
