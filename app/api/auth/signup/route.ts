import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password) {
      return Response.json({ error: 'Email et mot de passe requis' }, { status: 400 })
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
        name: name || null
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