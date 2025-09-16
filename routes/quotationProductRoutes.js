const express = require('express');
const { createQuotationProduct, getAllQuotationProduct, deleteQuotationProduct, getQuotationProductById, updateQuotationProduct } = require('../controllers/quotationProductController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');


router.get('/all_quotationProduct', protect, getAllQuotationProduct);
router.delete('/quotationProduct/:id', protect, deleteQuotationProduct);
router.get('/quotationProduct/:id', protect, getQuotationProductById);
router.put('/quotationProduct/:id', protect, updateQuotationProduct);
router.post('/QuotationProduct', protect, createQuotationProduct);
module.exports = router;