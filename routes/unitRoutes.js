const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllUnit, createUnit, getUnitById, updateUnit, deleteUnit } = require('../controllers/unitController');

//Unit Route
router.get('/all_units', protect, getAllUnit);
router.post('/unit', protect, createUnit);
router.get('/unit/:id', protect, getUnitById);
router.put('/unit/:id', protect, updateUnit);
router.delete('/unit/:id', protect, deleteUnit)

module.exports = router;