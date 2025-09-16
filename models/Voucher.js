const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  invoice: { type: String, required: true, maxlength: 100 },
  voucherDate: { type: Date, required: true },
  compid: { type: String, required: true, maxlength: 100 },
  customerID: { type: String, default:null, maxlength: 100 },
  empid: { type: String, required: true, maxlength: 100 },
  costType: { type: String, default: null },
  supplier: { type: String, default: null },
  voucherType: { type: String, required: true, maxlength: 50 },
  reference: { type: String, default: null, maxlength: 100 },
  totalAmount: { type: Number, default: null },
  accountType: { type: String, default: null, maxlength: 50 },
  accountNo: { type: String, default: null },
  status: { type: String, required: true, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null },
  serialNo: { type: Number, required: true }
}, {
  timestamps: { createdAt: 'regdate', updatedAt: 'update' }
});

module.exports = mongoose.model("Voucher", voucherSchema);
