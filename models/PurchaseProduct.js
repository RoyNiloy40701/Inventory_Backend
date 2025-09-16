const mongoose = require('mongoose');

const purchaseProductSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 50 },
  purchaseID: { type: String, default: null, maxlength: 50 },
  productID: { type: String, default: null, maxlength: 50 },
  quantity: { type: Number, default: null },
  productPrice: { type: Number, default: null },
  totalPrice: { type: Number, default: null },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }

)

module.exports = mongoose.model("PurchaseProduct", purchaseProductSchema)