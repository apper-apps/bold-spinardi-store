import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import CartItem from '@/components/molecules/CartItem'
import Empty from '@/components/ui/Empty'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatters'

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    cartItemsCount 
  } = useCart()
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      // In a real app, this would redirect to payment or success page
      alert('Checkout simulato - funzionalità da implementare')
    }, 2000)
  }

  const shippingCost = cartTotal >= 50 ? 0 : 5.99
  const finalTotal = cartTotal + shippingCost

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <Empty
            title="Il carrello è vuoto"
            description="Aggiungi alcuni prodotti al carrello per iniziare lo shopping"
            actionText="INIZIA A COMPRARE"
            onAction={() => window.location.href = '/'}
            icon="ShoppingCart"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <ApperIcon name="ChevronRight" size={16} />
              <span>Carrello</span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-2">
              CARRELLO
            </h1>
            <p className="text-xl text-gray-300">
              {cartItemsCount} {cartItemsCount === 1 ? 'prodotto' : 'prodotti'} nel carrello
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-secondary-900">
                  PRODOTTI
                </h2>
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  size="small"
                  icon="Trash2"
                  className="text-red-600 hover:text-red-700"
                >
                  Svuota carrello
                </Button>
              </div>
              
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.productId}-${Date.now()}`}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium">
                <ApperIcon name="ArrowLeft" size={16} />
                Continua lo shopping
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-card p-6 sticky top-6"
            >
              <h2 className="font-display text-2xl text-secondary-900 mb-6">
                RIEPILOGO ORDINE
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Subtotale</span>
                  <span className="font-semibold text-secondary-900">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Spedizione</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-secondary-900'}`}>
                    {shippingCost === 0 ? 'Gratuita' : formatPrice(shippingCost)}
                  </span>
                </div>
                
                {cartTotal < 50 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-amber-700">
                      <ApperIcon name="Info" size={16} />
                      <span className="text-sm">
                        Aggiungi {formatPrice(50 - cartTotal)} per la spedizione gratuita
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-secondary-900">
                      TOTALE
                    </span>
                    <span className="text-2xl font-display font-bold text-primary">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  loading={isCheckingOut}
                  className="w-full"
                  size="large"
                  icon="CreditCard"
                >
                  {isCheckingOut ? 'ELABORAZIONE...' : 'PROCEDI AL PAGAMENTO'}
                </Button>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-secondary-600 mb-2">
                    <ApperIcon name="Shield" size={16} />
                    <span>Pagamento sicuro</span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-2xl">💳</div>
                    <div className="text-2xl">🏦</div>
                    <div className="text-2xl">📱</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-display text-lg text-secondary-900 mb-3">
                  VANTAGGI SPINARDI
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <ApperIcon name="Truck" size={14} className="text-primary" />
                    <span>Spedizione gratuita oltre €50</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <ApperIcon name="Shield" size={14} className="text-primary" />
                    <span>Garanzia 2 anni</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <ApperIcon name="RefreshCcw" size={14} className="text-primary" />
                    <span>Reso facile entro 30 giorni</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart