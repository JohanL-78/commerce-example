import ProductCardAnimated from './ProductCardAnimated'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageId?: string
}

interface ProductGridAnimatedProps {
  products: Product[]
  title: string
}

export default function ProductGridAnimated({ products, title }: ProductGridAnimatedProps) {
  return (
    <div>
      {title && (
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
          {title}
        </h2>
      )}
      
      {/* Mobile-first responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-stretch">
        {products.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCardAnimated product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}