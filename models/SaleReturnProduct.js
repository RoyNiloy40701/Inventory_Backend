const saleReturnProductSchema = new mongoose.Schema(
  {
    saleReturnID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleReturn",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: [0, "Quantity cannot be negative"] },
    unitPrice: { type: Number, required: true, min: [0, "Unit price must be positive"] },
    subtotal: { type: Number, required: true, min: [0, "Subtotal must be positive"] },
    maxQty: { type: Number, default: 0 },
    regby: { type: String, required: true },
    upby: { type: String, default: null },
  },
  { timestamps: { createdAt: 'regdate', updatedAt: 'update' } }
);

module.exports = mongoose.model("SaleReturnProduct", saleReturnProductSchema);