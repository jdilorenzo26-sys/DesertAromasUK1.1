"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, ArrowUp } from "lucide-react";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-r from-[#1f1c17] to-[#2a2723] border-t border-[#3a352e] text-[#c5a572] py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold tracking-wide">Desert Aromas</h2>
          <p className="text-sm text-[#d4c7aa]/80">Luxury Arabian Perfumes</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-white transition-colors duration-300 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a572] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-300 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a572] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/collections" className="hover:text-white transition-colors duration-300 relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a572] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Socials */}
        <div className="flex space-x-5">
          {[Facebook, Instagram, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#c5a572]/40 hover:border-[#c5a572] transition-all duration-300 hover:shadow-[0_0_12px_rgba(197,165,114,0.6)]"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-[#d4c7aa]/70">
        © {new Date().getFullYear()} Desert Aromas. All rights reserved.
      </div>

      {/* Scroll to top button with fade */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-[#b69363] to-[#c5a572] text-white shadow-lg hover:shadow-[0_0_15px_rgba(197,165,114,0.7)] transition-all duration-700 transform ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
