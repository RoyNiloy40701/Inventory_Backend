const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  unitName: { type: String, required: true, maxlength: 50 },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)
module.exports = mongoose.model("Unit", unitSchema) 