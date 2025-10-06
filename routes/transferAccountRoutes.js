const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllTransferAccount, createTransferAccount, getTransferAccountById, updateTransferAccount, deleteTransferAccount } = require('../controllers/transferAccountController');


//Department Route
router.get('/transferAccounts', protect, getAllTransferAccount);
router.post('/transferAccount', protect, createTransferAccount);
router.get('/transferAccount/:id', protect, getTransferAccountById);
router.put('/transferAccount/:id', protect, updateTransferAccount);
router.delete('/transferAccount/:id', protect, deleteTransferAccount)

module.exports = router;