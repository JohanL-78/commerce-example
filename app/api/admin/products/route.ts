import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/auth-admin'
import { validatePrice } from '@/lib/validation'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    await requireAdmin()

    const { name, description, price, imageId, category, stock, featured } = await req.json()

    if (!name || typeof name !== 'string' || !name.trim()) {
      return Response.json({ error: 'Le nom du produit est requis' }, { status: 400 })
    }

    const priceValidation = validatePrice(price)
    if (!priceValidation.valid || priceValidation.value === undefined) {
      return Response.json({ error: priceValidation.errors.join(', ') }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description || null,
        price: priceValidation.value,
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
