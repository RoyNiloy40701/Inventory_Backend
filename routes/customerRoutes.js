const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { getAllCustomer, createCustomer, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/customerController.js');



//Employee route
router.get('/all_customer', protect, getAllCustomer);
router.post('/customer', protect, createCustomer);
router.get('/customer/:id', protect, getCustomerById);
router.put('/customer/:id', protect, updateCustomer);
router.delete('/customer/:id', protect, deleteCustomer);


module.exports = router;