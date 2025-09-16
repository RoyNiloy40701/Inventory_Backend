const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  costName: { type: String, required: true, maxlength: 50 },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)
module.exports = mongoose.model("Expense", expenseSchema) 