const express = require('express');
const router = express.Router();
const {getAllParties,addParty,getPartyById,updateParty,deleteParty} = require('../controllers/partyController');


router.get('/', getAllParties);
router.post('/',addParty);
router.get('/:id', getPartyById);
router.put('/:id', updateParty);
router.delete('/:id', deleteParty);

module.exports = router;