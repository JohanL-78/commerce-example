import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: {
      category?: string
      featured?: boolean
    } = {}

    if (category) {
      where.category = category
    }

    if (featured === 'true') {
      where.featured = true
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      imageId: product.imageId,
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      createdAt: product.createdAt
    }))

    return Response.json(transformedProducts)
  } catch (error) {
    console.error('Erreur API /products:', error)

    return Response.json({
      error: 'Erreur serveur'
    }, { status: 500 })
  }
}