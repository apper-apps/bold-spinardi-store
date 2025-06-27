import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { formatPrice } from '@/utils/formatters'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item.productId)
    } else {
      onUpdateQuantity(item.productId, newQuantity)
    }
  }

  const subtotal = item.price * item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-lg shadow-card p-4 mb-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg text-secondary-900 truncate">
            {item.name}
          </h4>
          <p className="text-sm text-secondary-600 mt-1">
            {item.brand}
          </p>
          <p className="text-lg font-bold text-primary mt-1">
            {formatPrice(item.price)}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center border-2 border-gray-200 rounded-lg">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="Minus" size={16} />
            </motion.button>
            <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
              {item.quantity}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="Plus" size={16} />
            </motion.button>
          </div>
          
          <div className="text-right min-w-[5rem]">
            <p className="text-xl font-display font-bold text-secondary-900">
              {formatPrice(subtotal)}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, color: '#F44336' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(item.productId)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <ApperIcon name="Trash2" size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem