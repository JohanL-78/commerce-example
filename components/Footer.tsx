import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-cyan-600">
      
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <span>CommerceExample</span>
            </h3>
            <p className="text-white leading-relaxed text-sm md:text-base">
              Votre boutique en ligne de confiance
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6">
              Liens rapides
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li><Link href="/" className="text-white hover:text-cyan-900 transition-colors text-sm md:text-base">Accueil</Link></li>
              <li><Link href="/products" className="text-white hover:text-cyan-900 transition-colors text-sm md:text-base">Produits</Link></li>
              <li><Link href="/cart" className="text-white hover:text-cyan-900 transition-colors text-sm md:text-base">Panier</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6">
              Support
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li><span className="text-white text-sm md:text-base">support@commerceexample.com</span></li>
              <li><span className="text-white text-sm md:text-base">+33 1 22 35 67 82</span></li>
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
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Youtube className="w-6 h-6" />
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