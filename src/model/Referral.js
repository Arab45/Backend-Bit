const mongoose = require('mongoose');
const Schema = mongoose.Schema

const referralSchema = new Schema({
    avatarImg: {
        type: String,
        required: true
    },
    avatarImgId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Referral', referralSchema);