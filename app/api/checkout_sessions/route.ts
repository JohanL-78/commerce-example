import { getServerSession } from 'next-auth'
import { stripe } from '@/lib/stripe-server'

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

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: {
        product: {
          name: string
          price: number
          imageId?: string
        }
        quantity: number
      }) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.product.name,
            ...(item.product.imageId && {
              images: [`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/${item.product.imageId}`]
            })
          },
          unit_amount: Math.round(item.product.price * 100)
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
      metadata: {
        userEmail: session.user.email
      }
    })

    return Response.json({ sessionId: stripeSession.id })

  } catch (error) {
    console.error('Erreur création session Stripe:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}