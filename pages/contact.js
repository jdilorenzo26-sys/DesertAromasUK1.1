"use client";
import { motion } from "framer-motion";

export default function Contact() {
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
          Get in Touch
        </motion.h1>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="leading-relaxed opacity-90 mb-8"
        >
          We’d love to hear from you. Whether you have a question about our perfumes,
          your order, or just want to connect, feel free to reach out.
        </motion.p>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="space-y-4"
        >
          <p>
            📧 <a href="mailto:info@desertaromas.co.uk" className="text-[#c5a572] hover:underline">
              info@desertaromas.co.uk
            </a>
          </p>
          <p>
            📍 Based in the UK – shipping nationwide
          </p>
        </motion.div>
      </div>
    </main>
  );
}
