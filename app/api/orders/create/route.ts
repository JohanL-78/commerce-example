import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return Response.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { items } = await req.json()

    if (!items || items.length === 0) {
      return Response.json({ error: 'Panier vide' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return Response.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Vérifier le stock disponible pour chaque produit
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.product.id },
        select: { stock: true, name: true }
      })

      if (!product) {
        return Response.json({
          error: `Produit ${item.product.name || 'inconnu'} non trouvé`
        }, { status: 404 })
      }

      if (product.stock < item.quantity) {
        return Response.json({
          error: `Stock insuffisant pour ${product.name}. Disponible: ${product.stock}, demandé: ${item.quantity}`
        }, { status: 400 })
      }
    }

    // Calculer le total
    let total = 0
    for (const item of items) {
      total += item.product.price * item.quantity
    }

    // Créer la commande et décrémenter le stock dans une transaction
    const order = await prisma.$transaction(async (tx) => {
      // Créer la commande
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          total,
          status: 'PENDING',
          orderItems: {
            create: items.map((item: {
              product: {
                id: string
                price: number
              }
              quantity: number
            }) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        },
        include: {
          orderItems: {
            include: {
              product: true
            }
          }
        }
      })

      // Décrémenter le stock pour chaque produit
      for (const item of items) {
        await tx.product.update({
          where: { id: item.product.id },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      return newOrder
    })

    return Response.json({ order }, { status: 201 })

  } catch (error) {
    console.error('Erreur création commande:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}