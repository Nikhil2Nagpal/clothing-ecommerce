import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Navbar = () => {
  const { cartCount } = useContext(CartContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  
  // Check if user is logged in (in a real app, you would check for a token)
  useEffect(() => {
    // For demo purposes, we'll check if there's a user in localStorage
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  
  const handleLogout = () => {
    // In a real app, this would make an API call to logout
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    alert('Logged out successfully')
    navigate('/')
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Clothing Store
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar