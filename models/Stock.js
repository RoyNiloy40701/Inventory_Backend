const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  compid: { type: String, required: true, maxlength: 30 },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  totalPices: { type: Number, default: 0 },
  dtquantity: { type: Number, default: null },
  regby: { type: String, required: true },
  upby: { type: String, default: null }
},
  {
    timestamps: { createdAt: 'regdate', updatedAt: 'update' }
  }
)

module.exports = mongoose.model("Stock", stockSchema);
