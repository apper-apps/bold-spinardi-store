import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ProductGrid from '@/components/organisms/ProductGrid'
import { productService } from '@/services/api/productService'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatters'

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    loadProductData()
  }, [productId])

  const loadProductData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const productData = await productService.getById(parseInt(productId))
      setProduct(productData)
      
      // Load related products (same category)
      const allProducts = await productService.getAll()
      const related = allProducts.filter(p => 
        p.category === productData.category && p.Id !== productData.Id
      ).slice(0, 4)
      setRelatedProducts(related)
      
    } catch (err) {
      setError('Prodotto non trovato')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      toast.success(`${quantity} x ${product.name} aggiunto al carrello!`)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return <Loading type="product" />
  }

  if (error || !product) {
    return <Error message={error} onRetry={loadProductData} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ApperIcon name="ChevronRight" size={14} />
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">
              {product.category}
            </Link>
            <ApperIcon name="ChevronRight" size={14} />
            <span className="text-secondary-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="relative">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="error" size="large">NON DISPONIBILE</Badge>
                  </div>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index 
                          ? 'border-primary' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                {product.rating >= 4.5 && (
                  <Badge variant="accent">TOP RATED</Badge>
                )}
              </div>
              <h1 className="font-display text-3xl lg:text-4xl text-secondary-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-secondary-600 ml-2">({product.rating})</span>
                </div>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Package" size={16} className="text-secondary-400" />
                  <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'Disponibile' : 'Esaurito'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-display font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <div className="text-right">
                  <div className="text-sm text-secondary-600">IVA inclusa</div>
                  <div className="text-sm text-green-600">Spedizione gratuita</div>
                </div>
              </div>

              {product.inStock && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-secondary-700 font-medium">Quantità:</label>
                    <div className="flex items-center border-2 border-gray-200 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <ApperIcon name="Minus" size={16} />
                      </button>
                      <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <ApperIcon name="Plus" size={16} />
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full"
                    size="large"
                    icon="ShoppingCart"
                  >
                    AGGIUNGI AL CARRELLO
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-xl text-secondary-900">DESCRIZIONE</h3>
              <p className="text-secondary-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.specifications && (
              <div className="space-y-4">
                <h3 className="font-display text-xl text-secondary-900">SPECIFICHE TECNICHE</h3>
                <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                      <span className="font-medium text-secondary-700">{key}:</span>
                      <span className="text-secondary-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <ApperIcon name="Truck" size={20} className="text-primary" />
                <span className="text-sm text-secondary-700">Spedizione gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" size={20} className="text-primary" />
                <span className="text-sm text-secondary-700">Garanzia 2 anni</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="RefreshCcw" size={20} className="text-primary" />
                <span className="text-sm text-secondary-700">Reso 30 giorni</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="font-display text-3xl text-secondary-900 mb-4">
                PRODOTTI CORRELATI
              </h2>
              <p className="text-secondary-600">
                Altri prodotti della categoria {product.category}
              </p>
            </motion.div>

            <ProductGrid
              products={relatedProducts}
              onAddToCart={(product) => addToCart(product)}
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            />
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetail