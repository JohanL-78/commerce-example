import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    console.log('🚀 API /products appelée')
    console.log('DATABASE_URL présent:', !!process.env.DATABASE_URL)
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    console.log('Paramètres:', { category, featured })

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

    console.log('Tentative de connexion à la DB...')
    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log(`✅ ${products.length} produits récupérés`)

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
    console.error('❌ Erreur détaillée:', error)
    console.error('Type d\'erreur:', error instanceof Error ? error.constructor.name : typeof error)
    if (error instanceof Error) {
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
    }
    
    return Response.json({ 
      error: 'Erreur serveur', 
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      hasDbUrl: !!process.env.DATABASE_URL
    }, { status: 500 })
  }
}