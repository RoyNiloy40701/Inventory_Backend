const { getAccountModel } = require("../helper/AccountHelper");
const Employee = require("../models/Employee");
const EmployeePayment = require("../models/EmployeePayment");
const Role = require("../models/Role");
const generateSerialId = require("../utils/generateSerialId");

exports.createEmployeePayment = async (req, res) => {
  try {
    const employee = await EmployeePayment.create(req.body);

    if (req.body.accountType && req.body.accountNo  && req.body.status==="paid") {
          await getAccountModel(req.body.accountType).findByIdAndUpdate(
            req.body.accountNo,
            { $inc: { balance: -req.body.payAmount } }
          );
        }
    res.status(201).json({ data: employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEmployeePayment = async (req, res) => {
  try {
    const employeePayment = await EmployeePayment.find().sort({ regdate: -1 });

    const employeeDetails = await Promise.all(
      employeePayment.map(async (ep) => {
        const employee = await Employee.findById({
          _id: ep?.empid,
        });
        const roles = await Role.findById({
          _id: employee?.role_id,
        });

        return {
          ...ep.toObject(),
          position: roles ? roles?.levelName : null,
          employeeName: employee ? employee?.employeeName : null,
        };
      })
    );
    res.status(200).json({ data: employeeDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeePaymentById = async (req, res) => {
  try {
    const employee = await EmployeePayment.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Payment not found" });
    }
    res.status(200).json({ data: employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployeePayment = async (req, res) => {
  try {

    const existingPayment = await EmployeePayment.findById(req.params.id);
    if (!existingPayment) {
      return res.status(404).json({ message: "Employee Payment not found" });
    }
    const employee = await EmployeePayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (req.body.accountType && req.body.accountNo  && req.body.status==="paid") {
        const paidDifference = req.body.payAmount - (existingPayment.payAmount || 0);
        if (paidDifference !== 0) {
          await getAccountModel(req.body.accountType).findByIdAndUpdate(
            req.body.accountNo,
            { $inc: { balance: -paidDifference } }
          );
        }
    }
    res.status(200).json({ data: employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployeePayment = async (req, res) => {
  try {
    const employee = await EmployeePayment.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Payment not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
