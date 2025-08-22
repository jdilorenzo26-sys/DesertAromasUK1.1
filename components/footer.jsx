"use client";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Instagram, Facebook, Mail, ShoppingBag } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1f1c17] to-[#2a2723] text-[#c5a572] py-10 mt-12 border-t border-[#3a352e]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className={`${playfair.className} text-2xl font-semibold bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent`}>
            Desert Aromas
          </h2>
          <p className="text-sm mt-2 text-[#d4c7aa]/80">
            Luxury Arabian-inspired perfumes. Elegant, timeless fragrances crafted for sophistication.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-white transition-colors">Shop</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <a href="mailto:info@desertaromas.co.uk" className="hover:text-white transition-colors">
                info@desertaromas.co.uk
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://instagram.com/desertaromas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://facebook.com/desertaromas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition-colors"
            >
              <Facebook size={22} />
            </a>
            <a
              href="/collections"
              aria-label="Shop"
              className="hover:text-white transition-colors"
            >
              <ShoppingBag size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-6 border-t border-[#3a352e] text-center text-sm text-[#d4c7aa]/70">
        © {new Date().getFullYear()} Desert Aromas. All rights reserved.
      </div>
    </footer>
  );
}
