const products = [
  { id: 1, name: "Afnan - Turathi Electric Sample", price: "£2.50-£4.00", image: "/products/375x500.108244.2x.png", link: "https://vm.tiktok.com/ZNdXug9Hh/" },
  { id: 2, name: "Khadlaj - Island Vanilla Dunes Sample", price: "£2.50-£4.00", image: "/products/KHAD0002 (2).png", link: "https://vm.tiktok.com/ZNdXuc1tV/" },
  { id: 3, name: "Royal Musk", price: "£29.99", image: "/products/sample3.jpg", link: "https://www.tiktok.com/" },
  { id: 4, name: "Saffron Noir", price: "£44.99", image: "/products/sample4.jpg", link: "https://www.tiktok.com/" },
];

export default function Collections() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
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
