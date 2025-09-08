import HeaderAnimated from '@/components/HeaderAnimated'
import Footer from '@/components/Footer'
import ProductGridAnimated from '@/components/ProductGridAnimated'
import { prisma } from '@/lib/prisma'

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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Découvrez notre boutique
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
                Une sélection de produits exceptionnels
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 md:pt-8">
                <a href="#featured" className="inline-block bg-white shadow-lg text-cyan-900 hover:bg-yellow-300 hover:text-zinc-800 font-semibold px-8 py-3 rounded-lg">
                  Explorer les produits
                </a>
                
              </div>
              
              <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-16">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-200 mb-1 md:mb-2">10K+</div>
                  <div className="text-xs md:text-sm text-white">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-200 mb-1 md:mb-2">500+</div>
                  <div className="text-xs md:text-sm text-white">Produits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-violet-200 mb-1 md:mb-2">24/7</div>
                  <div className="text-xs md:text-sm text-white">Support client</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="py-12 md:py-20 lg:py-32">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            
            <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Nos produits 
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Découvrez notre collection soigneusement sélectionnée
              </p>
            </div>

            <ProductGridAnimated 
              products={featuredProducts}
              title=""
            />

            <div className="text-center mt-12 md:mt-20">
              <div className="bg-gray-100 rounded-lg p-8 md:p-12 max-w-2xl mx-auto">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                  Découvrez plus de produits
                </h3>
                <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed">
                  Explorez notre catalogue complet avec plus de 500 produits
                </p>
                <a href="/products" className="inline-block bg-yellow-300 text-sky-900 hover:bg-cyan-600 hover:text-white font-semibold px-8 py-4 rounded-lg">
                  Voir tous les produits
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
