const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const SaleProduct = require("../models/SaleProduct");
const Customer = require("../models/Customer");

exports.checkInvoice = async (req, res) => {
  try {
    const { invoice } = req.query; // ?invoice=INV-00002

    if (!invoice) {
      return res.status(400).json({ message: "❌ Invoice number is required" });
    }

    // 🔹 Case-insensitive search
    const sale = await Sale.findOne({
      invoice_no: { $regex: `^${invoice}$`, $options: "i" },
    });

    if (!sale) {
      return res.status(404).json({ message: "❌ Sale not found with this invoice" });
    }

    // 🔹 Get products of this sale
    const saleProducts = await SaleProduct.find({
      saleID: sale._id.toString(), // make sure ID type matches
      compid: sale.compid,
    });

    // 🔹 Get customer safely
    let customer = null;
    if (sale.customerID) {
      // If customerID is ObjectId stored as string
      const customerId = mongoose.Types.ObjectId.isValid(sale.customerID)
        ? new mongoose.Types.ObjectId(sale.customerID)
        : sale.customerID;

      customer = await Customer.findOne({
        _id: customerId,
        compid: sale.compid,
      });
    }

    // 🔹 Combine result
    const responseData = {
      ...sale.toObject(),
      products: saleProducts,
      customerName: customer?.customerName || null,
      cMobile: customer?.mobile || null,
      cAddress: customer?.address || null,
    };

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error("❌ Error fetching sale by invoice:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
