const BankAccount = require("../models/BankAccount");
const CashAccount = require("../models/CashAccount");
const MobileAccount = require("../models/MobileAccount");


function getAccountModel(type) {
  if (type === "Bank") return BankAccount;
  if (type === "Cash") return CashAccount;
  if (type === "Mobile") return MobileAccount;
  throw new Error("Invalid account type");
}

module.exports = { getAccountModel };
