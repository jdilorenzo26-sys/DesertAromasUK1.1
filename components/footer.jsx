"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, ArrowUp } from "lucide-react";

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
          {[Facebook, Instagram].map((Icon, i) => (
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

          {/* TikTok with SVG + pulse */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-2 rounded-full border border-[#c5a572]/40 hover:border-[#c5a572] transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,165,114,0.7)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-5 h-5 text-white animate-pulse relative z-10"
              fill="currentColor"
            >
              <path d="M448,209.9v102.4c-40.3,0-79.3-12.9-111.2-36.1v99.3c0,75.2-60.9,136.1-136.1,136.1S64.6,450.7,64.6,375.5c0-72.1,55.4-131,126.2-135.8v102.5c-13.6,4.3-23.5,17.2-23.5,32.3c0,18.8,15.2,34,34,34c18.8,0,34-15.2,34-34V128.1h95.5c8.8,48.8,47.6,88,96.2,96.2C436.2,226.1,448,218.9,448,209.9z"/>
            </svg>
            <span className="absolute inset-0 rounded-full animate-ping bg-[#c5a572]/30"></span>
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-[#d4c7aa]/70">
        © {new Date().getFullYear()} Desert Aromas. All rights reserved.
      </div>

      {/* Scroll to top button */}
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
