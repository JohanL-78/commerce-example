import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function makeAdmin(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.error(`❌ Utilisateur avec l'email ${email} non trouvé`)
      process.exit(1)
    }

    if (user.role === 'ADMIN') {
      console.log(`✅ L'utilisateur ${email} est déjà administrateur`)
      process.exit(0)
    }

    await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    })

    console.log(`✅ L'utilisateur ${email} a été promu administrateur`)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Récupérer l'email depuis les arguments
const email = process.argv[2]

if (!email) {
  console.error('Usage: npm run make-admin <email>')
  process.exit(1)
}

makeAdmin(email)
