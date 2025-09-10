'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Home, ShoppingBag, User } from 'lucide-react'

export default function AdminNavigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/admin" className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-xl font-bold">Admin Dashboard</span>
              <span className="text-xs text-gray-400">Gestion des produits</span>
            </div>
          </Link>
          <Link href="/admin" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <ShoppingBag className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="font-medium">Produits</span>
              <span className="text-xs text-gray-400">Catalogue</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Home className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="font-medium">Retour au site</span>
              <span className="text-xs text-gray-400">Voir le site</span>
            </div>
          </Link>
          
          {session?.user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Connecté</span>
                  <span className="text-xs text-gray-400">{session.user.email}</span>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <div className="flex flex-col">
                  <span className="font-medium">Déconnexion</span>
                  <span className="text-xs text-gray-400">Se déconnecter</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}