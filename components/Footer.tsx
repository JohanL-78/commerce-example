import Link from 'next/link'
import { Facebook, X, Camera, Play, Store, Home, Package, ShoppingCart, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-cyan-600">
      
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Store className="w-6 h-6 text-white" />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white">CommerceExample</h3>
                <span className="text-xs text-cyan-100">Votre boutique en ligne de confiance</span>
              </div>
            </div>
            <p className="text-white leading-relaxed text-sm md:text-base">
              Des produits de qualité avec un service client exceptionnel
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6">
              Liens rapides
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <Link href="/" className="flex items-center gap-2 text-white hover:text-cyan-100 transition-colors text-sm md:text-base">
                  <Home className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>Accueil</span>
                    <span className="text-xs text-cyan-200">Page principale</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products" className="flex items-center gap-2 text-white hover:text-cyan-100 transition-colors text-sm md:text-base">
                  <Package className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>Produits</span>
                    <span className="text-xs text-cyan-200">Notre catalogue</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/cart" className="flex items-center gap-2 text-white hover:text-cyan-100 transition-colors text-sm md:text-base">
                  <ShoppingCart className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>Panier</span>
                    <span className="text-xs text-cyan-200">Vos achats</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6">
              Support
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <div className="flex flex-col">
                  <span className="text-white text-sm md:text-base">Email</span>
                  <span className="text-xs text-cyan-200">support@commerceexample.com</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <div className="flex flex-col">
                  <span className="text-white text-sm md:text-base">Téléphone</span>
                  <span className="text-xs text-cyan-200">+33 1 22 35 67 82</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6">
              Suivez-nous
            </h3>
            <p className="text-white mb-6 md:mb-8 text-sm md:text-base">Rejoignez notre communauté</p>
            <div className="flex space-x-4 md:space-x-6">
              <a href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors">
                <X className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Camera className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Play className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-300 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-white text-sm md:text-base">
            © 2025 CommerceExample. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}