const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { getAllSupplier, createSupplier, getSupplierById, updateSupplier, deleteSupplier } = require('../controllers/supplierController.js');



//Company route
router.get('/all_supplier', protect, getAllSupplier);
router.post('/supplier', protect, createSupplier);
router.get('/supplier/:id', protect, getSupplierById);
router.put('/supplier/:id', protect, updateSupplier);
router.delete('/supplier/:id', protect, deleteSupplier);


module.exports = router;