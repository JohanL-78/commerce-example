import Link from 'next/link'
import Image from 'next/image'
import { ImageIcon, Euro } from 'lucide-react'
import AddToCartButton from './AddToCartButton'

const fd = 'font-[family-name:var(--font-display)]'
const fm = 'font-[family-name:var(--font-mono-pro)]'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageId?: string
}

export default function ProductCardAnimated({ product }: { product: Product }) {
  return (
    <div className="bg-[#121918] border border-[#EEF3EF]/12 overflow-hidden flex flex-col h-full group hover:border-[#97f1dd]/45 transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-[#080C0D] relative overflow-hidden">
          {product.imageId ? (
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_300,h_300/${product.imageId}`}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#080C0D]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 border border-[#97f1dd]/30 bg-[#97f1dd]/10 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-[#97f1dd]" />
                </div>
                <div className="flex flex-col items-center">
                  <span className={`${fm} text-[10px] uppercase tracking-[0.2em] font-semibold text-[#EEF3EF]/80`}>Pas d&apos;image</span>
                  <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60 mt-1`}>Image manquante</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 md:p-5 flex flex-col flex-1 space-y-3 md:space-y-4">
        <h3 className={`${fd} text-lg md:text-xl font-semibold tracking-[-0.03em] text-[#EEF3EF] leading-tight group-hover:text-[#97f1dd] transition-colors line-clamp-2`}>
          {product.name}
        </h3>

        <p
          className="text-[#EEF3EF]/65 text-xs md:text-sm leading-relaxed overflow-hidden text-ellipsis"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.description}
        </p>

        <div className="flex flex-col gap-2 md:gap-3 mt-auto pt-3 md:pt-4">
          <div className="flex items-center gap-2 border border-[#97f1dd]/30 bg-[#0E1314] px-2 md:px-3 py-1.5 md:py-2 w-fit">
            <Euro className="w-4 h-4 md:w-5 md:h-5 text-[#97f1dd]" />
            <div className="flex flex-col">
              <span className={`${fd} text-lg md:text-xl font-semibold text-[#EEF3EF] leading-none tracking-[-0.03em]`}>
                {product.price}€
              </span>
              <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/70 font-medium mt-1`}>Prix TTC</span>
            </div>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
