const Salary = require("../models/Salary")

// Get all salary records
exports.getAllSalary = async (req, res) => {
  try {
    const salaries = await Salary.find().sort({ regdate: -1 });
    if (salaries.length === 0) {
      return res.status(404).json({ message: "No salary records found" });
    }
    res.status(200).json({data:salaries});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new salary record
exports.addSalary = async (req, res) => {
  try {
    await Salary.deleteMany({});
    const salary = await Salary.create(req.body);
    res.status(201).json({data:salary});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get salary record by ID
exports.getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSalary = async (req, res) => {
    try {
        const salary = await Salary.findByIdAndDelete(req.params.id);
        if (!salary) {
        return res.status(404).json({ message: "Salary record not found" });
        }
        res.status(200).json({ message: "Salary record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}