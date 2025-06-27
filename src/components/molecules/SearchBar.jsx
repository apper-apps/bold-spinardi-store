import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ className = '', placeholder = "Cerca prodotti, marchi, categorie..." }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      initial={false}
      animate={{ scale: isActive ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <ApperIcon name="Search" size={20} className="text-gray-400" />
        </div>
        {searchQuery && (
          <motion.button
            type="submit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <div className="bg-primary hover:bg-primary-600 text-white p-1.5 rounded-full transition-colors duration-200">
              <ApperIcon name="ArrowRight" size={16} />
            </div>
          </motion.button>
        )}
      </div>
    </motion.form>
  )
}

export default SearchBar