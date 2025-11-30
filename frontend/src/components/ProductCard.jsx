import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'S')
  
  const handleAddToCart = () => {
    // For simplicity, we'll use the first available size
    addToCart(product, selectedSize, 1)
  }

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">${product.price}</span>
          <button 
            className="btn btn-primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard