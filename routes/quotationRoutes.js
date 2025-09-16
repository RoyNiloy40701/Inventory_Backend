const express = require('express');
const router = express.Router();
const { getAllQuotation, deleteQuotation, getQuotationById, updateQuotation, createQuotation } = require('../controllers/quotationController');
const { protect } = require('../middlewares/authMiddleware.js');


router.post('/quotation', protect, createQuotation);
router.get('/all_quotation', getAllQuotation);
router.delete('/quotation/:id', protect, deleteQuotation);
router.get('/quotation/:id', protect, getQuotationById);
router.put('/quotation/:id', protect, updateQuotation);
module.exports = router;