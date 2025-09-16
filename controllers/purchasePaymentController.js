const PurchasePayment = require('../models/PurchasePayment');
const Purchase = require('../models/Purchase');

exports.createPurchasePayment = async (req, res) => {
  try {
    const { purchaseID, amount, accountType, accountNo, compid, regby } = req.body;

    const purchasePayment = await PurchasePayment.create(req.body)

    const payments = await PurchasePayment.find({ purchaseID });
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    // const purchase = await Purchase.findById(purchaseID);
    const purchase = await Purchase.findOne({ _id: purchaseID, compid });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    const due = purchase.totalPrice - totalPaid;
    purchase.paidAmount = totalPaid;
    purchase.due = due;
    purchase.upby = regby;

    await purchase.save();

    res.status(201).json({ message: "Purchase Payment created successfully", data: purchasePayment, updatedPurchase: purchase, })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllPurchasePayment = async (req, res) => {
  try {
    const purchasePayment = await PurchasePayment.find().sort({ regDate: -1 })
    res.status(200).json({ data: purchasePayment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPurchasePaymentById = async (req, res) => {
  try {
    const purchasePayment = await PurchasePayment.findById(req.params.id)
    if (!purchasePayment) {
      return res.status(404).json({ message: "Purchase Payment Not Found" })
    }
    res.status(200).json({ data: purchasePayment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.updatePurchasePayment = async (req, res) => {
  try {
    const purchasePayment = await PurchasePayment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!purchasePayment) {
      return res.status(404).json({ message: "Purchase Payment Not Found" })
    }
    res.status(200).json({ data: purchasePayment })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deletePurchasePayment = async (req, res) => {
  try {
    const purchasePayment = await PurchasePayment.findByIdAndDelete(req.params.id)
    if (!purchasePayment) {
      return res.status(404).json({ message: "Purchase Payment Not Found" })
    }
    res.status(200).json({ message: "Purchase Payment Deleted Successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}