const mongoose = require("mongoose");

const employeePaymentSchema = new mongoose.Schema(
  {
    compid: { type: String, default: null, maxlength: 50 },
    empid: { type: String, required: true, maxlength: 50 },
    date: { type: String, required: true },
    basicSalary: { type: Number, required: true, maxlength: 50 },
    presentDay: { type: Number, required: true, maxlength: 50 },
    workingDay: { type: Number, required: true, maxlength: 50 },
    otHours: { type: Number, default:null, maxlength: 50 },
    otRate: { type: Number, default:null, maxlength: 50 },
    totalSalary: { type: Number, required:true, maxlength: 50 },
    // transportAmount: { type: Number, default: null, maxlength: 50 },
    // hrAmount: { type: Number, default: null, maxlength: 50 },
    // medicalAmount: { type: Number, default: null, maxlength: 50 },
    // pfAmount: { type: Number, default: null, maxlength: 50 },
    // festivaBonus: { type: Number, default: null, maxlength: 50 },
    // foodAllowance: { type: Number, default: null, maxlength: 50 },
    // mallowance: { type: Number, default: null, maxlength: 50 },

     allowances: [
      {
        type: {
          type: String, // e.g., "Transport", "Medical", "Food"
          required: true,
          maxlength: 50,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
     deductions: [
      {
        type: {
          type: String, // deduction type, e.g., "loan", "tax", "late fine"
          required: true,
          maxlength: 50,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalOTAmount: { type: Number, required: true, maxlength: 50 },
    totalAllowanceAmount: { type: Number, required: true, maxlength: 50 },
    totalDeductionAmount: { type: Number, required: true, maxlength: 50 },
    payAmount: { type: Number, required: true, maxlength: 50 },
    accountType: { type: String, required: true, maxlength: 50 },
    accountNo: { type: String, required: true, maxlength: 50 },
    note: { type: String, required: true, maxlength: 50 },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "paid"],
    },
    regby: { type: String, required: true, default: null },
    upby: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "regdate", updatedAt: "update" },
  }
);
module.exports = mongoose.model("EmployeePayment", employeePaymentSchema);
