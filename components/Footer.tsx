import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-yellow-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CommerceExample</h3>
            <p className="text-white">
              Votre boutique en ligne de confiance pour tous vos besoins.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white hover:text-white">Accueil</Link></li>
              <li><Link href="/products" className="text-white hover:text-white">Produits</Link></li>
              <li><a href="/cart" className="text-white hover:text-white">Panier</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><span className="text-white">Email: support@commerceexample.com</span></li>
              <li><span className="text-white">Tél: +33 1 22 35 67 82</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <p className="text-white mb-4">Restez connectés sur nos réseaux sociaux</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 CommerceExample. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}