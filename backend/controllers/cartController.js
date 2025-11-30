const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (cart) {
      res.json(cart);
    } else {
      res.json({ items: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  const { productId, size, qty } = req.body;

  try {
    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already has a cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId && item.size === size
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].qty += qty;
      } else {
        // Add new item
        cart.items.push({ product: productId, size, qty });
      }

      await cart.save();
      res.json(cart);
    } else {
      // Create new cart
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, size, qty }],
      });

      res.status(201).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
  const { itemId, qty } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

      if (itemIndex > -1) {
        cart.items[itemIndex].qty = qty;
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};