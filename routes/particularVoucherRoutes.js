const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllParticularVoucher, createParticularVoucher, getParticularVoucherById, updateParticularVoucher, deleteParticularVoucher } = require('../controllers/particularVouchar');



//Department Route
router.get('/all_particularVoucher', protect, getAllParticularVoucher);
router.post('/particularVoucher', protect, createParticularVoucher);
router.get('/particularVoucher/:id', protect, getParticularVoucherById);
router.put('/particularVoucher/:id', protect, updateParticularVoucher);
router.delete('/particularVoucher/:id', protect, deleteParticularVoucher)

module.exports = router;