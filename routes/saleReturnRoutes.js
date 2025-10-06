// saleReturnRoutes.js
const express = require("express");
const router = express.Router();
const { checkInvoice,createSaleReturn,getAllSaleReturns, deleteSaleReturn } = require("../controllers/saleReturnController");
const { protect } = require('../middlewares/authMiddleware');

// GET request to check invoice
router.get("/search", checkInvoice);
router.post('/saleReturn',protect,createSaleReturn);
router.get("/all", getAllSaleReturns);
router.delete("/saleReturn/:id", protect, deleteSaleReturn);

module.exports = router;

