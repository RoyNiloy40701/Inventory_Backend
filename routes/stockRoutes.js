const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { stockAdjust, stockIn, stockOut, getAllStock } = require('../controllers/stockController.js');



//Role route
router.get('/', protect, getAllStock);
router.post('/in', protect, stockIn);
router.post('/out', protect, stockOut);
router.post('/adjustment', protect, stockAdjust);


module.exports = router;