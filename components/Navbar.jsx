"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
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
          ? "bg-gradient-to-r from-[#1f1c17] to-[#2a2723] backdrop-blur-md border-b border-[#3a352e] py-2 shadow-xl"
          : "bg-gradient-to-r from-[#1f1c17] to-[#2a2723] backdrop-blur-md border-b border-transparent py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo + Brand with tagline */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.JPG"
            alt="Desert Aromas Logo"
            width={48}
            height={48}
            className="rounded-full border border-[#c5a572]/30 shadow-sm"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span
              className={`${playfair.className} tracking-wide transition-all duration-500 ${
                scrolled ? "text-xl" : "text-2xl"
              } bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent`}
            >
              Desert Aromas
            </span>
