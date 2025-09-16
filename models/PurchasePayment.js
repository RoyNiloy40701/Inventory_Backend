const mongoose = require('mongoose');

const purchasePaymentSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  purchaseID: { type: String, required: true, maxlength: 50 },
  amount: { type: Number, required: true },
  regby: { type: String, required: true },
  accountType: { type: String, default: null, maxlength: 50 },
  accountNo: { type: String, default: null, maxlength: 50 },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)

module.exports = mongoose.model("PurchasePayment", purchasePaymentSchema)