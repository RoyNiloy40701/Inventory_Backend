const mongoose = require('mongoose');

const cashAccountSchema = new mongoose.Schema({

  compid: { type: String, required: true, maxlength: 50 },
  accountName: { type: String, required: true, maxlength: 50 },
  balance: { type: Number, default: null },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)

module.exports = mongoose.model("CashAccount", cashAccountSchema)