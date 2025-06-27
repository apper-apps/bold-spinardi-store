import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "btn-primary focus:ring-primary",
    secondary: "btn-secondary focus:ring-secondary",
    outline: "btn-outline focus:ring-primary",
    ghost: "text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900",
    danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg",
  }
  
  const sizes = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-6 text-base",
    large: "py-4 px-8 text-lg",
  }
  
  const iconSize = {
    small: 14,
    medium: 16,
    large: 18,
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={iconSize[size]} className="animate-spin mr-2" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} size={iconSize[size]} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} size={iconSize[size]} className="ml-2" />
      )}
    </motion.button>
  )
}

export default Button