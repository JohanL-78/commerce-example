import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/auth-admin'

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await requireAdmin()

    const { name, description, price, imageId, category, stock, featured } = await req.json()

    if (!name || !price) {
      return Response.json({ error: 'Nom et prix requis' }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id },
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
    console.error('Erreur mise à jour produit:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await requireAdmin()

    await prisma.product.delete({
      where: { id }
    })

    return Response.json({ message: 'Produit supprimé' })

  } catch (error) {
    console.error('Erreur suppression produit:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}