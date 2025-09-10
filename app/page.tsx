import Link from 'next/link'
import HeaderAnimated from '@/components/HeaderAnimated'
import Footer from '@/components/Footer'
import ProductGridAnimated from '@/components/ProductGridAnimated'
import { prisma } from '@/lib/prisma'
import { Store, Users, Package, Headphones, Search, ShoppingBag, ArrowRight } from 'lucide-react'

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 4,
      orderBy: { createdAt: 'desc' }
    })

    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      imageId: product.imageId || undefined
    }))
  } catch (error) {
    console.log('Database not available during build')
    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAnimated />
      
      <main className="flex-1">
        <section className="bg-cyan-600 py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Store className="w-12 h-12 md:w-16 md:h-16 text-white" />
                <div className="flex flex-col text-left">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                    Notre boutique
                  </h1>
                  <p className="text-lg md:text-xl text-cyan-100 font-medium">
                    Découvrez l'excellence
                  </p>
                </div>
              </div>
              
             
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 md:pt-8">
                <Link href="#featured" className="flex items-center gap-3 bg-white shadow-lg text-cyan-900 hover:bg-cyan-800 hover:text-white px-8 py-3 rounded-lg transition-colors">
                  
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">Explorer les produits</span>
                   
                  </div>
                </Link>
                
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-16">
                <div className="flex items-center justify-center gap-3">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-cyan-200" />
                  <div className="flex flex-col text-left">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-200">10K+</div>
                    <div className="text-xs md:text-sm text-white">Clients satisfaits</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Package className="w-8 h-8 md:w-10 md:h-10 text-emerald-200" />
                  <div className="flex flex-col text-left">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-200">500+</div>
                    <div className="text-xs md:text-sm text-white">Produits disponibles</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Headphones className="w-8 h-8 md:w-10 md:h-10 text-violet-200" />
                  <div className="flex flex-col text-left">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-violet-200">24/7</div>
                    <div className="text-xs md:text-sm text-white">Support client</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="py-12 md:py-20 lg:py-32">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            
            <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-slate-800" />
                <div className="flex flex-col text-left">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                    Nos produits 
                  </h2>
                  <p className="text-lg md:text-xl text-slate-500 font-medium">
                    Sélection premium
                  </p>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Découvrez notre collection soigneusement sélectionnée pour votre satisfaction
              </p>
            </div>

            <ProductGridAnimated 
              products={featuredProducts}
              title=""
            />

            <div className="text-center mt-12 md:mt-20">
              <div className="bg-gray-100 rounded-lg p-8 md:p-12 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Package className="w-8 h-8 text-slate-800" />
                  <div className="flex flex-col text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                      Découvrez plus de produits
                    </h3>
                    <span className="text-sm text-slate-500 font-medium">Catalogue complet</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed">
                  Explorez notre catalogue complet avec plus de 500 produits soigneusement sélectionnés
                </p>
                <Link href="/products" className="inline-flex items-center gap-3 bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white px-8 py-4 rounded-lg transition-colors">
                  <ArrowRight className="w-5 h-5" />
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">Voir tous les produits</span>
                    <span className="text-xs text-white hover:text-white">Accéder au catalogue</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
