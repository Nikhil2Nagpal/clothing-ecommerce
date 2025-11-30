import React, { createContext, useState, useEffect } from 'react'
import { api } from '../services/api'

// Create context
export const CartContext = createContext()

// Context provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (err) {
        console.error('Error parsing saved cart:', err)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add item to cart
  const addToCart = async (product, size, qty) => {
    try {
      setLoading(true)
      setError(null)
      
      // For now, we'll just update the local state
      // In a real app with authentication, this would make an API call
      
      setCartItems(prevItems => {
        // Check if item already exists in cart
        const existingItem = prevItems.find(
          item => item.product._id === product._id && item.size === size
        )

        if (existingItem) {
          // Update quantity
          return prevItems.map(item =>
            item.product._id === product._id && item.size === size
              ? { ...item, qty: item.qty + qty }
              : item
          )
        } else {
          // Add new item
          return [...prevItems, { product, size, qty, _id: Date.now().toString() }]
        }
      })
      
      return { success: true }
    } catch (err) {
      setError(err.message)
      console.error('Error adding to cart:', err)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Update item quantity
  const updateQuantity = async (id, qty) => {
    if (qty < 1) {
      removeFromCart(id)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // For now, we'll just update the local state
      // In a real app with authentication, this would make an API call
      
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === id ? { ...item, qty } : item
        )
      )
      
      return { success: true }
    } catch (err) {
      setError(err.message)
      console.error('Error updating cart item:', err)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      setLoading(true)
      setError(null)
      
      // For now, we'll just update the local state
      // In a real app with authentication, this would make an API call
      
      setCartItems(prevItems => prevItems.filter(item => item._id !== id))
      
      return { success: true }
    } catch (err) {
      setError(err.message)
      console.error('Error removing from cart:', err)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Calculate total items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0)

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.qty,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartCount,
        cartTotal,
        loading,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  )
}