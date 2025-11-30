import React from 'react'
import { useParams } from 'react-router-dom'

const OrderSuccess = () => {
  const { id } = useParams()

  // Mock order data
  const order = {
    _id: id,
    orderDate: new Date().toLocaleDateString(),
    items: [
      {
        name: 'Classic White T-Shirt',
        size: 'M',
        qty: 2,
        price: 19.99
      },
      {
        name: 'Blue Denim Jacket',
        size: 'L',
        qty: 1,
        price: 59.99
      }
    ],
    totalPrice: 99.97
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. A confirmation email has been sent to your email address.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <p className="mb-2"><span className="font-medium">Order ID:</span> {order._id}</p>
          <p className="mb-2"><span className="font-medium">Order Date:</span> {order.orderDate}</p>
          
          <h3 className="font-bold mt-6 mb-3">Items Purchased</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <div>
                  <p>{item.name} ({item.size}) × {item.qty}</p>
                </div>
                <p>${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
            <span>Total</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn btn-primary">
            Continue Shopping
          </button>
          <button className="btn btn-secondary">
            View Order History
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess