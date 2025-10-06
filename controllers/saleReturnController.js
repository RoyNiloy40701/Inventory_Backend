const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const SaleProduct = require("../models/SaleProduct");
const Customer = require("../models/Customer");
const SaleReturn = require("../models/SaleReturn");
const SaleReturnProduct = require("../models/SaleReturnProduct");


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
      return res
        .status(404)
        .json({ message: "❌ Sale not found with this invoice" });
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

exports.createSaleReturn = async (req, res) => {
  try {
    const {
      compid,
      cust_id,
      invoice,
      returnDate,
      totalPrice,
      paidAmount,
      scharge,
      sctype,
      scAmount,
      accountType,
      accountNo,
      note,
      status,
      regby,
      upby,
    } = req.body;

    // ✅ Validate required fields
    if (
      !compid ||
      !cust_id ||
      !invoice ||
      !returnDate ||
      !totalPrice ||
      paidAmount == null ||
      !regby
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // 🔹 Get last return_invoice number
    const lastReturn = await SaleReturn.findOne({})
      .sort({ return_invoice: -1 }) // sort descending
      .select("return_invoice");

    let nextNumber = 1;

    if (lastReturn && lastReturn.return_invoice) {
      const parts = lastReturn.return_invoice.split("-");
      const numericPart = parseInt(parts[1], 10); // convert to number
      if (!isNaN(numericPart)) {
        nextNumber = numericPart + 1;
      }
    }

    const returnInvoiceId = `SR-${String(nextNumber).padStart(5, "0")}`; // SR-00001

    // ✅ Create SaleReturn document
    const newSaleReturn = new SaleReturn({
      compid,
      cust_id,
      invoice,
      return_invoice: returnInvoiceId, // auto-generated
      returnDate: new Date(returnDate),
      totalPrice,
      paidAmount,
      scharge: scharge || null,
      sctype: sctype || null,
      scAmount: scAmount || null,
      accountType: accountType || null,
      accountNo: accountNo || null,
      note: note || null,
      status: status || "Active",
      regby,
      upby: upby || null,
    });

    const saved = await newSaleReturn.save();

    return res.status(201).json({
      success: true,
      message: "✅ Sale return created successfully",
      _id: saved._id,
      data: saved,
    });
  } catch (error) {
    console.error("❌ Error creating sale return:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getAllSaleReturns = async (req, res) => {
  try {
    const saleReturns = await SaleReturn.find().sort({ regdate: -1 }); // Optional: sort by newest first

    res.status(200).json({
      success: true,
      data: saleReturns,
    });
  } catch (error) {
    console.error("❌ Error fetching sale returns:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteSaleReturn = async (req, res) => {
  const returnId = req.params.id;

  try {
    // Find and delete the sale return
    const saleReturn = await SaleReturn.findByIdAndDelete(returnId);
    if (!saleReturn) {
      return res.status(404).json({ message: "Sale return not found" });
    }

    // Delete all related sale return products
    await SaleReturnProduct.deleteMany({ saleReturnID: returnId });

    res.status(200).json({
      message: "Sale return and its products deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting sale return:", err);
    res.status(500).json({ message: "Server error" });
  }
};
