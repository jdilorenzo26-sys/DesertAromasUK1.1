import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold">Luxury Inspired Perfumes</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-80">Discover timeless Arabic-inspired scents crafted with elegance.</p>
        <div className="mt-8">
          <Link className="btn" href="/collections">Shop Collections</Link>
        </div>
      </section>
    </main>
  )
}
