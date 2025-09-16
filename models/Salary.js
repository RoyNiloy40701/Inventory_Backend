const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  basic: {
    type: String,
    required: true,
    maxlength: 10
  },
  hrent: {
    type: String,
    required: true,
    maxlength: 10
  },
  medical: {
    type: String,
    required: true,
    maxlength: 10
  },
  transport: {
    type: String,
    required: true,
    maxlength: 10
  },
  childAl: {
    type: String,
   default:null,
    maxlength: 10
  },
  cl: {
    type: String,
    maxlength: 10,
    default:null
  },
  el: {
    type: String,
    default:null,
    maxlength: 10
  },
  ml: {
    type: String,
    default:null,
    maxlength: 10
  },
  regby: {
    type: String,
    required: true
  },
  upby: {
    type: String,
    default: null
  },
  
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }
);

module.exports = mongoose.model('Salary', salarySchema);
