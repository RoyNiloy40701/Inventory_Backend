const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  categoryName: { type: String, default: null, maxlength: 50 },
  fpshow: { type: Number, required: true },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)
module.exports = mongoose.model("Category", categorySchema) 