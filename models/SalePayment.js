const mongoose = require("mongoose");

const salesPaymentSchema = new mongoose.Schema({
  saleID: { type: String, maxlength: 50,required: true },
  amount: { type: Number, required: true },
  accountType: { type: String, default: null, maxlength: 50 },
  accountNo: { type: String, default: null, maxlength: 50 },
  regby: { type: String,  required: true },
  compid: {
    type: String,
    required: true,
    maxlength: 50,
  },

}
  ,
  {
    timestamps: { createdAt: 'regdate' }
  }


);

module.exports = mongoose.model("SalePayment", salesPaymentSchema);
