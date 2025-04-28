const router = require('express').Router();
const { createNotification, fetchAllNotification, deleteNotification, updateNotification } = require('../controller/notification-controller');

router.post('/create-notification', createNotification);
router.get('/all-notification', fetchAllNotification);
router.delete('/delete-notification/:id', deleteNotification);
router.put('/update-notification/:id', updateNotification);

module.exports = router;