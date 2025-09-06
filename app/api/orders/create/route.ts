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

    let total = 0
    for (const item of items) {
      total += item.product.price * item.quantity
    }

    const order = await prisma.order.create({
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

    return Response.json({ order }, { status: 201 })

  } catch (error) {
    console.error('Erreur création commande:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}