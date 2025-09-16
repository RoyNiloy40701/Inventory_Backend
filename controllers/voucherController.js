const Expense = require('../models/Expense');
const ParticularVoucher = require('../models/ParticularVoucher');
const User = require('../models/User');
const Voucher = require('../models/Voucher');
const generateSerialId = require('../utils/generateSerialId');


exports.createVoucher = async (req, res) => {
  try {
    const { serialNo, id } = await generateSerialId({
      compid: req.body.compid,
      Model: Voucher,
      prefixLetter: 'Inv',
    });
    req.body.invoice = id;
    req.body.serialNo = serialNo;
    const voucher = await Voucher.create(req.body)
    res.status(201).json({ message: "Voucher created successfully", data: voucher })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllVoucher = async (req, res) => {
  try {
    const vouchers = await Voucher.find().sort({ regDate: -1 })
    const voucherWithEmp = await Promise.all(
      vouchers.map(async (voucher) => {

        const emp = await User.findOne({
          _id: voucher?.empid,
          compid: voucher?.compid,
        });
        let expense = null;
        if (voucher?.costType) {
          expense = await Expense.findOne({
            _id: voucher.costType,
            compid: voucher?.compid,
          });
        }
        return {
          ...voucher.toObject(),
          expenseName: expense ? expense?.costName : null,
          employeeName: emp ? emp?.name : null,
        };
      })
    );
    res.status(200).json({ data: voucherWithEmp })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id)

    const particularVoucher = await ParticularVoucher.find({ vuid: voucher._id });

    if (!voucher) {
      return res.status(404).json({ message: "Voucher Not Found" })
    }

    const WithVoucher = {
      ...voucher.toObject(),
      voucher: particularVoucher,

    };
    res.status(200).json({ data: WithVoucher })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.updateVoucher = async (req, res) => {
  try {
    const deleteVoucher = await ParticularVoucher.deleteMany({ vuid: req.params.id });

    const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!voucher) {
      return res.status(404).json({ message: "Voucher Not Found" })
    }
    res.status(200).json({ data: voucher })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id)
    if (!voucher) {
      return res.status(404).json({ message: "Voucher Not Found" })
    }
    res.status(200).json({ message: "Voucher Deleted Successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}