import Head from 'next/head'
import Link from 'next/link'

const products = [
  { id: 1, name: "Oud Majestic", price: "£39.99", image: "/products/sample1.jpg", link: "https://www.tiktok.com/" },
  { id: 2, name: "Amber Serenity", price: "£34.99", image: "/products/sample2.jpg", link: "https://www.tiktok.com/" },
  { id: 3, name: "Royal Musk", price: "£29.99", image: "/products/sample3.jpg", link: "https://www.tiktok.com/" },
  { id: 4, name: "Saffron Noir", price: "£44.99", image: "/products/sample4.jpg", link: "https://www.tiktok.com/" },
];

export default function Collections() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Head>
        <title>Explore Our Perfume Collections | Desert Aromas UK</title>
        <meta name="description" content="Browse luxury Arabic-inspired fragrances from Desert Aromas UK." />
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-center">Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="card">
            <div className="aspect-square bg-[#F3EFE6] flex items-center justify-center overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="pt-4 text-center">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 opacity-80">{p.price}</p>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn mt-3">Buy on TikTok</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
