'use client'

import HeaderAnimated from './HeaderAnimated'
import Footer from './Footer'
import AddToCartButton from './AddToCartButton'
import { Euro, Package } from 'lucide-react'

const fd = 'font-[family-name:var(--font-display)]'
const fm = 'font-[family-name:var(--font-mono-pro)]'

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
    <div className="min-h-screen flex flex-col bg-[#0E1314] text-[#EEF3EF]">
      <HeaderAnimated />

      <main className="relative flex-1 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(238,243,239,0)_50%,rgba(238,243,239,0.02)_50%)] bg-[length:100%_3px]" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* image */}
            <div className="relative aspect-square overflow-hidden border border-[#EEF3EF]/12 bg-[#080C0D]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(151,241,221,0.18),transparent_70%)] blur-2xl" />
              </div>
              {product.imageId ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_600,h_600/${product.imageId}`}
                  alt={product.name}
                  className="relative w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className={`${fm} text-xs uppercase tracking-[0.2em] text-[#9EA8A5]/70`}>Pas d&apos;image disponible</span>
                </div>
              )}
              <div className={`${fm} pointer-events-none absolute left-4 top-4 border border-[#EEF3EF]/16 bg-[#080C0D]/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#97f1dd] backdrop-blur-sm`}>
                Produit
              </div>
            </div>

            {/* infos */}
            <div className="flex flex-col gap-8">
              <div>
                <p className={`${fm} mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#97f1dd]/82`}>Fiche détaillée</p>
                <h1 className={`${fd} text-4xl md:text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#EEF3EF]`}>
                  {product.name}
                </h1>
              </div>

              <p className="text-[#EEF3EF]/70 text-base md:text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="grid gap-px bg-[#EEF3EF]/12 sm:grid-cols-2">
                <div className="bg-[#121918] p-5">
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-[#97f1dd]" />
                    <p className={`${fm} text-[10px] uppercase tracking-[0.22em] text-[#9EA8A5]/70`}>Prix TTC</p>
                  </div>
                  <p className={`${fd} mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#EEF3EF]`}>
                    {product.price}€
                  </p>
                </div>
                <div className="bg-[#121918] p-5">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#97f1dd]" />
                    <p className={`${fm} text-[10px] uppercase tracking-[0.22em] text-[#9EA8A5]/70`}>Stock</p>
                  </div>
                  <p className={`${fd} mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#EEF3EF]`}>
                    {product.stock}
                  </p>
                  <p className={`${fm} mt-1 text-[10px] uppercase tracking-[0.18em] text-[#9EA8A5]/60`}>Disponibles</p>
                </div>
              </div>

              <div className="pt-2">
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
