const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getAllSaleProducts,
  getSaleProductById,
  createSaleProduct,
  updateSaleProduct,
  deleteSaleProduct
} = require('../controllers/saleProductController.js');


router.get('/all_saleProduct', getAllSaleProducts);
router.post('/saleProduct', protect, createSaleProduct);
router.get('/saleProduct/:id', protect, getSaleProductById);
router.put('/saleProduct/:id', protect, updateSaleProduct);
router.delete('/saleProduct/:id', protect, deleteSaleProduct);

module.exports = router;
