const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  com_name: { type: String, required: true, maxlength: 50 },
  com_address: { type: String, required: true, maxlength: 250 },
  com_mobile: { type: String, required: true, maxlength: 50 },
  com_email: { type: String, default: null, maxlength: 250 },
  com_web: { type: String, default: null, maxlength: 200 },
  com_fab: { type: String, default: null, maxlength: 250 },
  com_vat: { type: String, default: null, maxlength: 100 },
  com_logo: { type: String, default: null, maxlength: 100 },
  com_balance: { type: Number, default: null },
  com_bimg: { type: String, default: null, maxlength: 100 },
  com_simg: { type: String, default: null, maxlength: 100 },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

);
module.exports = mongoose.model("Company", companySchema);