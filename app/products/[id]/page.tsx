import { prisma } from '@/lib/prisma'
import ClientProductPage from '@/components/ClientProductPage'

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id }
  })

  if (!product) return null

  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: Number(product.price),
    imageId: product.imageId || undefined,
    stock: product.stock
  }
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return <div>Produit non trouvé</div>
  }

  return <ClientProductPage product={product} />
}