const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllPurchaseProduct, createPurchaseProduct, getPurchaseProductById, updatePurchaseProduct, deletePurchaseProduct } = require('../controllers/purchaseProductController');


//Department Route
router.get('/all_purchaseProduct', protect, getAllPurchaseProduct);
router.post('/purchaseProduct', protect, createPurchaseProduct);
router.get('/purchaseProduct/:id', protect, getPurchaseProductById);
router.put('/purchaseProduct/:id', protect, updatePurchaseProduct);
router.delete('/purchaseProduct/:id', protect, deletePurchaseProduct)

module.exports = router;