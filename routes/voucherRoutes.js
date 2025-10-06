const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllVoucher, createVoucher, getVoucherById, updateVoucher, deleteVoucher } = require('../controllers/voucherController');


//Department Route
router.get('/all_voucher', protect, getAllVoucher);
router.post('/voucher', protect, createVoucher);
router.get('/voucher/:id', protect, getVoucherById);
router.put('/voucher/:id', protect, updateVoucher);
router.delete('/voucher/:id', protect, deleteVoucher)

module.exports = router;
