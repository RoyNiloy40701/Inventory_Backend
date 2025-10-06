const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllBankAccount, createBankAccount, getBankAccountById, updateBankAccount, deleteBankAccount, getBankTransactions } = require('../controllers/bankAccountController');


//Department Route
router.get('/bankAccounts', protect, getAllBankAccount);
router.post('/bankAccount', protect, createBankAccount);
router.get('/bankTransactions', protect, getBankTransactions);
router.get('/bankAccount/:id', protect, getBankAccountById);
router.put('/bankAccount/:id', protect, updateBankAccount);
router.delete('/bankAccount/:id', protect, deleteBankAccount)

module.exports = router;