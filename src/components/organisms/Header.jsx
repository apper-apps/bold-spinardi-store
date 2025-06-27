import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import { useCart } from '@/hooks/useCart'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const { cartItemsCount } = useCart()
  const navigate = useNavigate()

  const categories = [
    { id: 'utensili-manuali', name: 'Utensili Manuali', icon: 'Wrench' },
    { id: 'elettroutensili', name: 'Elettroutensili', icon: 'Zap' },
    { id: 'ferramenta', name: 'Ferramenta', icon: 'Hammer' },
    { id: 'sicurezza', name: 'Sicurezza', icon: 'Shield' },
    { id: 'giardinaggio', name: 'Giardinaggio', icon: 'Flower' },
    { id: 'idraulica', name: 'Idraulica', icon: 'Droplets' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-industrial">
      {/* Top Bar */}
      <div className="bg-gradient-secondary text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ApperIcon name="Phone" size={14} />
              +39 0123 456789
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Mail" size={14} />
              info@spinardiferramenta.it
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Spedizione gratuita oltre €50</span>
            <ApperIcon name="Truck" size={14} />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Wrench" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-secondary-900">SPINARDI</h1>
              <p className="text-sm text-secondary-600 -mt-1">FERRAMENTA</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="small"
              icon="Heart"
              className="hidden sm:flex"
            >
              Wishlist
            </Button>
            
            <Button
              onClick={() => navigate('/cart')}
              variant="ghost"
              size="small"
              icon="ShoppingCart"
              className="relative"
            >
              <span className="hidden sm:inline">Carrello</span>
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="small"
              icon="Menu"
              className="lg:hidden"
            />
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden mt-4">
          <SearchBar />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-surface border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="hidden lg:flex items-center">
              <Button
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                variant="ghost"
                icon="Grid3X3"
                className="mr-6"
              >
                TUTTE LE CATEGORIE
              </Button>
              
              <div className="flex items-center gap-6">
                <Link to="/category/offerte" className="text-secondary-700 hover:text-primary font-medium transition-colors">
                  OFFERTE
                </Link>
                <Link to="/category/novita" className="text-secondary-700 hover:text-primary font-medium transition-colors">
                  NOVITÀ
                </Link>
                <Link to="/category/pro" className="text-secondary-700 hover:text-primary font-medium transition-colors">
                  PRO TOOLS
                </Link>
                <Link to="/category/marchi" className="text-secondary-700 hover:text-primary font-medium transition-colors">
                  MARCHI
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3">
              <span className="text-sm text-secondary-600">Assistenza clienti</span>
              <div className="flex items-center gap-2 text-primary">
                <ApperIcon name="Headphones" size={16} />
                <span className="font-semibold">Lun-Sab 8:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
            className="absolute left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-3 gap-8">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ApperIcon name={category.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-secondary-900 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-secondary-600">Scopri i prodotti</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="flex items-center gap-3 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ApperIcon name={category.icon} size={20} className="text-primary" />
                  <span className="font-medium text-secondary-900">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header