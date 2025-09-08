'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import ClientCartIcon from './ClientCartIcon'

export default function HeaderAnimated() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-100 sticky top-0 z-50 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-2 md:py-3">
          <Link href="/" className="text-xl md:text-2xl font-bold text-cyan-900 hover:text-zinc-800 transition-colors flex items-center gap-2">
            <h2 className="text-2xl">CommerceExample</h2>
          </Link>
          
          <nav className="flex items-center space-x-4 md:space-x-8">
            <Link href="/products" className="hidden sm:block text-slate-800 hover:text-cyan-900 font-semibold transition-colors">
              Produits
            </Link>
            
            <ClientCartIcon />
            
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="hidden md:block text-slate-600 font-medium">Bonjour, {session.user?.name || session.user?.email}</span>
                <span className="md:hidden text-slate-600 font-medium">👋</span>
                <button
                  onClick={() => signOut()}
                  className="bg-white shadow-lg text-cyan-900 hover:bg-yellow-300 hover:text-zinc-800 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="hidden sm:inline text-slate-800 hover:text-cyan-900 font-semibold transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-cyan-600 text-white hover:bg-yellow-300 hover:text-black font-semibold px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm rounded-lg"
                >
                  <span className="hidden sm:inline">Inscription</span>
                  <span className="sm:hidden">✨</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}