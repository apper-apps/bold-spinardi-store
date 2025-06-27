import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/organisms/ProductGrid'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { productService } from '@/services/api/productService'
import { useCart } from '@/hooks/useCart'

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const { addToCart } = useCart()
  
  const query = searchParams.get('q') || ''

  useEffect(() => {
    if (query) {
      searchProducts()
    }
  }, [query, sortBy])

  const searchProducts = async () => {
    try {
      setLoading(true)
      setError('')
      
      const allProducts = await productService.getAll()
      
      // Simple search implementation
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      
      // Apply sorting
      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'rating':
            return b.rating - a.rating
          case 'name':
            return a.name.localeCompare(b.name)
          case 'relevance':
          default:
            // Simple relevance: prioritize name matches over description matches
            const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase())
            const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase())
            if (aNameMatch && !bNameMatch) return -1
            if (!aNameMatch && bNameMatch) return 1
            return a.name.localeCompare(b.name)
        }
      })
      
      setProducts(sorted)
    } catch (err) {
      setError('Errore nella ricerca')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const suggestions = [
    'trapano',
    'martello',
    'cacciavite',
    'sega',
    'chiave inglese',
    'morsa',
    'livella',
    'metro',
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-gradient-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <span>Home</span>
              <ApperIcon name="ChevronRight" size={16} />
              <span>Ricerca</span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">
              RISULTATI RICERCA
            </h1>
            {query && (
              <p className="text-xl text-gray-300">
                {products.length} risultati per "{query}"
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <SearchBar placeholder="Cerca prodotti, marchi, categorie..." />
        </motion.div>

        {query ? (
          <>
            {/* Results Toolbar */}
            <div className="bg-white rounded-lg shadow-card p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-secondary-600 font-medium">
                    {products.length} risultati trovati
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-secondary-600">Ordina per:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none"
                  >
                    <option value="relevance">Rilevanza</option>
                    <option value="name">Nome A-Z</option>
                    <option value="price-low">Prezzo: crescente</option>
                    <option value="price-high">Prezzo: decrescente</option>
                    <option value="rating">Valutazione</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <ProductGrid
              products={products}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
              onRetry={searchProducts}
            />
          </>
        ) : (
          /* Search Suggestions */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Search" size={36} className="text-white" />
            </div>
            
            <h2 className="font-display text-3xl text-secondary-900 mb-4">
              INIZIA LA TUA RICERCA
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Usa la barra di ricerca per trovare i prodotti che cerchi
            </p>
            
            <div className="max-w-2xl mx-auto">
              <h3 className="font-display text-xl text-secondary-900 mb-4">
                RICERCHE POPOLARI
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    onClick={() => setSearchParams({ q: suggestion })}
                    variant="outline"
                    size="small"
                    className="capitalize"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchResults