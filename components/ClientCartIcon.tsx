'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function ClientCartIcon() {
  const items = useCartStore((state) => state.items)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  )
}