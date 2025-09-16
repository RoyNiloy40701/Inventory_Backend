const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
  searchProducts
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // <- Multer middleware we created earlier

// GET all products (with optional search)
router.get('/products', protect, getAllProducts);

// GET product by ID
router.get('/product/:id', getProductById);

// CREATE product (with optional image upload)
router.post('/product', protect, upload.single('image'), createProduct);

// UPDATE product by ID (replace image if new one is uploaded)
router.put('/product/:id', protect, upload.single('image'), updateProductById);

// DELETE product by ID
router.delete('/product/:id', protect, deleteProductById);


module.exports = router;
