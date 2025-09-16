const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Role = require('../models/Role');
const generateSerialId = require('../utils/generateSerialId');

exports.createEmployee = async (req, res) => {
  try {
    const { serialNo, id } = await generateSerialId({
      compid: req.body.compid,
      Model: Employee,
      prefixLetter: "Emp",
    });
    req.body.empid = id;
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ regdate: -1 })

    const employeeDetails = await Promise.all(
      employees.map(async (employee) => {
        const departments = await Department.findById({
          _id: employee?.dpt_id,
        });

        const roles = await Role.findById({
          _id: employee?.role_id,

        });

        return {
          ...employee.toObject(),
          departmentName: departments ? departments?.dept_name : null,
          roleName: roles ? roles?.levelName : null,

        };
      })
    );
    res.status(200).json({ data: employeeDetails })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.status(200).json({ data: employee })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.status(200).json({ data: employee })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.status(200).json({ message: 'Deleted successfully' })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}