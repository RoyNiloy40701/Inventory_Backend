const Department = require('../models/Department');


exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ message: "Department created successfully", data: department });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllDepartment = async (req, res) => {
  try {
    const department = await Department.find().sort({ regdate: -1 });
    res.status(200).json({ data: department })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department Nod Found" })
    }
    res.status(200).json({ data: department })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!department) {
      return res.status(404).json({ message: "Department Nod Found" })
    }
    res.status(200).json({ data: department })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department Nod Found" })
    }
    res.status(200).json({ message: "Department deleted successfully" })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}