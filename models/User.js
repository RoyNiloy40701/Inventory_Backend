const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  compid: { type: String, required: true },
  empid: { type: Number, required: true, default: 0 },
  name: { type: String, required: true, maxlength: 50 },
  compname: { type: String, default: null, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100 },
  mobile: { type: String, required: true, maxlength: 15 },
  password: { type: String, required: true, maxlength: 100 },
  userrole: { type: Number, required: true, default: 2 },
  photo: { type: String, default: null, maxlength: 100 },
  status: { type: String, required: true, default: 'Active', enum: ['Active', 'Inactive'] },
  otp: { type: String, default: null, maxlength: 6 },
  regby: { type: Number, default: null },
  upby: { type: Number, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }


  })
module.exports = mongoose.model("User", userSchema)