// pages/product/[id].js

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find product by ID
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-[#1f1c17] text-white">
        <div>
          <h1 className="text-3xl font-bold text-[#c5a572] mb-4">
            Product Not Found
          </h1>
          <p className="opacity-80 mb-6">
            Sorry, we couldn’t find the fragrance you’re looking for.
          </p>
          <Link
            href="/collections"
            className="px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="bg-[#1f1c17] rounded-xl overflow-hidden border border-[#c5a572]/30 shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-[#c5a572] mb-4">
            {product.name}
          </h1>
          <p className="text-xl opacity-90 mb-6">{product.price}</p>
          <p className="opacity-80 mb-8">
            {product.description ||
              "Experience the luxurious essence of our Arabian-inspired fragrance, crafted with elegance and sophistication."}
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition-all">
              Add to Cart
            </button>
            <Link
              href="/collections"
              className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition-all"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
