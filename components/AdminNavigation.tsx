'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Home, ShoppingBag } from 'lucide-react'

export default function AdminNavigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/admin" className="text-xl font-bold">
            Admin Dashboard
          </Link>
          <Link href="/admin" className="flex items-center space-x-1 hover:text-gray-300">
            <ShoppingBag className="w-4 h-4" />
            <span>Produits</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-1 hover:text-gray-300">
            <Home className="w-4 h-4" />
            <span>Retour au site</span>
          </Link>
          
          {session?.user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {session.user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-1 hover:text-gray-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}