const Expense = require('../models/Expense')

exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body)
    res.status(201).json({ message: "Expense created successfully", data: expense })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

exports.getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.find().sort({ regdate: -1 })
    res.status(200).json({ data: expense })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    res.status(200).json({ data: expense })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    res.status(200).json({ data: expense })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id)
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    res.status(200).json({ message: "Expense deleted successfully" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}