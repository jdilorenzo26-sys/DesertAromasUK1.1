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
            {[
              { href: "/about", label: "About" },
              { href: "/collections", label: "Shop" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative inline-block hover:scale-105 transition-transform duration-300"
                >
                  <span className="bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-[length:200%_200%] bg-clip-text text-transparent hover:animate-shimmer">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <a
                href="mailto:info@desertaromas.co.uk"
                className="hover:scale-105 transition-transform duration-300 hover:text-white"
              >
                info@desertaromas.co.uk
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            {[
              {
                href: "https://instagram.com/desertaromas",
                label: "Instagram",
                Icon: Instagram,
              },
              {
                href: "https://facebook.com/desertaromas",
                label: "Facebook",
                Icon: Facebook,
              },
              {
                href: "/collections",
                label: "Shop",
                Icon: ShoppingBag,
              },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-white transition-colors transform hover:scale-110 duration-300"
              >
                <Icon size={22} />
              </a>
            ))}
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

/* Extra shimmer animation */
const shimmerStyle = `
@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.hover\\:animate-shimmer:hover {
  animation: shimmer 2s linear infinite;
}
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = shimmerStyle;
  document.head.appendChild(style);
}
