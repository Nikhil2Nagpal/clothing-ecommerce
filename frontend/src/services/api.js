import axios from 'axios'

// Determine base URL based on environment
const getBaseURL = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.location) {
    // For Vercel production deployments
    if (import.meta.env && import.meta.env.VITE_API_URL) {
      console.log('Using VITE_API_URL from import.meta.env:', import.meta.env.VITE_API_URL)
      return import.meta.env.VITE_API_URL
    }
    
    // Check process.env (for compatibility)
    if (process.env.VITE_API_URL) {
      console.log('Using VITE_API_URL from process.env:', process.env.VITE_API_URL)
      return process.env.VITE_API_URL
    }
  }
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Using production fallback URL')
    // Update this to your actual backend URL when deployed
    return 'https://clothing-ecommerce-backend-1tp3.onrender.com/api'
  }
  
  console.log('Using localhost for development')
  // Default to localhost for development
  return 'http://localhost:3002/api'
}

// Log the base URL being used
const baseURL = getBaseURL()
console.log('Final API Base URL:', baseURL)

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.baseURL + config.url)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message)
    return Promise.reject(error)
  }
)

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