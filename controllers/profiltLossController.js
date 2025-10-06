const BankAccount = require('../models/BankAccount');
const CashAccount = require('../models/CashAccount');
const MobileAccount = require('../models/MobileAccount');
const Unit = require('../models/Unit');

exports.createUnit = async (req, res) => {
  try {
    const unit = await Unit.create(req.body)
    res.status(201).json({ message: "Unit Create Successfully", data: { unit } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getDailyProfitLoss = async (req, res) => {
  try {
    // 🔹 Get start of today (00:00:00) to filter "before today"
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 🔹 Run all three queries in parallel
    const [bankData, mobileData, cashData] = await Promise.all([
      BankAccount.find({ regdate: { $lt: today } }).sort({ regdate: -1 }),
      MobileAccount.find({ regdate: { $lt: today } }).sort({ regdate: -1 }),
      CashAccount.find({ regdate: { $lt: today } }).sort({ regdate: -1 })
    ]);

    // 🔹 Calculate subtotals for each account type
    const bankTotal   = bankData.reduce((sum, item) => sum + (item.balance || 0), 0);
    const mobileTotal = mobileData.reduce((sum, item) => sum + (item.balance || 0), 0);
    const cashTotal   = cashData.reduce((sum, item) => sum + (item.balance || 0), 0);

    

    res.status(200).json({
      bank: {
        records: bankData,
        subtotal: bankTotal
      },
      mobile: {
        records: mobileData,
        subtotal: mobileTotal
      },
      cash: {
        records: cashData,
        subtotal: cashTotal
      },
      
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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