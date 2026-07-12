import Link from 'next/link'
import Image from 'next/image'
import HeaderAnimated from '@/components/HeaderAnimated'
import Footer from '@/components/Footer'
import ProductGridAnimated from '@/components/ProductGridAnimated'
import { prisma } from '@/lib/prisma'
import { Store, Users, Package, Headphones, ShoppingBag, ArrowRight } from 'lucide-react'

const fd = 'font-[family-name:var(--font-display)]'
const fm = 'font-[family-name:var(--font-mono-pro)]'

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 4,
      orderBy: { createdAt: 'desc' }
    })

    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      imageId: product.imageId || undefined
    }))
  } catch (error) {
    console.log('Database not available during build')
    return []
  }
}

const observations = [
  { Icon: Users, value: '10K+', label: 'Clients', detail: 'Satisfaits' },
  { Icon: Package, value: '500+', label: 'Produits', detail: 'Catalogue' },
  { Icon: Headphones, value: '24/7', label: 'Support', detail: 'Réactif' },
]

export const dynamic = 'force-dynamic'

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen flex flex-col bg-[#0E1314] text-[#EEF3EF]">
      <HeaderAnimated />

      <main className="flex-1">
        {/* --- HERO --- */}
        <section className="relative min-h-[88vh] w-full overflow-hidden border-b border-[#EEF3EF]/10 bg-[#020303]">
          {/* layered backgrounds — none, base color matches global */}

          {/* product image absolute positioned, large area */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-[65%] lg:block">
            {/* gradient halo behind */}
            <div className="absolute inset-0">
              <div className="absolute left-[45%] top-1/2 h-[90vh] w-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(151,241,221,0.6),rgba(151,241,221,0.3)_38%,transparent_70%)] blur-3xl" />
              <div className="absolute left-[35%] top-[40%] h-[52vh] w-[52vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(183,177,255,0.42),transparent_70%)] blur-3xl" />
              <div className="absolute right-[15%] bottom-[18%] h-[34vh] w-[34vh] rounded-full bg-[radial-gradient(circle,rgba(151,241,221,0.65),transparent_65%)] blur-3xl" />
            </div>
            {/* product image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[92vh] w-[55vw]">
                <Image
                  src="/objectmint.png"
                  alt="Casque audio premium"
                  fill
                  priority
                  className="object-cover drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-7xl items-center px-6 py-20 lg:px-6 lg:py-24">
            {/* --- LEFT : copy --- */}
            <div className="relative flex max-w-2xl flex-col items-start justify-center text-left">
              <div className="flex items-center gap-3">
                <Store className="h-5 w-5 text-[#97f1dd]" />
                <p className={`${fm} text-[11px] font-medium uppercase tracking-[0.3em] text-[#9EA8A5]/78`}>
                  <span className="text-[#c0dad3]">Tech</span> — <span className="text-[#aed4c9]">Audio</span> — <span className="text-[#aed4c9]">Premium</span>
                </p>
              </div>

              <h1 className={`${fd} mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#EEF3EF] sm:text-6xl lg:text-7xl xl:text-[6.5rem]`}>
                Notre <span className="text-[#97f1dd]">boutique</span> 
                <br />
                premium.
              </h1>

              <p className="mt-8 max-w-md text-base leading-relaxed text-[#EEF3EF]/75">
                Une sélection rigoureuse de produits tech, audio et wearables. Rapide, fiable, livraison soignée.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="#featured"
                  className="group relative inline-flex items-center overflow-hidden rounded-full bg-[#97f1dd] px-7 py-3.5 text-sm font-medium text-[#080C0D] transition-colors duration-500"
                >
                  <span className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#EEF3EF] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explorer les produits
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/products"
                  className="group relative inline-flex items-center overflow-hidden rounded-full border border-[#EEF3EF]/20 bg-transparent px-7 py-3.5 text-sm font-medium text-[#EEF3EF] transition-colors duration-500 hover:border-[#EEF3EF] hover:text-[#0E1314]"
                >
                  <span className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#EEF3EF] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                  <span className="relative z-10">Voir le catalogue</span>
                </Link>
              </div>

              {/* stat row */}
              <div className="mt-14 grid w-full max-w-xl grid-cols-3 gap-px bg-[#EEF3EF]/12">
                {observations.map(({ Icon, label, value, detail }) => (
                  <div key={label} className="bg-[#080C0D]/70 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#97f1dd]" />
                      <p className={`${fm} text-[9px] uppercase tracking-[0.22em] text-[#9EA8A5]/70`}>{label}</p>
                    </div>
                    <p className={`${fd} mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#EEF3EF] md:text-3xl`}>{value}</p>
                    <p className={`${fm} mt-1 text-[9px] uppercase tracking-[0.16em] text-[#EEF3EF]/42`}>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURED PRODUCTS --- */}
        <section id="featured" className="relative bg-[#0E1314] py-12 md:py-20 lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(238,243,239,0)_50%,rgba(238,243,239,0.02)_50%)] bg-[length:100%_3px]" />
          <div className="relative max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-[#97f1dd]" />
                <div className="flex flex-col text-left">
                  <h2 className={`${fd} text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-[#EEF3EF] leading-tight`}>
                    Nos produits
                  </h2>
                  <p className={`${fm} text-xs md:text-sm uppercase tracking-[0.2em] text-[#9EA8A5]/70 font-medium mt-2`}>
                    Sélection premium
                  </p>
                </div>
              </div>

              <p className="text-lg md:text-xl text-[#EEF3EF]/70 max-w-2xl mx-auto leading-relaxed">
                Découvrez notre collection soigneusement sélectionnée pour votre satisfaction
              </p>
            </div>

            <ProductGridAnimated
              products={featuredProducts}
              title=""
            />

            <div className="text-center mt-12 md:mt-20">
              <div className="border border-[#EEF3EF]/12 bg-[#121918] p-8 md:p-12 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Package className="w-8 h-8 text-[#97f1dd]" />
                  <div className="flex flex-col text-left">
                    <h3 className={`${fd} text-xl md:text-2xl font-semibold tracking-[-0.04em] text-[#EEF3EF]`}>
                      Découvrez plus de produits
                    </h3>
                    <span className={`${fm} text-[10px] uppercase tracking-[0.2em] text-[#9EA8A5]/70 font-medium`}>Catalogue complet</span>
                  </div>
                </div>
                <p className="text-[#EEF3EF]/65 mb-6 md:mb-8 leading-relaxed">
                  Explorez notre catalogue complet avec plus de 500 produits soigneusement sélectionnés
                </p>
                <Link
                  href="/products"
                  className={`${fm} group inline-flex items-center gap-3 border border-[#97f1dd]/40 bg-[#97f1dd] text-[#080C0D] hover:bg-[#EEF3EF] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors`}
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>Voir tous les produits</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
