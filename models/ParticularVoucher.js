const mongoose = require('mongoose');

const particularVoucherSchema = new mongoose.Schema({

  vuid: { type: String, required: true, maxlength: 100 },
  particularName: { type: String, required: true, maxlength: 500 },
  amount: { type: Number, required: true },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
}, {
  timestamps: { createdAt: 'regdate', updatedAt: 'update' }
});

module.exports = mongoose.model("ParticularVoucher", particularVoucherSchema);
