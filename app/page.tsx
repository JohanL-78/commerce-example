import HeaderAnimated from '@/components/HeaderAnimated'
import Footer from '@/components/Footer'
import ProductGridAnimated from '@/components/ProductGridAnimated'
import { prisma } from '@/lib/prisma'

async function getFeaturedProducts() {
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
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAnimated />
      
      <main className="flex-1">
        <section className="bg-sky-900 text-yellow-300  py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue dans notre boutique
            </h1>
            <p className="text-xl text-white md:text-2xl mb-8">
              Découvrez notre sélection de produits de qualité
            </p>
            {/* mettre une border color sur le bouton jaune-300 au hover */}
            <a href="#featured" className="inline-block bg-yellow-200 shadow-lg text-sky-900 hover:bg-yellow-300 hover:text-zinc-800 font-semibold px-8 py-3 rounded-lg border hover:border-color-zinc-800">
              Découvrir nos produits
            </a>
          </div>
        </section>

        <section id="featured" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ProductGridAnimated 
              products={featuredProducts}
              title="Produits vedettes"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
