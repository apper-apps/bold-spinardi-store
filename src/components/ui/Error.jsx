import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Si è verificato un errore", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-display text-secondary-900 mb-4">OOPS!</h3>
        <p className="text-secondary-600 mb-6 leading-relaxed">{message}</p>
        
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ApperIcon name="RefreshCcw" size={16} />
            RIPROVA
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Error