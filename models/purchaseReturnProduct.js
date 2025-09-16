const mongoose = require("mongoose");

const purchaseReturnProductSchema = new mongoose.Schema(
  {
    purchaseReturnID: {type: String, required: true, maxlength: 50 },
    productID: {type: String, required: true, maxlength: 50 },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, "Price must be positive"],
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, "Subtotal must be positive"],
    },
    maxQty: {
      type: Number,
      default: 0, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseReturnProduct", purchaseReturnProductSchema);
