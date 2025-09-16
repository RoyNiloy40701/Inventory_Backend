//sale controller
const Customer = require("../models/Customer");

const Sale = require("../models/Sale");
const SaleProduct = require("../models/SaleProduct");
const generateSerialId = require("../utils/generateSerialId");
const { default: mongoose } = require("mongoose");
const { getAccountModel } = require("../helper/AccountHelper");
const Product = require("../models/product");

exports.getAllSale = async (req, res) => {
  try {
    // Get all sales, sorted by regDate descending
    const sales = await Sale.find().sort({ regdate: -1 });

    // Map through each sale and attach its products
    const purchasesWithProducts = await Promise.all(
      sales.map(async (sale) => {
        const purchaseProducts = await SaleProduct.find({
          saleID: sale._id,
        });

        const productsWithName = await Promise.all(
          purchaseProducts.map(async (p) => {
            const prod = await Product.findById(p.productID);
            return {
              ...p.toObject(),
              productName: prod ? prod?.productName : null,
              singlePurchasePrice: prod ? prod?.pprice : null,
            };
          })
        );

        const totalPurchasePrice = productsWithName.reduce((acc, p) => {
          return acc + (p.singlePurchasePrice || 0) * (p.quantity || 1);
        }, 0);

        const customer = await Customer.findOne({
          _id: sale.customerID,
          compid: sale.compid,
        });

        return {
          ...sale.toObject(),
          products: productsWithName,
          totalPurchasePrice,
          customerName: customer ? customer?.customerName : null,
          cMobile: customer ? customer?.mobile : null,
          cAddress: customer ? customer?.address : null,
        };
      })
    );

    res.status(200).json({ data: purchasesWithProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllSaleProductWise = async (req, res) => {
  try {
    const { reportType, startDate, endDate, month, year } = req.query;

    let start, end;

    if (reportType === "daily" && startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else if (reportType === "monthly" && month && year) {
      start = new Date(year, month - 1, 1);
      end = new Date(year, month, 0, 23, 59, 59);
    } else if (reportType === "yearly" && year) {
      start = new Date(year, 0, 1);
      end = new Date(year, 11, 31, 23, 59, 59);
    } else {
      // Default = today
      start = new Date();
      start.setHours(0, 0, 0, 0);
      end = new Date();
      end.setHours(23, 59, 59, 999);
    }

    const products = await Product.find();

    let grandTotalQty = 0;
    let grandTotalSaleAmount = 0;
    let grandTotalPurchaseAmount = 0;

    const productWithSales = await Promise.all(
      products.map(async (prod) => {
        // Find all sale products for this product in the date range
        const saleProducts = await SaleProduct.find({ productID: prod._id }).populate({
          path: "saleID",
          match: { regdate: { $gte: start, $lte: end } },
        });

        const filteredSaleProducts = saleProducts.filter(sp => sp.saleID);

        const totalQty = filteredSaleProducts.reduce(
          (acc, sp) => acc + (sp.quantity || 0),
          0
        );

        const totalSaleAmount = filteredSaleProducts.reduce(
          (acc, sp) => acc + (sp.quantity || 0) * (sp.salePrice || 0),
          0
        );

        const totalPurchaseAmount = filteredSaleProducts.reduce(
          (acc, sp) => acc + (sp.quantity || 0) * (prod.pprice || 0),
          0
        );

        grandTotalQty += totalQty;
        grandTotalSaleAmount += totalSaleAmount;
        grandTotalPurchaseAmount += totalPurchaseAmount;

        return {
          productId: prod._id,
          productName: prod.productName,
          pprice: prod.pprice,
          sprice: prod.sprice,
          totalQtySold: totalQty,
          totalSaleAmount: totalSaleAmount,
          totalPurchaseAmount: totalPurchaseAmount,
        };
      })
    );

    // Sort products by totalSaleAmount descending
    productWithSales.sort((a, b) => b.totalSaleAmount - a.totalSaleAmount);

    res.status(200).json({
      data: productWithSales,
      totals: {
        grandTotalQty,
        grandTotalSaleAmount,
        grandTotalPurchaseAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createSale = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { compid, accountType, accountNo, paidAmount } = req.body;
    const { serialNo, id } = await generateSerialId({
      compid: req.body.compid,
      Model: Sale,
      prefixLetter: "Inv",
    });
    req.body.invoice_no = id;
    req.body.serialNo = serialNo;
    const [sale] = await Sale.create([req.body], { session });

    const accountModel = getAccountModel(accountType);

    // 5️Add money to account (since sale means income)
    const updatedAccount = await accountModel.findByIdAndUpdate(
      accountNo,
      { $inc: { balance: paidAmount } },
      { new: true, session }
    );

    //  Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Sale created successfully",
      data: sale,
      updatedAccountBalance: updatedAccount.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale Not Found" });
    }
    const saleProduct = await SaleProduct.find({
      saleID: sale._id,
      compid: sale.compid,
    });
    const customer = await Customer.findOne({
      _id: sale.customerID,
      compid: sale.compid,
    });
    const saleWithProducts = {
      ...sale.toObject(),
      products: saleProduct,
      customerName: customer ? customer?.customerName : null,
      cMobile: customer ? customer?.mobile : null,
      cAddress: customer ? customer?.address : null,
    };

    res.status(200).json({ data: saleWithProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSale = async (req, res) => {
  const saleId = req.params.id;

  try {
    const sale = await Sale.findByIdAndDelete(saleId);
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    await SaleProduct.deleteMany({ saleID: saleId });
    res.status(200).json({
      message: "Sale and its products deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting sale:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const deleteProduct = await SaleProduct.deleteMany({
      saleID: req.params.id,
      compid: req.body.compid,
    });

    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sale) {
      return res.status(404).json({ message: "Sale Not Found" });
    }

    if (req.body.accountType && req.body.accountNo) {
      await getAccountModel(req.body.accountType).findByIdAndUpdate(
        req.body.accountNo,
        { $inc: { balance: req.body.amount } }
      );
    }
    res.status(200).json({ data: sale, message: "Sale updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
