import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import { api } from '../services/api'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await api.getProducts()
        
        // Handle different possible response formats
        let productsData = []
        if (Array.isArray(response.data)) {
          productsData = response.data
        } else if (response.data && Array.isArray(response.data.products)) {
          productsData = response.data.products
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          productsData = response.data.data
        }
        
        setProducts(productsData)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleFilterChange = async (filters) => {
    try {
      setLoading(true)
      const response = await api.getProducts(filters)
      console.log('Filtered Products API Response:', response)
      const productsData = response.data.products || response.data
      setProducts(Array.isArray(productsData) ? productsData : [])
    } catch (err) {
      console.error('Error filtering products:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4">Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading products: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
      
      <Filters onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home