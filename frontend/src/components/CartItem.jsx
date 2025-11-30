import React from 'react'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center border-b py-4">
      <img 
        src={item.product.image} 
        alt={item.product.name} 
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-gray-600">Size: {item.size}</p>
        <p className="text-lg font-bold text-blue-600">${item.product.price}</p>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => onUpdateQuantity(item._id, item.qty - 1)}
          className="w-8 h-8 flex items-center justify-center border rounded-l-md"
        >
          -
        </button>
        <span className="w-10 h-8 flex items-center justify-center border-t border-b">
          {item.qty}
        </span>
        <button 
          onClick={() => onUpdateQuantity(item._id, item.qty + 1)}
          className="w-8 h-8 flex items-center justify-center border rounded-r-md"
        >
          +
        </button>
      </div>
      <div className="ml-4">
        <p className="font-bold">${(item.product.price * item.qty).toFixed(2)}</p>
      </div>
      <button 
        onClick={() => onRemove(item._id)}
        className="ml-4 text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem