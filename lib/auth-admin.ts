import { getServerSession } from 'next-auth'

const ADMIN_EMAILS = [
  'admin@example.com',
  // Ajoutez ici les emails des administrateurs
]

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return false
  }
  
  // Vérification simple par email pour le moment
  // En production, utilisez un système de rôles dans la base de données
  return ADMIN_EMAILS.includes(session.user.email) || 
         session.user.email.includes('admin')
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error('Accès administrateur requis')
  }
}