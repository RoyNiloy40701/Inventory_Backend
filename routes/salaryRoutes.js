//salary routes

const express = require('express');
const router = express.Router();    
const {getAllSalary, addSalary, getSalaryById,deleteSalary} = require('../controllers/salaryController');
const { protect } = require('../middlewares/authMiddleware.js');

router.get('/all_salary', protect,getAllSalary);
router.post('/salary/add', protect,addSalary); 
router.get('/salary/:id',protect, getSalaryById); 
router.delete('/salary/:id',protect, deleteSalary); 

module.exports = router;