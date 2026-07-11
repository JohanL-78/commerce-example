'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Store, Package, User, LogOut, LogIn, UserPlus } from 'lucide-react'
import ClientCartIcon from './ClientCartIcon'

const fm = 'font-[family-name:var(--font-mono-pro)]'
const fd = 'font-[family-name:var(--font-display)]'

export default function HeaderAnimated() {
  const { data: session } = useSession()

  return (
    <header className="bg-[#0E1314]/88 backdrop-blur-md sticky top-0 z-50 border-b border-[#EEF3EF]/10">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[4px] border border-[#EEF3EF]/16 transition-colors group-hover:border-[#97f1dd]/60">
              <Store className="w-5 h-5 text-[#97f1dd]" />
            </span>
            <div className="flex flex-col">
              <h2 className={`${fd} text-lg md:text-xl font-semibold tracking-[-0.03em] text-[#EEF3EF]`}>CommerceExample</h2>
              <span className={`${fm} text-[10px] uppercase tracking-[0.18em] text-[#9EA8A5]/70 font-medium hidden md:block`}>Boutique en ligne</span>
            </div>
          </Link>

          <nav className="flex items-center space-x-4 md:space-x-8">
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors">
              <Package className="w-5 h-5" />
              <div className="flex flex-col">
                <span className={`${fm} text-xs font-semibold uppercase tracking-[0.16em]`}>Produits</span>
                <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60 font-normal`}>Catalogue</span>
              </div>
            </Link>

            <ClientCartIcon />

            {session ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center gap-2">
                  <User className="w-5 h-5 text-[#9EA8A5]" />
                  <div className="flex flex-col">
                    <span className={`${fm} text-xs uppercase tracking-[0.14em] text-[#EEF3EF]/80 font-medium`}>Bonjour</span>
                    <span className={`${fm} text-[9px] uppercase tracking-[0.16em] text-[#9EA8A5]/60`}>{session.user?.name || session.user?.email}</span>
                  </div>
                </div>
                <User className="md:hidden w-6 h-6 text-[#9EA8A5]" />
                <button
                  onClick={() => signOut()}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#EEF3EF]/20 bg-transparent px-5 py-2 text-sm font-medium text-[#EEF3EF] transition-colors duration-500 hover:border-[#EEF3EF] hover:text-[#0E1314]"
                >
                  <span className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#EEF3EF] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                  <span className="relative z-10 flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="hidden sm:flex items-center gap-2 text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className={`${fm} text-xs font-semibold uppercase tracking-[0.16em]`}>Connexion</span>
                    <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60 font-normal`}>Se connecter</span>
                  </div>
                </Link>
                <Link
                  href="/auth/signup"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#97f1dd] px-5 py-2 text-sm font-medium text-[#080C0D] transition-colors duration-500"
                >
                  <span className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#EEF3EF] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                  <span className="relative z-10 flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Inscription</span>
                  </span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
