// saleReturnRoutes.js
const express = require("express");
const router = express.Router();
const { checkInvoice } = require("../controllers/saleReturnController");

// GET request to check invoice
router.get("/search", checkInvoice);

module.exports = router;
