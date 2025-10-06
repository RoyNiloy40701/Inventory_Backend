const BankTransaction = require('../models/BankTransaction');

exports.createBankTransaction = async (req, res) => {
  try {
    const unit = await BankTransaction.create(req.body)
    res.status(201).json({ message: "BankTransaction Create Successfully", data: { unit } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllBankTransaction = async (req, res) => {
  try {
    const unit = await BankTransaction.find().sort({ regdate: -1 })
    res.status(200).json({ data: unit })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getBankTransactionById = async (req, res) => {
  try {
    const unit = await BankTransaction.findById(req.params.id)
    if (!unit) {
      return res.status(404).json({ message: "BankTransaction Not Found" })
    }
    res.status(200).json({ data: unit })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateBankTransaction = async (req, res) => {
  try {
    const unit = await BankTransaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!unit) {
      return res.status(404).json({ message: "BankTransaction Not Found" })
    }
    res.status(200).json({ data: unit })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteBankTransaction = async (req, res) => {
  try {
    const unit = await BankTransaction.findByIdAndDelete(req.params.id)
    if (!unit) {
      return res.status(404).json({ message: "BankTransaction Not Found" })
    }
    res.status(200).json({ message: "BankTransaction deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}