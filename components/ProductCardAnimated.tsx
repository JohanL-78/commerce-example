import Link from 'next/link'
import Image from 'next/image'
import { ImageIcon, Euro } from 'lucide-react'
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
    <div className="bg-gray-100 border border-slate-200 rounded-lg shadow-lg overflow-hidden flex flex-col h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-white relative overflow-hidden">
          {product.imageId ? (
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_300,h_300/${product.imageId}`}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cyan-900 bg-white">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-yellow-300 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-zinc-800" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold text-cyan-900">Pas d&apos;image</span>
                  <span className="text-xs text-slate-500">Image manquante</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-3 md:p-5 flex flex-col flex-1 space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight group-hover:text-cyan-900 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed overflow-hidden text-ellipsis" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </p>
        
        <div className="flex flex-col gap-2 md:gap-3 mt-auto pt-3 md:pt-4">
          <div className="flex items-center gap-2 bg-white shadow-lg px-2 md:px-3 py-1.5 md:py-2 rounded-lg border w-fit">
            <Euro className="w-4 h-4 md:w-5 md:h-5 text-cyan-900" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-cyan-900 leading-none">
                {product.price}€
              </span>
              <span className="text-xs text-slate-600 font-semibold">Prix TTC</span>
            </div>
          </div>
          <div className="transform hover:scale-105 transition-transform">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}