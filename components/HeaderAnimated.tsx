'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import ClientCartIcon from './ClientCartIcon'

export default function HeaderAnimated() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="text-2xl font-bold text-sky-900">
            CommerceExample
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Produits
            </Link>
            
            <ClientCartIcon />
            
            {session ? (
              <div className="flex items-center space-x-4">
                <span>Bonjour, {session.user?.name || session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-900"
                >
                  Inscription
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}