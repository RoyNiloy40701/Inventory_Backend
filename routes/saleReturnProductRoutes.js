// saleReturnRoutes.js
const express = require("express");
const router = express.Router();
const { createSaleReturnProduct } = require("../controllers/saleReturnProductController");
const { protect } = require('../middlewares/authMiddleware');

// GET request to check invoice
router.post('/saleReturnProducts',protect,createSaleReturnProduct);

module.exports = router;
