import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSection from '@/components/organisms/HeroSection'
import ProductGrid from '@/components/organisms/ProductGrid'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { productService } from '@/services/api/productService'
import { categoryService } from '@/services/api/categoryService'
import { useCart } from '@/hooks/useCart'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ])
      
      // Get featured products (first 8 for homepage)
      setFeaturedProducts(productsData.slice(0, 8))
      setCategories(categoriesData)
    } catch (err) {
      setError('Errore nel caricamento dei dati')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const brands = [
    { name: 'Bosch', logo: '🔧' },
    { name: 'Makita', logo: '⚡' },
    { name: 'DeWalt', logo: '🔨' },
    { name: 'Stanley', logo: '🛠️' },
    { name: 'Hilti', logo: '⚒️' },
    { name: 'Festool', logo: '🔩' },
  ]

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl text-secondary-900 mb-4">
              ESPLORA LE CATEGORIE
            </h2>
            <p className="text-xl text-secondary-600">
              Trova quello che cerchi nella nostra vasta selezione
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.Id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary to-accent">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-overlay"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl text-white mb-2">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-white/80">
                        <span className="text-sm">Scopri prodotti</span>
                        <ApperIcon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl text-secondary-900 mb-4">
              PRODOTTI IN EVIDENZA
            </h2>
            <p className="text-xl text-secondary-600">
              I migliori utensili selezionati per te
            </p>
          </motion.div>

          <ProductGrid
            products={featuredProducts}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
            onRetry={loadData}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              as={Link}
              to="/category/tutti"
              variant="outline"
              size="large"
              icon="ArrowRight"
            >
              VEDI TUTTI I PRODOTTI
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl text-secondary-900 mb-4">
              MARCHI DI FIDUCIA
            </h2>
            <p className="text-xl text-secondary-600">
              Lavoriamo solo con i migliori brand del settore
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-hover transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">{brand.logo}</div>
                <h3 className="font-display text-lg text-secondary-900">{brand.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Truck', title: 'Spedizione Gratuita', desc: 'Su ordini oltre €50' },
              { icon: 'Shield', title: 'Garanzia 2 Anni', desc: 'Su tutti i prodotti' },
              { icon: 'Headphones', title: 'Supporto 24/7', desc: 'Assistenza sempre disponibile' },
              { icon: 'RefreshCcw', title: 'Reso Facile', desc: 'Entro 30 giorni' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-display text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home