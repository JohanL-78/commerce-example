import Link from 'next/link'
import Image from 'next/image'
import AddToCartButton from './AddToCartButton'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageId?: string
}

export default function ProductCardAnimated({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-200 relative">
          {product.imageId ? (
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_300,h_300/${product.imageId}`}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Pas d&apos;image
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex-1">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-gray-800">
            {product.price}€
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}