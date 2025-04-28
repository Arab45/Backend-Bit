const router = require('express').Router();
const { createReferral, fetchAllReferral, deleteReferral, updateReferral } = require('../controller/referral-controller');

router.post('/create-referral', createReferral);
router.get('/all-referrals', fetchAllReferral);
router.delete('/delete-referral/:id', deleteReferral);
router.put('/update-referral/:id', updateReferral);

module.exports = router;