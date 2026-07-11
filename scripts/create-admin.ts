import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin(email: string, password: string, name?: string) {
  try {
    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing) {
      console.error(`❌ Un utilisateur avec l'email ${email} existe déjà`)
      process.exit(1)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name ?? null,
        role: 'ADMIN',
      },
    })

    console.log(`✅ Admin créé : ${user.email} (id: ${user.id})`)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

const [, , email, password, name] = process.argv

if (!email || !password) {
  console.error('Usage: npm run create-admin -- <email> <password> [name]')
  process.exit(1)
}

createAdmin(email, password, name)
