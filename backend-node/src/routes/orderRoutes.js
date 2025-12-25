const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);

module.exports = router;
