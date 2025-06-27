import { motion } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onAddToCart, 
  onRetry,
  viewMode = 'grid',
  className = '' 
}) => {
  if (loading) {
    return <Loading type="products" />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        title="Nessun prodotto trovato"
        description="Prova a modificare i filtri di ricerca o esplora le nostre categorie"
        actionText="ESPLORA CATEGORIE"
        icon="Package"
      />
    )
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    : 'space-y-4'

  return (
    <div className={`${gridClasses} ${className}`}>
      {products.map((product, index) => (
        <motion.div
          key={product.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            viewMode={viewMode}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ProductGrid