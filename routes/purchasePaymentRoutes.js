const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllPurchasePayment, createPurchasePayment, getPurchasePaymentById, updatePurchasePayment, deletePurchasePayment } = require('../controllers/purchasePaymentController');


//Department Route
router.get('/all_purchasePayment', protect, getAllPurchasePayment);
router.post('/purchasePayment', protect, createPurchasePayment);
router.get('/purchasePayment/:id', protect, getPurchasePaymentById);
router.put('/purchasePayment/:id', protect, updatePurchasePayment);
router.delete('/purchasePayment/:id', protect, deletePurchasePayment)

module.exports = router;