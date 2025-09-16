const SalePayment = require("../models/SalePayment");
const Sale = require("../models/Sale");
const Customer = require("../models/Customer");

exports.createSalePayment = async (req, res) => {
  try {
    const { saleID, amount, accountType, accountNo, compid, regby } = req.body;

    const salePayment = await SalePayment.create(req.body);

    const payments = await SalePayment.find({ saleID });
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    // const sale = await Sale.findById(purchaseID);
    const sale = await Sale.findOne({ _id: saleID, compid });
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    const due = sale.totalPrice - totalPaid;
    sale.paidAmount = totalPaid;
    sale.due = due;
    sale.upby = regby;

    await sale.save();

    res.status(201).json({
      message: "Sale Payment created successfully",
      data: salePayment,
      updatedSale: sale,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.getAllSalePayment = async (req, res) => {
  try {
    const salePayments = await SalePayment.find().sort({ regdate: -1 });

    const SaleDetails = await Promise.all(
      salePayments.map(async (payment) => {
        const sale = await Sale.findById(payment.saleID).select("invoice_no customerID");

        let customer = null;
        if (sale?.customerID) {
          customer = await Customer.findById(sale.customerID).select("customerName mobile address");
        }

        return {
          ...payment.toObject(),
          invoice_No: sale ? sale.invoice_no : null, 
          customerName: customer ? customer.customerName : null,
          cMobile: customer ? customer.mobile : null,
          cAddress: customer ? customer.address : null,
        };
      })
    );

    res.status(200).json({ data: SaleDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSalePaymentById = async (req, res) => {
  try {
    const salePayment = await SalePayment.findById(req.params.id);
    if (!salePayment) {
      return res.status(404).json({ message: "Sale Payment Not Found" });
    }
    res.status(200).json({ data: salePayment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateSalePayment = async (req, res) => {
  try {
    const salePayment = await SalePayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!salePayment) {
      return res.status(404).json({ message: "Sale Payment Not Found" });
    }
    res.status(200).json({ data: salePayment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSalePayment = async (req, res) => {
  try {
    const salePayment = await SalePayment.findByIdAndDelete(req.params.id);
    if (!salePayment) {
      return res.status(404).json({ message: "Sale Payment Not Found" });
    }
    res.status(200).json({ message: "Sale Payment Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
