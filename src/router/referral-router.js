const router = require('express').Router();
const { createReferral, fetchAllReferral, deleteReferral, updateReferral } = require('../controller/referral-controller');
const uploader = require("../utils/cloudFile");


router.post('/create-referral',  uploader.fields([
    {name: "avatarImg", maxCount: 1},
]), createReferral);
router.get('/all-referrals', fetchAllReferral);
router.delete('/delete-referral/:id', deleteReferral);
const upload = require("../utils/cloudFile");
router.put('/update-referral/:id', uploader.fields([
    {name: "avatarImg", maxCount: 1},
]), updateReferral);

module.exports = router;