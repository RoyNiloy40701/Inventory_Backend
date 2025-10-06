const mongoose = require("mongoose");

const transferAccountSchema = new mongoose.Schema(
  {
    facType: { type: String, required: true, maxlength: 50 },
    facACno: { type: String, required: true, maxlength: 50 },
    sacType: { type: String, required: true, maxlength: 50 },
    sacACno: { type: String, required: true, maxlength: 50 },
    date: { type: Date, default: null },
    amount: { type: Number, required: true },
    note: { type: String, default: null },
    regby: { type: String, required: true },
    upby: { type: String, default: null },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "completed","cancelled"],
    },
  },
  {
    timestamps: { createdAt: "regdate", updatedAt: "update" },
  }
);

module.exports = mongoose.model("TransferAccount", transferAccountSchema);
