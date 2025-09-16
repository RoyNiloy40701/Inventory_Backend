const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllCashAccount, createCashAccount, getCashAccountById, updateCashAccount, deleteCashAccount } = require('../controllers/cashAccountController');


//Department Route
router.get('/cashAccounts', protect, getAllCashAccount);
router.post('/cashAccount', protect, createCashAccount);
router.get('/cashAccount/:id', protect, getCashAccountById);
router.put('/cashAccount/:id', protect, updateCashAccount);
router.delete('/cashAccount/:id', protect, deleteCashAccount)

module.exports = router;