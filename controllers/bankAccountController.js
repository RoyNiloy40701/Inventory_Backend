const BankAccount = require('../models/BankAccount')

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