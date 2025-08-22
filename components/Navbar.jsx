import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold tracking-wide" aria-label="Desert Aromas">
          <span className="text-[var(--gold)]">Desert</span> Aromas
        </Link>
        <div className="flex gap-6 text-sm md:text-base">
          <Link href="/collections">Collections</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
