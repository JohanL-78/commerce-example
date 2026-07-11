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

    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-500 ${
        isAdded
          ? 'bg-[#97f1dd] text-[#080C0D]'
          : 'bg-[#97f1dd] text-[#080C0D]'
      }`}
    >
      <span className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#EEF3EF] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
      <span className="relative z-10 flex items-center gap-2">
        {isAdded ? (
          <>
            <Check className="w-4 h-4" />
            Ajouté au panier
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Ajouter au panier
          </>
        )}
      </span>
    </button>
  )
}
