import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetAdminPassword(email: string, password: string, name?: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        ...(name ? { name } : {}),
      },
      create: {
        email,
        password: hashedPassword,
        name: name ?? null,
        role: 'ADMIN',
      },
    })

    console.log(`✅ Admin prêt : ${user.email} (id: ${user.id})`)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

const [, , email, password, name] = process.argv

if (!email || !password) {
  console.error('Usage: npm run reset-admin-password -- <email> <password> [name]')
  process.exit(1)
}

resetAdminPassword(email, password, name)
