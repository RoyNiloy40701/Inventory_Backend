const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { getAllEmployeePayment, createEmployeePayment, getEmployeePaymentById, updateEmployeePayment, deleteEmployeePayment } = require('../controllers/employeePaymentController.js');



//Employee route
router.get('/all_employeePayment', protect, getAllEmployeePayment);
router.post('/employeePayment', protect, createEmployeePayment);
router.get('/employeePayment/:id', protect, getEmployeePaymentById);
router.put('/employeePayment/:id', protect, updateEmployeePayment);
router.delete('/employeePayment/:id', protect, deleteEmployeePayment);


module.exports = router;