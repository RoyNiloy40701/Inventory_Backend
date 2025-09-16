const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json({ message: "Category Created successfully", data: category })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find().sort({ regdate: -1 })
    res.status(200).json({ data: category })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" })
    }
    res.status(200).json({ data: category })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" })
    }
    res.status(200).json({ data: category })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" })
    }
    res.status(200).json({ message: "Category deleted successfully" })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}