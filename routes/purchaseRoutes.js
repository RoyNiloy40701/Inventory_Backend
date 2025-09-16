const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllPurchase, createPurchase, getPurchaseById, updatePurchase, deletePurchase } = require('../controllers/purchaseController');


//Department Route
router.get('/all_purchase', protect, getAllPurchase);
router.post('/purchase', protect, createPurchase);
router.get('/purchase/:id', protect, getPurchaseById);
router.put('/purchase/:id', protect, updatePurchase);
router.delete('/purchase/:id', protect, deletePurchase)

module.exports = router;