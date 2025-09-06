import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export default async function AdminPage() {
  const session = await getServerSession()
  
  // Pour le moment, vérification simple par email
  // À améliorer avec un système de rôles plus robuste
  if (!session?.user?.email || !session.user.email.includes('admin')) {
    redirect('/auth/signin')
  }

  return <AdminDashboard />
}