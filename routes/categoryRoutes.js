const express = require('express');
const router = express.Router();
const { getAllCategory, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController.js');
const { protect } = require('../middlewares/authMiddleware');


//Category route
router.get('/all_category', protect, getAllCategory);
router.post('/category', protect, createCategory);
router.get('/category/:id', protect, getCategoryById);
router.put('/category/:id', protect, updateCategory);
router.delete('/category/:id', protect, deleteCategory);


module.exports = router;