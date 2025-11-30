const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0,
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300',
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Men',
      'Women',
      'Kids',
      'Accessories',
      'Footwear',
      'Other'
    ],
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  }],
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);