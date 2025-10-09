import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function demoteAdmin(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.error(`❌ Utilisateur avec l'email ${email} non trouvé`)
      process.exit(1)
    }

    if (user.role === 'USER') {
      console.log(`✅ L'utilisateur ${email} est déjà un utilisateur standard`)
      process.exit(0)
    }

    await prisma.user.update({
      where: { email },
      data: { role: 'USER' }
    })

    console.log(`✅ L'utilisateur ${email} a été rétrogradé en utilisateur standard`)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

const email = process.argv[2]

if (!email) {
  console.error('Usage: npm run demote-admin <email>')
  process.exit(1)
}

demoteAdmin(email)
