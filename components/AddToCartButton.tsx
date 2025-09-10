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
      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm w-full ${
        isAdded 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'hover:bg-cyan-700 bg-cyan-600 hover:text-white text-white'
      }`}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4" />
          <div className="flex flex-col text-left flex-1">
            <span className="font-semibold">Ajouté !</span>
            <span className="text-xs text-green-100 font-normal">Au panier</span>
          </div>
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          <div className="flex flex-col text-left flex-1">
            <span className="font-semibold">Ajouter</span>
            <span className="text-xs text-cyan-100 font-normal">Au panier</span>
          </div>
        </>
      )}
    </button>
  )
}