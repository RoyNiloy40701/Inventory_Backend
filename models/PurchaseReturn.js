const mongoose = require('mongoose');

const purchaseReturnSchema = new mongoose.Schema({
  returnDate: { type: Date, default: null },
  compid: { type: String, default: null },
  sup_id: { type: String, required: true },
  rid: { type: String, default: null, maxlength: 50 },
  invoice: { type: String, required: true, maxlength: 50 },
  totalPrice: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  scharge: { type: String, required: true, maxlength: 50 },
  sctype: { type: String, required: true, maxlength: 50 },
  scAmount: { type: Number, default: null },
  accountType: { type: String, default: null, maxlength: 50 },
  accountNo: { type: String, default: null },
  note: { type: String, default: null, maxlength: 200 },
  status: { type: String, required: true, default: 'Active', enum: ['Active', 'Inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }
)

module.exports = mongoose.model("PurchaseReturn", purchaseReturnSchema)