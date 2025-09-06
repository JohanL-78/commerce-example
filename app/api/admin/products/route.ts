import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/auth-admin'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    await requireAdmin()

    const { name, description, price, imageId, category, stock, featured } = await req.json()

    if (!name || !price) {
      return Response.json({ error: 'Nom et prix requis' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price,
        imageId: imageId || null,
        category: category || null,
        stock: stock || 0,
        featured: featured || false
      }
    })

    return Response.json(product)

  } catch (error) {
    console.error('Erreur création produit:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}