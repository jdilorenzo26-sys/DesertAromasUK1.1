"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="bg-gradient-to-r from-[#1f1c17] to-[#2a2723] text-[#d4c7aa] min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent"
        >
          Our Story
        </motion.h1>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="leading-relaxed opacity-90 space-y-6"
        >
          We’re two lifelong friends brought together by a shared passion for fine fragrances.
          <br /><br />
          For years, we’ve been captivated by the rich and timeless scents of the Middle East —
          but found ourselves frustrated at how difficult and expensive it was to enjoy them here in the UK.
          <br /><br />
          What started as a personal journey has grown into{" "}
          <span className="text-[#c5a572] font-semibold">Desert Aromas</span>: 
          a brand built on the belief that luxury fragrances should be accessible without compromise.
          <br /><br />
          By working closely with trusted distributors across the Middle East and beyond, we bring the latest
          releases and beloved classics to the UK at fair, honest prices.
          <br /><br />
          Our mission is simple: to share the fragrances we love, at the quality you expect, without the inflated costs.
          Whether it’s discovering new launches at the same time as the rest of the world, or enjoying timeless
          scents that never fade, we’re here to make every bottle feel special.
          <br /><br />
          <span className="italic text-[#c5a572]">
            Desert Aromas isn’t just about perfume — it’s about passion, authenticity, and a promise
            to keep the art of fragrance within reach.
          </span>
        </motion.p>
      </div>
    </main>
  )
}
