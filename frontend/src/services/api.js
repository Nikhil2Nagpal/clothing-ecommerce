import axios from 'axios'

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3002/api',
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
  
  addToCart: async (cartItem) => {
    try {
      const response = await apiClient.post('/cart/add', cartItem)
      return response
    } catch (error) {
      throw error
    }
  },
  
  updateCartItem: async (itemId, qty) => {
    try {
      const response = await apiClient.put('/cart/update', { itemId, qty })
      return response
    } catch (error) {
      throw error
    }
  },
  
  removeFromCart: async (itemId) => {
    try {
      const response = await apiClient.delete(`/cart/remove/${itemId}`)
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
  },
}