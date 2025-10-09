import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return false
  }

  // Vérification basée sur le rôle en base de données
  return session.user.role === 'ADMIN'
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error('Accès administrateur requis')
  }
}