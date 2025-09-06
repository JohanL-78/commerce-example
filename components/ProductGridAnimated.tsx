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
      <h2 className="text-3xl font-bold text-center text-sky-900 mb-12">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCardAnimated key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}