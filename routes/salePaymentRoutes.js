const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllSalePayment, createSalePayment, getSalePaymentById, updateSalePayment, deleteSalePayment } = require('../controllers/salePaymentController');


//Department Route
router.get('/all_salePayment', getAllSalePayment);
router.post('/salePayment', protect, createSalePayment);
router.get('/salePayment/:id', protect, getSalePaymentById);
router.put('/salePayment/:id', protect, updateSalePayment);
router.delete('/salePayment/:id', protect, deleteSalePayment)

module.exports = router;