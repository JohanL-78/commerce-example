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
                  <svg className="w-8 h-8 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-cyan-900">Pas d&apos;image</span>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <h3 className="text-xl font-bold text-slate-800 flex-1 leading-tight group-hover:text-cyan-900 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-slate-600 text-sm flex-1 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-col gap-3 mt-auto pt-4">
          <div className="bg-white shadow-lg px-3 py-2 rounded-lg border w-fit">
            <span className="text-xl font-bold text-cyan-900 block leading-none">
              {product.price}€
            </span>
            <span className="text-xs text-slate-600 font-semibold">Prix TTC</span>
          </div>
          <div className="transform hover:scale-105 transition-transform">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}