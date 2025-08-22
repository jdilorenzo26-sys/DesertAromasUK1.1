"use client";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Facebook, Instagram } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1f1c17] via-[#24211c] to-[#2a2723] text-[#c5a572] border-t border-[#3a352e]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <Image
            src="/logo.JPG"
            alt="Desert Aromas Logo"
            width={50}
            height={50}
            className="rounded-full border border-[#c5a572]/30 shadow-sm"
          />
          <h2
            className={`${playfair.className} text-xl bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent`}
          >
            Desert Aromas
          </h2>
          <p className="text-sm text-gray-400 max-w-xs text-center md:text-left">
            Luxury inspired perfumes, crafted with timeless Arabic elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="font-semibold text-lg text-[#c5a572]">Quick Links</h3>
          <Link
            href="/about"
            className="hover:text-white transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/collections"
            className="hover:text-white transition-colors duration-300"
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className="hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="font-semibold text-lg text-[#c5a572]">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-[#c5a572]/40 rounded-full hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-[#c5a572]/40 rounded-full hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all duration-300 group"
            >
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3a352e] text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Desert Aromas. All rights reserved.
      </div>
    </footer>
  );
}
