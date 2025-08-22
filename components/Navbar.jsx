"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

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
          ? "bg-[#F3EFDB]/95 backdrop-blur-md border-b border-[#e6dccb] py-2 shadow-md"
          : "bg-[#F3EFDB]/90 backdrop-blur-md border-b border-[#F3EFDB] py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.JPG" // <-- add your logo file in /public/logo.png
            alt="Desert Aromas Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span
  className={`${playfair.className} tracking-wide transition-all duration-300 ${
    scrolled ? "text-xl" : "text-2xl"
  } text-[#c5a572]`}
>
  Desert Aromas
</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center space-x-6 font-medium">
          <Link href="/about" className="px-4 py-2 border border-[#c5a572] text-[#c5a572] rounded-xl hover:bg-[#c5a572] hover:text-white transition-all">
            About
          </Link>
          <Link href="/contact" className="px-4 py-2 border border-[#c5a572] text-[#c5a572] rounded-xl hover:bg-[#c5a572] hover:text-white transition-all">
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
