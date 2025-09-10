'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { stripePromise } from '@/lib/stripe'
import { CreditCard, LogIn } from 'lucide-react'

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
      className="w-full flex items-center gap-3 justify-center bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 hover:text-white transition-colors"
    >
      {session ? (
        <>
          <CreditCard className="w-5 h-5" />
          <div className="flex flex-col text-left">
            <span className="text-lg font-semibold">Payer maintenant</span>
            <span className="text-xs text-cyan-100 font-normal">Procéder au paiement</span>
          </div>
        </>
      ) : (
        <>
          <LogIn className="w-5 h-5" />
          <div className="flex flex-col text-left">
            <span className="text-lg font-semibold">Se connecter</span>
            <span className="text-xs text-cyan-100 font-normal">Pour continuer</span>
          </div>
        </>
      )}
    </button>
  )
}