const Unit = require('../models/Unit');

exports.createUnit = async (req, res) => {
  try {
    const unit = await Unit.create(req.body)
    res.status(201).json({ message: "Unit Create Successfully", data: { unit } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllUnit = async (req, res) => {
  try {
    const unit = await Unit.find().sort({ regdate: -1 })
    res.status(200).json({ data: unit })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id)
    if (!unit) {
      return res.status(404).json({ message: "Unit Not Found" })
    }
    res.status(200).json({ data: unit })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!unit) {
      return res.status(404).json({ message: "Unit Not Found" })
    }
    res.status(200).json({ data: unit })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id)
    if (!unit) {
      return res.status(404).json({ message: "Unit Not Found" })
    }
    res.status(200).json({ message: "Unit deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}