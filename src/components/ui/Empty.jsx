import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "Nessun prodotto trovato", 
  description = "Prova a modificare i filtri o cerca qualcos'altro",
  actionText = "ESPLORA CATEGORIE",
  onAction,
  icon = "Package"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-accent rounded-full flex items-center justify-center"
        >
          <ApperIcon name={icon} size={36} className="text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-display text-secondary-900 mb-4">{title}</h3>
        <p className="text-secondary-600 mb-8 leading-relaxed">{description}</p>
        
        {onAction && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0, 188, 212, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ApperIcon name="ArrowRight" size={16} />
            {actionText}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty