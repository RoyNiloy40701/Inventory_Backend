const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body)
    res.status(201).json({ message: "Company created successfully", data: company })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllCompany = async (req, res) => {
  try {
    const company = await Company.find().sort({ regdate: -1 })
    res.status(200).json({ data: company })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" })
    res.status(200).json({ data: company })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!company) return res.status(404).json({ message: "Company not found" })
    res.status(200).json({ data: company })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id)
    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }
    res.status(200).json({ message: "Company deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}