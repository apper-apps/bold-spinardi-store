const Badge = ({ children, variant = 'default', size = 'medium', className = '' }) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    accent: "bg-accent-100 text-accent-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    outline: "border-2 border-primary text-primary bg-transparent",
  }
  
  const sizes = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1 text-sm",
    large: "px-4 py-2 text-base",
  }

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge