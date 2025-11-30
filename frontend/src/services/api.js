import axios from 'axios'

// Determine base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  if (process.env.NODE_ENV === 'production') {
    // Update this to your actual backend URL when deployed
    return 'https://your-backend-url.com/api'
  }
  
  // Default to localhost for development
  return 'http://localhost:3002/api'
}

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
})

export const api = {
  // Product APIs
  getProducts: async (params = {}) => {
    try {
      const response = await apiClient.get('/products', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // Auth APIs
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      return response
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout')
      return response
    } catch (error) {
      throw error
    }
  },

  // Cart APIs
  getCart: async () => {
    try {
      const response = await apiClient.get('/cart')
      return response
    } catch (error) {
      throw error
    }
  },

  addToCart: async (productId, size, qty) => {
    try {
      const response = await apiClient.post('/cart', { productId, size, qty })
      return response
    } catch (error) {
      throw error
    }
  },

  updateCartItem: async (itemId, qty) => {
    try {
      const response = await apiClient.put(`/cart/${itemId}`, { qty })
      return response
    } catch (error) {
      throw error
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await apiClient.delete(`/cart/${itemId}`)
      return response
    } catch (error) {
      throw error
    }
  },

  // Order APIs
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', orderData)
      return response
    } catch (error) {
      throw error
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`)
      return response
    } catch (error) {
      throw error
    }
  }
}