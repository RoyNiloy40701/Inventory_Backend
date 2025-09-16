const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllDepartment, createDepartment, getDepartmentById, updateDepartment, deleteDepartment } = require('../controllers/departmentController');


//Department Route
router.get('/all_departments', protect, getAllDepartment);
router.post('/department', protect, createDepartment);
router.get('/department/:id', protect, getDepartmentById);
router.put('/department/:id', protect, updateDepartment);
router.delete('/department/:id', protect, deleteDepartment)

module.exports = router;