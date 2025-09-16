const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { getAllCompany, createCompany, getCompanyById, updateCompany, deleteCompany } = require('../controllers/companyController.js');



//Company route
router.get('/all_company', protect, getAllCompany);
router.post('/company', protect, createCompany);
router.get('/company/:id', protect, getCompanyById);
router.put('/company/:id', protect, updateCompany);
router.delete('/company/:id', protect, deleteCompany);


module.exports = router;