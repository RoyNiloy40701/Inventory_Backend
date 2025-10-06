const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getDailyProfitLoss } = require('../controllers/profiltLossController');


//Department Route
router.get('/profit', getDailyProfitLoss);


module.exports = router;