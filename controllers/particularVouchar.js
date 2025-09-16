const ParticularVoucher = require('../models/ParticularVoucher');


exports.createParticularVoucher = async (req, res) => {
  try {
    const particularVoucher = await ParticularVoucher.create(req.body)
    res.status(201).json({ message: " Particular Voucher created successfully", data: particularVoucher })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllParticularVoucher = async (req, res) => {
  try {
    const particularVoucher = await ParticularVoucher.find().sort({ regDate: -1 })
    res.status(200).json({ data: particularVoucher })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getParticularVoucherById = async (req, res) => {
  try {
    const particularVoucher = await ParticularVoucher.findById(req.params.id)
    if (!particularVoucher) {
      return res.status(404).json({ message: " Particular Voucher Not Found" })
    }
    res.status(200).json({ data: particularVoucher })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.updateParticularVoucher = async (req, res) => {
  try {
    const particularVoucher = await ParticularVoucher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!particularVoucher) {
      return res.status(404).json({ message: " Particular Voucher Not Found" })
    }
    res.status(200).json({ data: particularVoucher })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteParticularVoucher = async (req, res) => {
  try {
    const particularVoucher = await ParticularVoucher.findByIdAndDelete(req.params.id)
    if (!particularVoucher) {
      return res.status(404).json({ message: " Particular Voucher Not Found" })
    }
    res.status(200).json({ message: "Particular Voucher Deleted Successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}