import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { formatPrice } from '@/utils/formatters'

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product)
    toast.success(`${product.name} aggiunto al carrello!`)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card-product group"
    >
      <Link to={`/product/${product.Id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <Badge variant="error" size="small">ESAURITO</Badge>
            )}
            {product.rating >= 4.5 && (
              <Badge variant="accent" size="small">TOP RATED</Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <ApperIcon name="Heart" size={16} className="text-gray-600" />
            </motion.button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <p className="text-sm text-secondary-600 font-medium uppercase tracking-wide">
              {product.brand}
            </p>
          </div>
          
          <h3 className="font-display text-lg text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <ApperIcon name="Star" size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm text-secondary-600">{product.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Package" size={14} className="text-secondary-400" />
              <span className="text-sm text-secondary-600">
                {product.inStock ? 'Disponibile' : 'Esaurito'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full"
          icon="ShoppingCart"
        >
          {product.inStock ? 'AGGIUNGI AL CARRELLO' : 'NON DISPONIBILE'}
        </Button>
      </div>
    </motion.div>
  )
}

export default ProductCard