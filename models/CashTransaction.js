const mongoose = require("mongoose");

const cashTransactionSchema = new mongoose.Schema({
  cashID: { type: String, maxlength: 50,required: true },
  amount: { type: Number, required: true },
  type: { type: String, default: null, maxlength: 50 },
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

module.exports = mongoose.model("CashTransaction", cashTransactionSchema);
