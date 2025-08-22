import Head from 'next/head'

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Head>
        <title>Our Story | Desert Aromas UK</title>
        <meta name="description" content="The Desert Aromas story — luxury, Arabic-inspired fragrances curated in the UK." />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Our Story</h1>
      <p className="opacity-80">Desert Aromas is dedicated to curating luxury, Arabic-inspired perfumes with a clean, modern aesthetic.</p>
    </main>
  )
}
