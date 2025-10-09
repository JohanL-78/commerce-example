import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import { authOptions } from '@/lib/auth'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Vérification basée sur le rôle
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  return <AdminDashboard />
}