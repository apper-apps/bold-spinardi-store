import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const CART_STORAGE_KEY = 'spinardi-cart'

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.Id)
      
      if (existingItem) {
        // Update quantity for existing item
        return prev.map(item =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item
        return [...prev, {
          productId: product.Id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.images[0],
          quantity: 1
        }]
      }
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId))
    toast.info('Prodotto rimosso dal carrello')
  }

  const clearCart = () => {
    setCartItems([])
    toast.info('Carrello svuotato')
  }

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartItemsCount,
    cartTotal
  }
}