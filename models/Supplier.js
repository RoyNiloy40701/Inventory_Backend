const mongoose = require('mongoose');


const supplierSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  sup_id: { type: String, default: null, maxlength: 20 },
  supplierName: { type: String, default: null, maxlength: 50 },
  compName: { type: String, default: null, maxlength: 100 },
  mobile: { type: String, default: null, maxlength: 20 },
  email: { type: String, default: null, maxlength: 100 },
  address: { type: String, default: null, maxlength: 100 },
  notes: { type: String, default: null, maxlength: 50 },
  balance: { type: Number, default: null },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true, default: null },
  upby: { type: String, default: null },
  serialNo: { type: Number, required: true }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }


  })

module.exports = mongoose.model("Supplier", supplierSchema);