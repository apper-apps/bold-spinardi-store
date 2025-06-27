import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[60vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white transform rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white transform rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                DAL 1950 LA QUALITÀ CHE CERCHI
              </span>
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6">
                STRUMENTI
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-200">
                  PROFESSIONALI
                </span>
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed opacity-90">
                Scopri la nostra selezione di utensili e ferramenta per ogni esigenza. 
                Qualità garantita e prezzi competitivi.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button 
                as={Link} 
                to="/category/offerte"
                variant="secondary"
                size="large"
                icon="Zap"
                className="text-center"
              >
                SCOPRI LE OFFERTE
              </Button>
              <Button 
                as={Link} 
                to="/category/elettroutensili"
                variant="outline"
                size="large"
                icon="ArrowRight"
                className="border-white text-white hover:bg-white hover:text-secondary-900"
              >
                ELETTROUTENSILI
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-8"
            >
              <div className="flex items-center gap-2">
                <ApperIcon name="Truck" size={24} className="text-accent-200" />
                <span className="text-sm font-medium">Spedizione gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" size={24} className="text-accent-200" />
                <span className="text-sm font-medium">Garanzia 2 anni</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Headphones" size={24} className="text-accent-200" />
                <span className="text-sm font-medium">Supporto 24/7</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <ApperIcon name="Wrench" size={48} className="text-white mx-auto mb-4" />
                    <h3 className="font-display text-xl text-white mb-2">UTENSILI</h3>
                    <p className="text-white/80 text-sm">Manuali & Elettrici</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <ApperIcon name="Hammer" size={48} className="text-white mx-auto mb-4" />
                    <h3 className="font-display text-xl text-white mb-2">FERRAMENTA</h3>
                    <p className="text-white/80 text-sm">Viti, Bulloni & Altro</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <ApperIcon name="Shield" size={48} className="text-white mx-auto mb-4" />
                    <h3 className="font-display text-xl text-white mb-2">SICUREZZA</h3>
                    <p className="text-white/80 text-sm">DPI & Protezioni</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <ApperIcon name="Flower" size={48} className="text-white mx-auto mb-4" />
                    <h3 className="font-display text-xl text-white mb-2">GIARDINO</h3>
                    <p className="text-white/80 text-sm">Attrezzi & Cura</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400 rounded-full blur-2xl opacity-60"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection