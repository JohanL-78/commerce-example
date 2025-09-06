import HeaderAnimated from '@/components/HeaderAnimated'
import Footer from '@/components/Footer'
import ProductGridAnimated from '@/components/ProductGridAnimated'
import { prisma } from '@/lib/prisma'

async function getProducts(category?: string) {
  const products = await prisma.product.findMany({
    where: category ? { category } : {},
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

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const products = await getProducts(category)

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAnimated />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <ProductGridAnimated 
            products={products}
            title={category ? `Produits - ${category}` : 'Tous nos produits'}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}