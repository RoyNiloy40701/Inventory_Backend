const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    compid: {
      type: String,
      required: true,
      maxlength: 50,
    },

    invoice_no: {
      type: String,
      maxlength: 50,
      default: null,
    },
    saleDate: { type: Date, default: null },
    customerID: {
      type: String,
      maxlength: 50,
      default: null,
    },

    subTotal: { type: Number, default: null },
    totalAmount: { type: Number, default: null },
    paidAmount: { type: Number, default: null },
    pAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    discount: { type: String, default: null, maxlength: 50 },
    discountType: { type: String, default: null, maxlength: 50 },
    discountAmount: { type: Number, default: null },
    mamo: { type: String, default: null, maxlength: 50 },
    scost: { type: Number, default: null },
    vat: { type: Number, default: null },
    vType: { type: String, default:null },
    vAmount: { type: Number, required: true },
    terms: { type: String, default: null },
    accountType: { type: String, default: null, maxlength: 50 },
    accountNo: { type: String, default: null, maxlength: 50 },
    note: { type: String, default: null, },
    sstatus: { type: String, maxlength: 30, default: null },
    ptype: { type: Number, required: true, default: 1 },
    sType: { type: Number, required: true, default: 1 },
    status: { type: Number, required: true, default: 1 },
    notification: { type: Number, required: true, default: 1 },
    serialNo: { type: Number, required: true },
    regby: { type: String, required: true },
    upby: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "regdate", updatedAt: "update" },
  }
);

module.exports = mongoose.model("Sale", saleSchema);
