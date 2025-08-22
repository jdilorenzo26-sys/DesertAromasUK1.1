import Link from 'next/link'

export default function ThankYou() {
  return (
    <main className="text-center px-6 py-20">
      <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
      <p className="opacity-80">We’ve received your message and will get back to you soon.</p>
      <div className="mt-8">
        <Link className="btn" href="/">Back to Home</Link>
      </div>
    </main>
  )
}
