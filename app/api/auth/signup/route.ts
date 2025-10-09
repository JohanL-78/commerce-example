import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { validateEmail, validatePassword } from '@/lib/validation'
import { signupRateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    // Rate limiting basé sur l'IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const rateLimitResult = signupRateLimit.check(ip)

    if (!rateLimitResult.success) {
      return Response.json({
        error: 'Trop de tentatives. Veuillez réessayer plus tard.',
        resetTime: new Date(rateLimitResult.reset).toISOString()
      }, { status: 429 })
    }

    const { email, password, name } = await req.json()

    if (!email || !password) {
      return Response.json({ error: 'Email et mot de passe requis' }, { status: 400 })
    }

    // Validation de l'email
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return Response.json({
        error: 'Email invalide',
        details: emailValidation.errors
      }, { status: 400 })
    }

    // Validation du mot de passe
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return Response.json({
        error: 'Mot de passe invalide',
        details: passwordValidation.errors
      }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return Response.json({ error: 'Utilisateur déjà existant' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: 'USER' // Rôle par défaut
      }
    })

    return Response.json({
      message: 'Utilisateur créé avec succès',
      user: { id: user.id, email: user.email, name: user.name }
    }, { status: 201 })

  } catch (error) {
    console.error('Erreur signup:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}