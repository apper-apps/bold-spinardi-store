import { motion } from 'framer-motion'

const Loading = ({ type = 'page' }) => {
  if (type === 'products') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg overflow-hidden shadow-card"
          >
            <div className="skeleton h-48 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="skeleton h-4 w-3/4 rounded"></div>
              <div className="skeleton h-3 w-1/2 rounded"></div>
              <div className="skeleton h-6 w-1/4 rounded"></div>
              <div className="skeleton h-10 w-full rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'product') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="skeleton h-96 w-full rounded-lg"></div>
          <div className="space-y-6">
            <div className="skeleton h-8 w-3/4 rounded"></div>
            <div className="skeleton h-4 w-1/2 rounded"></div>
            <div className="skeleton h-6 w-1/4 rounded"></div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-3/4 rounded"></div>
            </div>
            <div className="skeleton h-12 w-full rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full animate-pulse"></div>
        <h2 className="text-2xl font-display text-secondary-900 mb-2">CARICAMENTO</h2>
        <p className="text-secondary-600">Preparando la tua esperienza...</p>
      </motion.div>
    </div>
  )
}

export default Loading