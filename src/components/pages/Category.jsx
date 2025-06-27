import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/organisms/ProductGrid'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { productService } from '@/services/api/productService'
import { categoryService } from '@/services/api/categoryService'
import { useCart } from '@/hooks/useCart'

const Category = () => {
  const { categorySlug } = useParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('name')
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: '',
    inStock: false,
    rating: null,
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    loadData()
  }, [categorySlug])

  useEffect(() => {
    applyFilters()
  }, [products, filters, sortBy])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ])
      
      setProducts(productsData)
      setCategories(categoriesData)
      
      // Find current category
      const category = categoriesData.find(c => c.slug === categorySlug)
      setCurrentCategory(category)
      
      // Filter products by category if specific category is selected
      if (category && categorySlug !== 'tutti') {
        const categoryProducts = productsData.filter(p => p.category === category.name)
        setProducts(categoryProducts)
      } else {
        setProducts(productsData)
      }
    } catch (err) {
      setError('Errore nel caricamento dei prodotti')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      )
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      )
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-')
      filtered = filtered.filter(product => {
        if (max === '+') {
          return product.price >= parseInt(min)
        }
        return product.price >= parseInt(min) && product.price <= parseInt(max)
      })
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: '',
      inStock: false,
      rating: null,
    })
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const uniqueBrands = [...new Set(products.map(p => p.brand))]

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className="bg-gradient-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <span>Home</span>
              <ApperIcon name="ChevronRight" size={16} />
              <span>Categorie</span>
              <ApperIcon name="ChevronRight" size={16} />
              <span>{currentCategory?.name || 'Tutti i Prodotti'}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              {currentCategory?.name || 'TUTTI I PRODOTTI'}
            </h1>
            <p className="text-xl text-gray-300">
              {filteredProducts.length} prodotti trovati
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              categories={categories}
              brands={uniqueBrands}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-card p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-secondary-600">
                    {filteredProducts.length} prodotti
                  </span>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-primary text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ApperIcon name="Grid3X3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-primary text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ApperIcon name="List" size={16} />
                    </button>
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-secondary-600">Ordina per:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-primary focus:outline-none"
                  >
                    <option value="name">Nome A-Z</option>
                    <option value="price-low">Prezzo: crescente</option>
                    <option value="price-high">Prezzo: decrescente</option>
                    <option value="rating">Valutazione</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
              onRetry={loadData}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category