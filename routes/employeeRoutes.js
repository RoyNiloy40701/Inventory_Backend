const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { getAllEmployee, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController.js');



//Employee route
router.get('/all_employee', protect, getAllEmployee);
router.post('/employee', protect, createEmployee);
router.get('/employee/:id', protect, getEmployeeById);
router.put('/employee/:id', protect, updateEmployee);
router.delete('/employee/:id', protect, deleteEmployee);


module.exports = router;