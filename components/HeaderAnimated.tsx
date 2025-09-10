'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Store, Package, User, LogOut, LogIn, UserPlus } from 'lucide-react'
import ClientCartIcon from './ClientCartIcon'

export default function HeaderAnimated() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-100 sticky top-0 z-50 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-2 md:py-3">
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:text-zinc-800 transition-colors">
            <Store className="w-6 h-6 md:w-8 md:h-8 text-cyan-900" />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-cyan-900">CommerceExample</h2>
              <span className="text-xs text-slate-500 font-medium hidden md:block">Votre boutique en ligne</span>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-4 md:space-x-8">
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-slate-800 hover:text-cyan-900 transition-colors">
              <Package className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="font-semibold">Produits</span>
                <span className="text-xs text-slate-500 font-normal">Catalogue</span>
              </div>
            </Link>
            
            <ClientCartIcon />
            
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center gap-2">
                  <User className="w-5 h-5 text-slate-600" />
                  <div className="flex flex-col">
                    <span className="text-slate-600 font-medium">Bonjour</span>
                    <span className="text-xs text-slate-500">{session.user?.name || session.user?.email}</span>
                  </div>
                </div>
                <User className="md:hidden w-6 h-6 text-slate-600" />
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 bg-white shadow-lg text-cyan-900 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">Déconnexion</span>
                    
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="hidden sm:flex items-center gap-2 text-slate-800 hover:text-cyan-900 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="font-semibold">Connexion</span>
                    <span className="text-xs text-slate-500 font-normal">Se connecter</span>
                  </div>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-xs md:text-sm hidden sm:block">Inscription</span>
                    <span className="text-xs text-slate-200 font-normal hidden sm:block">Créer un compte</span>
                  </div>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}