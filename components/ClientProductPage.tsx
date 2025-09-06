'use client'

import HeaderAnimated from './HeaderAnimated'
import Footer from './Footer'
import AddToCartButton from './AddToCartButton'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageId?: string
  stock: number
}

export default function ClientProductPage({ product }: { product: Product }) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAnimated />
      
      <main className="flex-1 py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-100 rounded-3xl shadow-lg">
              {product.imageId ? (
                <img
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_600,h_600/${product.imageId}`}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Pas d&apos;image disponible
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <p className="text-gray-600 text-lg">{product.description}</p>
              
              <div className="text-3xl font-bold text-blue-600">
                {product.price}€
              </div>
              
              <div className="text-gray-600">
                Stock: {product.stock} disponibles
              </div>
              
              <div className="pt-4">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}