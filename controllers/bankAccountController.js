const BankAccount = require('../models/BankAccount');
const Purchase = require('../models/Purchase');
const Sale = require('../models/Sale');

exports.createBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.create(req.body);
    res.status(201).json({ message: "Bank Account Created Successfully", data: { bankAccount } });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.find().sort({ regdate: -1 });
    res.status(200).json({ data: bankAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getBankAccountById = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank Account Not Found" })
    }

    res.status(200).json({ data: bankAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank Account Not Found" })
    }
    res.status(200).json({ data: bankAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findByIdAndDelete(req.params.id);
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank Account Not Found" })
    }
    res.status(200).json({ message: "Bank Account Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getBankTransactions = async (req, res) => {
  try {
    const bankSales = await Sale.find({ accountType: "Bank" });
    const bankPurchases = await Purchase.find({ accountType: "Bank" });


     const salesWithType = bankSales.map(sale => ({
      ...sale.toObject(),
      type: "Sale"
    }));

    const purchasesWithType = bankPurchases.map(purchase => ({
      ...purchase.toObject(),
      type: "Purchase"
    }));

    const combined = [...salesWithType, ...purchasesWithType];
    res.status(200).json({
      data: combined
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// { accountType: "Bank" }
