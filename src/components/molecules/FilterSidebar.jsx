import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  categories = [],
  brands = [],
  isOpen = true,
  onToggle 
}) => {
  const priceRanges = [
    { label: 'Sotto €25', value: '0-25' },
    { label: '€25 - €50', value: '25-50' },
    { label: '€50 - €100', value: '50-100' },
    { label: '€100 - €200', value: '100-200' },
    { label: 'Oltre €200', value: '200+' },
  ]

  const handleFilterChange = (type, value) => {
    onFilterChange(type, value)
  }

  const activeFiltersCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value
  ).length

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full"
          icon="Filter"
        >
          FILTRI {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="lg:block bg-white rounded-lg shadow-card p-6 overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl text-secondary-900">FILTRI</h3>
          {activeFiltersCount > 0 && (
            <Button
              onClick={onClearFilters}
              variant="ghost"
              size="small"
              icon="X"
            >
              CANCELLA
            </Button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-display text-lg text-secondary-900 mb-3">CATEGORIE</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category.id) || false}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...(filters.categories || []), category.id]
                      : (filters.categories || []).filter(id => id !== category.id)
                    handleFilterChange('categories', newCategories)
                  }}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-secondary-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h4 className="font-display text-lg text-secondary-900 mb-3">MARCHI</h4>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(brand) || false}
                  onChange={(e) => {
                    const newBrands = e.target.checked
                      ? [...(filters.brands || []), brand]
                      : (filters.brands || []).filter(b => b !== brand)
                    handleFilterChange('brands', newBrands)
                  }}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-secondary-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-display text-lg text-secondary-900 mb-3">PREZZO</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-secondary-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h4 className="font-display text-lg text-secondary-900 mb-3">DISPONIBILITÀ</h4>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-secondary-700">Solo prodotti disponibili</span>
          </label>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h4 className="font-display text-lg text-secondary-900 mb-3">VALUTAZIONE</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-secondary-700 ml-1">e oltre</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-display text-sm text-secondary-900 mb-3">FILTRI ATTIVI</h4>
            <div className="flex flex-wrap gap-2">
              {filters.categories?.map((categoryId) => {
                const category = categories.find(c => c.id === categoryId)
                return category ? (
                  <Badge key={categoryId} variant="primary" size="small">
                    {category.name}
                  </Badge>
                ) : null
              })}
              {filters.brands?.map((brand) => (
                <Badge key={brand} variant="secondary" size="small">
                  {brand}
                </Badge>
              ))}
              {filters.priceRange && (
                <Badge variant="accent" size="small">
                  {priceRanges.find(r => r.value === filters.priceRange)?.label}
                </Badge>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default FilterSidebar