const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true},
  empid: { type: String, default: null, maxlength: 50 },
  dpt_id: { type: String, default: null },
  role_id: { type: String, default: null },
  employeeName: { type: String, default: null, maxlength: 50 },
  empaddress: { type: String, default: null, maxlength: 100 },
  phone: { type: String, default: null, maxlength: 14 },
  email: { type: String, default: null, maxlength: 50 },
  joiningDate: { type: Date, default: null },
  salary: { type: Number, default: null },
  nid: { type: String, default: null, maxlength: 20 },
  status: { type: String, required: true, default: 'active', enum: ['active', 'inactive'] },
  regby: { type: String, required: true, default: null },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }


  })
module.exports = mongoose.model("Employee", employeeSchema);