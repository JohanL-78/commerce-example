'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart, Check } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  imageId?: string
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, 1)
    setIsAdded(true)
    
    // Reset après 2 secondes
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
        isAdded 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'hover:bg-sky-900 bg-yellow-300 hover:text-yellow-200 text-sky-900'
      }`}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4" />
          Ajouté !
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Ajouter
        </>
      )}
    </button>
  )
}