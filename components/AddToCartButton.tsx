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
      className={`px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm w-full ${
        isAdded 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'hover:bg-red-500 bg-cyan-600 hover:text-white text-white'
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