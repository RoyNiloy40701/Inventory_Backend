const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllBankTransaction, createBankTransaction, getBankTransactionById, updateBankTransaction, deleteBankTransaction } = require('../controllers/bankTransactionController');


//Department Route
router.get('/bankTransactions', protect, getAllBankTransaction);
router.post('/bankTransaction', protect, createBankTransaction);
router.get('/bankTransaction/:id', protect, getBankTransactionById);
router.put('/bankTransaction/:id', protect, updateBankTransaction);
router.delete('/bankTransaction/:id', protect, deleteBankTransaction)

module.exports = router;