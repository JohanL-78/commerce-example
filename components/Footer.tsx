import Link from 'next/link'
import { Facebook, X, Camera, Play, Store, Home, Package, ShoppingCart, Mail, Phone } from 'lucide-react'

const fm = 'font-[family-name:var(--font-mono-pro)]'
const fd = 'font-[family-name:var(--font-display)]'

export default function Footer() {
  return (
    <footer className="bg-[#080C0D] border-t border-[#EEF3EF]/10">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="grid h-9 w-9 place-items-center border border-[#EEF3EF]/16">
                <Store className="w-5 h-5 text-[#97f1dd]" />
              </span>
              <div className="flex flex-col">
                <h3 className={`${fd} text-lg font-semibold tracking-[-0.03em] text-[#EEF3EF]`}>CommerceExample</h3>
                <span className={`${fm} text-[10px] uppercase tracking-[0.18em] text-[#9EA8A5]/70`}>Boutique de confiance</span>
              </div>
            </div>
            <p className="text-[#EEF3EF]/65 leading-relaxed text-sm md:text-base">
              Des produits de qualité avec un service client exceptionnel
            </p>
          </div>

          <div>
            <h3 className={`${fm} text-[11px] font-bold uppercase tracking-[0.22em] text-[#97f1dd] mb-4 md:mb-6`}>
              Liens rapides
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <Link href="/" className="flex items-center gap-2 text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors text-sm md:text-base">
                  <Home className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>Accueil</span>
                    <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60`}>Page principale</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products" className="flex items-center gap-2 text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors text-sm md:text-base">
                  <Package className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>Produits</span>
                    <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60`}>Notre catalogue</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/cart" className="flex items-center gap-2 text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors text-sm md:text-base">
                  <ShoppingCart className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>Panier</span>
                    <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60`}>Vos achats</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`${fm} text-[11px] font-bold uppercase tracking-[0.22em] text-[#97f1dd] mb-4 md:mb-6`}>
              Support
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#97f1dd]" />
                <div className="flex flex-col">
                  <span className="text-[#EEF3EF]/80 text-sm md:text-base">Email</span>
                  <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60`}>support@commerceexample.com</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#97f1dd]" />
                <div className="flex flex-col">
                  <span className="text-[#EEF3EF]/80 text-sm md:text-base">Téléphone</span>
                  <span className={`${fm} text-[9px] uppercase tracking-[0.18em] text-[#9EA8A5]/60`}>+33 1 22 35 67 82</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`${fm} text-[11px] font-bold uppercase tracking-[0.22em] text-[#97f1dd] mb-4 md:mb-6`}>
              Suivez-nous
            </h3>
            <p className="text-[#EEF3EF]/65 mb-6 md:mb-8 text-sm md:text-base">Rejoignez notre communauté</p>
            <div className="flex space-x-4 md:space-x-6">
              <a href="#" className="text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors">
                <X className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors">
                <Camera className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#EEF3EF]/80 hover:text-[#97f1dd] transition-colors">
                <Play className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#EEF3EF]/10 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className={`${fm} text-[10px] uppercase tracking-[0.22em] text-[#9EA8A5]/70`}>
            © 2025 CommerceExample. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
