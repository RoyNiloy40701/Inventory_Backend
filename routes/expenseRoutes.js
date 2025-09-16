const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllExpense, createExpense, getExpenseById, updateExpense, deleteExpense } = require('../controllers/expenseController');


//Expense Route
router.get('/all_expense', protect, getAllExpense);
router.post('/expense', protect, createExpense);
router.get('/expense/:id', protect, getExpenseById);
router.put('/expense/:id', protect, updateExpense);
router.delete('/expense/:id', protect, deleteExpense)

module.exports = router;