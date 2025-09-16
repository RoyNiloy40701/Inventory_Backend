const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

  compid: { type: String, required: true, maxlength: 50 },
  levelName: { type: String, required: true, maxlength: 50 },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }

  })
module.exports = mongoose.model("Role", roleSchema)