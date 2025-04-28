const mongoose = require('mongoose');
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    accoutObject: {
        account: {
            type: String,
        },
        device: {
            type: String,
        },
        time: {
            type: String,
        },
        IP_Address: {
            type: String,
        }, 
    },
    creatAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Notification', notificationSchema);