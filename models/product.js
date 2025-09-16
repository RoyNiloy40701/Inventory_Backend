// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  productName: { type: String, required: true, maxlength: 50 },
  productcode: { type: String, maxlength: 30, default: null },
  categoryID: { type: String, default: null },
  supplier: { type: String, required: true },
  scid: { type: Number, default: null },
  unit: { type: String, default: null },
  pprice: { type: Number, required: true },
  sprice: { type: Number, default: null },
  warranty: { type: String, maxlength: 50, default: null },
  status: { type: String, maxlength: 10, required: true, default: 'Active' },
  image: { type: String, maxlength: 500, default: null },
  fpshow: { type: Number, default: 0 },
  regby: { type: String, default: null, },
  regdate: { type: Date, required: true, default: Date.now },
  upby: { type: String, default: null },
  update: { type: Date, required: true, default: Date.now }
});

productSchema.pre('findOneAndUpdate', function (next) {
  this.set({ update: new Date() });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
