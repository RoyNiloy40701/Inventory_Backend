const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { getRoleById, createRole, getAllRole, updateRole, deleteRole } = require('../controllers/roleController.js');


//Role route
router.get('/all_role', protect, getAllRole);
router.post('/role', protect, createRole);
router.get('/role/:id', protect, getRoleById);
router.put('/role/:id', protect, updateRole);
router.delete('/role/:id', protect, deleteRole);


module.exports = router;
