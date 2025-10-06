const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    compid: {
        type: String,
        required: true,
        maxlength: 20
    },
    compname: {
        type: String,
        maxlength: 100,
        default: null,
    },
    mobile: {
        type: String,
        maxlength: 15,
        default: null,
    },
    email: {
        type: String,
        maxlength: 100,
        default: null,
    },
    address: {
        type: String,
        maxlength: 100,
        default: null,
    },
    balance: {
        type: Number,
        default: null,
    },
    notes: {
        type: String,
        maxlength: 50,
        default: null,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
        default: 'Active'
    },
    regby: {
        type: Number,
        default: null,
    },
    regdate: {
        type: Date,
        default: Date.now,
    },
    upby: {
        type: Number,
        default: null,
    },
    update: {
        type: Date,
        default: Date.now
    }
}, { timestamps: { createdAt: 'regdate', updatedAt: 'update' } });

module.exports = mongoose.model('Party', partySchema);
