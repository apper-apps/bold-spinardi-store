import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label, 
  type = 'text', 
  placeholder, 
  icon, 
  iconPosition = 'left',
  error,
  className = '',
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
    focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
    transition-all duration-200
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
    ${icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : ''}
    ${className}
  `

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} flex items-center ${iconPosition === 'left' ? 'pl-3' : 'pr-3'}`}>
            <ApperIcon name={icon} size={20} className="text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input