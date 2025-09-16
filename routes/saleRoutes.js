//sale routes
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createSale, getSaleById, deleteSale, updateSale, getSaleByIdForEdit, getAllSale, getAllSaleProductWise } = require('../controllers/saleController.js');


router.get('/all_sale',protect, getAllSale);
router.get('/sale_ProductWise',protect, getAllSaleProductWise);
router.post('/sale',protect, createSale);
router.delete('/sale/:id',protect, deleteSale)
router.put('/sale/:id',protect, updateSale)
router.get('/sale/:id', protect,getSaleById);

module.exports = router;