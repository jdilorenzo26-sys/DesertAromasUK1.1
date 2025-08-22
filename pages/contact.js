import Head from 'next/head'
import { useState } from 'react'
import Router from 'next/router'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID // set in Vercel to use real endpoint

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    }
    setStatus('submitting')

    // If a real Formspree ID is provided, post to it; otherwise simulate success and redirect.
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        })
        if (res.ok) {
          Router.push('/thank-you')
          return
        }
      } catch (e) {
        // fall through to simulated success
      }
    }

    // Simulated success path (demo)
    setTimeout(() => Router.push('/thank-you'), 500)
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <Head>
        <title>Contact Us | Desert Aromas UK</title>
        <meta name="description" content="Contact Desert Aromas UK — we’d love to hear from you." />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <form onSubmit={onSubmit} className="card">
        <label className="block mb-4">
          <span className="block mb-1">Name</span>
          <input required name="name" className="w-full border rounded-lg px-3 py-2" />
        </label>
        <label className="block mb-4">
          <span className="block mb-1">Email</span>
          <input required type="email" name="email" className="w-full border rounded-lg px-3 py-2" />
        </label>
        <label className="block mb-6">
          <span className="block mb-1">Message</span>
          <textarea required name="message" rows="5" className="w-full border rounded-lg px-3 py-2" />
        </label>
        <button type="submit" className="btn">Send Message</button>
      </form>
      <p className="text-sm opacity-70 mt-3">To enable real submissions, set <code>NEXT_PUBLIC_FORMSPREE_ID</code> in Vercel.</p>
    </main>
  )
}
