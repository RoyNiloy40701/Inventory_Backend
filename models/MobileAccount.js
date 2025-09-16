const mongoose = require('mongoose');

const mobileAccountSchema = new mongoose.Schema({

  compid: { type: String, required: true, maxlength: 50 },
  accountNo: { type: Number, required: true, maxlength: 50 },
  accountName: { type: String, required: true, maxlength: 50 },
  accountType: { type: String, default: null, maxlength: 50 },
  accountOwner: { type: String, default: null, maxlength: 50 },
  operatorName: { type: String, default: null, maxlength: 50 },
  balance: { type: Number, default: null },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)

module.exports = mongoose.model("MobileAccount", mobileAccountSchema)