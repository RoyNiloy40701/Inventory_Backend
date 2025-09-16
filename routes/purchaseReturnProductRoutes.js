const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
        createPurchaseReturnProduct,
        getAllPurchaseReturnProduct,
        getPurchaseReturnProductById,
        updatePurchaseReturnProduct,
        deletePurchaseReturnProduct

    } = require('../controllers/purchaseReturnProductController');

router.post('/add', protect,createPurchaseReturnProduct );
router.get('/', protect, getAllPurchaseReturnProduct);
router.get('/:id', protect, getPurchaseReturnProductById);
router.put('edit/:id', protect, updatePurchaseReturnProduct);
router.delete('/delete/:id', protect, deletePurchaseReturnProduct);


module.exports = router;
