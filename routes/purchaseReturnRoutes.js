const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    getAllPurchaseReturn,
    createPurchaseReturn,
    getPurchaseReturnById,
    updatePurchaseReturn, 
    deletePurchaseReturn,
    searchPurchaseByChallanNo,
    getPurchaseReturnWithProductsById,

} = require('../controllers/purchaseReturnController');


router.get('/', protect, getAllPurchaseReturn);
router.get('/search', protect, searchPurchaseByChallanNo);
router.post('/add', protect, createPurchaseReturn);
router.get('/:id', protect, getPurchaseReturnById);
router.put('/edit/:id', protect, updatePurchaseReturn);
router.delete('/delete/:id', protect, deletePurchaseReturn)
router.get('/with-products/:id', protect, getPurchaseReturnWithProductsById);

module.exports = router;