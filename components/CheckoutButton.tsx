'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { stripePromise } from '@/lib/stripe'

export default function CheckoutButton() {
  const { data: session } = useSession()
  const router = useRouter()
  const { items } = useCartStore()

  const handleCheckout = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const { sessionId } = await response.json()

      const stripe = await stripePromise
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error('Erreur Stripe:', error)
        }
      }
    } catch (error) {
      console.error('Erreur checkout:', error)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-cyan-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-300 hover:text-black"
    >
      {session ? 'Payer maintenant' : 'Se connecter pour continuer'}
    </button>
  )
}