const CashAccount = require('../models/CashAccount')

exports.createCashAccount = async (req, res) => {
  try {
    const cashAccount = await CashAccount.create(req.body);
    res.status(201).json({ message: "Cash Account Created Successfully", data: cashAccount });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllCashAccount = async (req, res) => {
  try {
    const cashAccount = await CashAccount.find().sort({ regdate: -1 });
    res.status(200).json({ data: cashAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCashAccountById = async (req, res) => {
  try {
    const cashAccount = await CashAccount.findById(req.params.id);
    if (!cashAccount) {
      return res.status(404).json({ message: "Cash Account Not Found" })
    }
    res.status(200).json({ data: cashAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateCashAccount = async (req, res) => {
  try {
    const cashAccount = await CashAccount.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cashAccount) {
      return res.status(404).json({ message: "Cash Account Not Found" })
    }
    res.status(200).json({ data: cashAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteCashAccount = async (req, res) => {
  try {
    const cashAccount = await CashAccount.findByIdAndDelete(req.params.id);
    if (!cashAccount) {
      return res.status(404).json({ message: "Cash Account Not Found" })
    }
    res.status(200).json({ message: "Cash Account Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}