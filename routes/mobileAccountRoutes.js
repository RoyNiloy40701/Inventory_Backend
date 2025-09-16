const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllMobileAccount, createMobileAccount, getMobileAccountById, updateMobileAccount, deleteMobileAccount } = require('../controllers/mobileAccountController');


//Department Route
router.get('/mobileAccounts', protect, getAllMobileAccount);
router.post('/mobileAccount', protect, createMobileAccount);
router.get('/mobileAccount/:id', protect, getMobileAccountById);
router.put('/mobileAccount/:id', protect, updateMobileAccount);
router.delete('/mobileAccount/:id', protect, deleteMobileAccount)

module.exports = router;