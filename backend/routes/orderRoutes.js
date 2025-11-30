const express = require('express');
const { createOrder, getOrderById, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrderById);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;