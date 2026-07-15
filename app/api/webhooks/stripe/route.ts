import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe-server'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('⚠️ STRIPE_WEBHOOK_SECRET non configuré')
    return NextResponse.json(
      { error: 'Webhook non configuré' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('❌ Erreur validation webhook Stripe:', errorMessage)
    return NextResponse.json(
      { error: `Webhook signature invalide: ${errorMessage}` },
      { status: 400 }
    )
  }

  // Gérer les différents événements Stripe
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('✅ Paiement confirmé pour session:', session.id)

        // Récupérer l'email depuis les métadonnées
        const userEmail = session.metadata?.userEmail
        if (!userEmail) {
          console.error('❌ Email utilisateur manquant dans metadata')
          break
        }

        // Trouver l'utilisateur
        const user = await prisma.user.findUnique({
          where: { email: userEmail }
        })

        if (!user) {
          console.error('❌ Utilisateur non trouvé:', userEmail)
          break
        }

        // Créer ou mettre à jour la commande avec le stripeSessionId
        const existingOrder = await prisma.order.findUnique({
          where: { stripeSessionId: session.id }
        })

        if (existingOrder) {
          // Mettre à jour le statut si la commande existe déjà
          await prisma.order.update({
            where: { id: existingOrder.id },
            data: { status: 'PROCESSING' }
          })
          console.log('✅ Commande mise à jour:', existingOrder.id)
        } else {
          console.log('⚠️ Commande non trouvée pour session:', session.id)
        }

        // TODO: Envoyer email de confirmation
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('⏱️ Session expirée:', session.id)

        // Marquer la commande comme expirée
        await prisma.order.updateMany({
          where: {
            stripeSessionId: session.id,
            status: 'PENDING'
          },
          data: { status: 'CANCELLED' }
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('❌ Paiement échoué:', paymentIntent.id)
        // TODO: Notifier l'utilisateur de l'échec du paiement
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        console.log('💰 Remboursement effectué:', charge.id)
        // TODO: Gérer le remboursement (marquer commande comme remboursée)
        break
      }

      default:
        console.log(`ℹ️ Événement non géré: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('❌ Erreur traitement webhook:', error)
    return NextResponse.json(
      { error: 'Erreur interne' },
      { status: 500 }
    )
  }
}
