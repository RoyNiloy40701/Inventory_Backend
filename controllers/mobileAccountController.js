const MobileAccount = require('../models/MobileAccount')

exports.createMobileAccount = async (req, res) => {
  try {
    const mobileAccount = await MobileAccount.create(req.body);
    res.status(201).json({ message: "Mobile Account Created Successfully", data: mobileAccount });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllMobileAccount = async (req, res) => {
  try {
    const mobileAccount = await MobileAccount.find().sort({ regdate: -1 });
    res.status(200).json({ data: mobileAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getMobileAccountById = async (req, res) => {
  try {
    const mobileAccount = await MobileAccount.findById(req.params.id);
    if (!mobileAccount) {
      return res.status(404).json({ message: "Mobile Account Not Found" })
    }

    res.status(200).json({ data: mobileAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateMobileAccount = async (req, res) => {
  try {
    const mobileAccount = await MobileAccount.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!mobileAccount) {
      return res.status(404).json({ message: "Mobile Account Not Found" })
    }
    res.status(200).json({ data: mobileAccount });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteMobileAccount = async (req, res) => {
  try {
    const mobileAccount = await MobileAccount.findByIdAndDelete(req.params.id);
    if (!mobileAccount) {
      return res.status(404).json({ message: "Mobile Account Not Found" })
    }
    res.status(200).json({ message: "Mobile Account Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}