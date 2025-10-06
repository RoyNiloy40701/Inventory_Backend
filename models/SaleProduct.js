const mongoose = require("mongoose");

const saleProductSchema = new mongoose.Schema(
  {
    saleID: {
     type: String,
      maxlength: 50,
      required: true,
    },
    compid: {
      type: String,
      required: true,
      maxlength: 50,
    },
    productID: { type: String, default: null, maxlength: 50 },
    // pName: {
    //   type: String,
    //   trim: true,
    //   maxlength: 300,
    // },
    sPrice: { type: Number, default: null },
    quantity: { type: Number, default: null },
    totalPrice: { type: Number, default: null },
    regby: { type: String, required: true },
    upby: { type: String, default: null },
    returnQty: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }
);

module.exports = mongoose.model("SaleProduct", saleProductSchema);
