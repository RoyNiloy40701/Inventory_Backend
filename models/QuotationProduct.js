const mongoose = require('mongoose');

const quotationProductSchema = new mongoose.Schema({
  qutid: {
    type: String,
    required: true,
    maxlength: 50,
  },
  productID: {
    type: String,
    required: true,
    maxlength: 50,
  },
  pName: {
    type: String,
    //required: true,
    default: null,
    maxlength: 300,
  },
  capacity: {
    type: String,
    default: null,
    maxlength: 300,
  },

  salePrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
    maxlength: 50,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
  regby: {
    type: String,
    required: true,
  },
  upby: {
    type: String,
    default: null,
  },

},

  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

);

module.exports = mongoose.model('QuotationProduct', quotationProductSchema);
