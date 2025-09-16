const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  cus_id: { type: String, unique: true, maxlength: 50 },
  customerName: { type: String, default: null, maxlength: 50 },
  address: { type: String, default: null, maxlength: 200 },
  mobile: { type: String, default: null, maxlength: 14 },
  email: { type: String, default: null, maxlength: 50 },
  balance: { type: Number, default: null },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null },
  serialNo: { type: Number, required: true }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }


  })


module.exports = mongoose.model("Customer", customerSchema);