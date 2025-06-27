import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl mb-4">RESTA AGGIORNATO</h2>
            <p className="text-lg mb-6 opacity-90">
              Iscriviti alla newsletter per ricevere offerte esclusive e novità sui prodotti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 rounded-lg text-secondary-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                ISCRIVITI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Wrench" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl">SPINARDI</h3>
                <p className="text-sm text-gray-400 -mt-1">FERRAMENTA</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Dal 1950 il tuo partner di fiducia per utensili e ferramenta di qualità professionale.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <ApperIcon name="Facebook" size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <ApperIcon name="Instagram" size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <ApperIcon name="Youtube" size={16} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg mb-4">CATEGORIE</h4>
            <ul className="space-y-2">
              <li><Link to="/category/utensili-manuali" className="text-gray-400 hover:text-white transition-colors">Utensili Manuali</Link></li>
              <li><Link to="/category/elettroutensili" className="text-gray-400 hover:text-white transition-colors">Elettroutensili</Link></li>
              <li><Link to="/category/ferramenta" className="text-gray-400 hover:text-white transition-colors">Ferramenta</Link></li>
              <li><Link to="/category/sicurezza" className="text-gray-400 hover:text-white transition-colors">Sicurezza</Link></li>
              <li><Link to="/category/giardinaggio" className="text-gray-400 hover:text-white transition-colors">Giardinaggio</Link></li>
              <li><Link to="/category/idraulica" className="text-gray-400 hover:text-white transition-colors">Idraulica</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display text-lg mb-4">ASSISTENZA</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contattaci</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Spedizioni</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Resi e Cambi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Garanzie</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Catalogo PDF</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg mb-4">CONTATTI</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ApperIcon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Via Industria 123</p>
                  <p className="text-gray-400">20100 Milano, Italy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Phone" size={16} className="text-primary flex-shrink-0" />
                <p className="text-gray-400">+39 0123 456789</p>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" size={16} className="text-primary flex-shrink-0" />
                <p className="text-gray-400">info@spinardiferramenta.it</p>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Clock" size={16} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Lun-Sab: 8:00-18:00</p>
                  <p className="text-gray-400">Dom: Chiuso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Spinardi Ferramenta. Tutti i diritti riservati.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termini di Servizio</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer