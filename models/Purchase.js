const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  purchaseDate: { type: Date, default: null },
  challanNo: { type: String, default: null, maxlength: 50 },
  supplier: { type: String, default: null },
  totalPrice: { type: Number, default: null },
  paidAmount: { type: Number, default: null },
  due: { type: Number, required: true },
  accountType: { type: String, default: null, maxlength: 50 },
  accountNo: { type: String, default: null, maxlength: 50 },
  sCompany: { type: String, default: null, maxlength: 200 },
  sName: { type: String, default: null, maxlength: 100 },
  sMobile: { type: String, default: null, maxlength: 50 },
  sAddress: { type: String, default: null, maxlength: 200 },
  note: { type: String, default: null, maxlength: 500 },
  regby: { type: String, required: true },
  upby: { type: String, default: null },
  serialNo: { type: Number, required: true }

},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)

module.exports = mongoose.model("Purchase", purchaseSchema)