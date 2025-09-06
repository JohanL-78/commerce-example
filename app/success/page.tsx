'use client'

import { useEffect, useState, Suspense } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessPageContent() {
  const clearCart = useCartStore((state) => state.clearCart)
  const cartItems = useCartStore((state) => state.items)
  const searchParams = useSearchParams()
  const [orderCreated, setOrderCreated] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (sessionId && cartItems.length > 0 && !orderCreated) {
      createOrder()
    }
  }, [searchParams, cartItems, orderCreated])

  const createOrder = async () => {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems
        })
      })

      if (response.ok) {
        setOrderCreated(true)
        clearCart()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erreur lors de la création de la commande')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setError('Erreur lors de la création de la commande')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="text-6xl">❌</div>
          <h1 className="text-3xl font-bold text-red-600">Erreur</h1>
          <p className="text-gray-600">{error}</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="text-6xl">✅</div>
        <h1 className="text-3xl font-bold text-green-600">Paiement réussi !</h1>
        <p className="text-gray-600">
          {orderCreated 
            ? "Votre commande a été créée avec succès. Vous recevrez bientôt un email de confirmation."
            : "Création de votre commande en cours..."
          }
        </p>
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
}