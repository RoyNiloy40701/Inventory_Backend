const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  compid: {
    type: String,
    required: true,
    maxlength: 50,
  },
  qinvoice: {
    type: String,
    required: true,
    maxlength: 50,
  },
  quotationDate: {
    type: Date,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: String,
    required: true,
    maxlength: 50,
  },
  message: {
    type: String,
    default: null,
  },
  terms: {
    type: String,
    default: null,
  },
  sMobile: {
    type: String,
    maxlength: 50,
    default: null,
  },
  sAddress: {
    type: String,
    maxlength: 200,
    default: null,
  },
  note: {
    type: String,
    default: null,
  },
  regby: {
    type: String,
    required: true,
  },

  upby: {
    type: String,
    default: null,
  }, serialNo: { type: Number, required: true },

},

  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

);


module.exports = mongoose.model('Quotation', quotationSchema);
