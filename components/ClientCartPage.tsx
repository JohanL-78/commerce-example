'use client'

import { useCartStore } from '@/store/cartStore'
import CheckoutButton from './CheckoutButton'
import HeaderAnimated from './HeaderAnimated'
import Footer from './Footer'

export default function ClientCartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeaderAnimated />
        <main className="flex-1 py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Votre panier</h1>
            <p className="text-gray-600">Votre panier est vide</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAnimated />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Votre panier</h1>
          
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded">
                  {item.product.imageId ? (
                    <img
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_80,h_80/${item.product.imageId}`}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                      Pas d&apos;image
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">{item.product.price}€</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-800 w-8 h-8 rounded flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-800 w-8 h-8 rounded flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Total:</span>
              <span>{getTotalPrice()}€</span>
            </div>
            <CheckoutButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}