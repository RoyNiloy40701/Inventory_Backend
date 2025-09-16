const Purchase = require("../models/Purchase");
const PurchaseReturn = require("../models/PurchaseReturn");
const Supplier = require("../models/Supplier");
const Voucher = require("../models/Voucher");
const generateSerialId = require("../utils/generateSerialId");

exports.createSupplier = async (req, res) => {
  try {
    const { serialNo, id } = await generateSerialId({
      compid: req.body.compid,
      Model: Supplier,
      prefixLetter: "S",
    });
    req.body.serialNo = serialNo;
    req.body.sup_id = id;
    const supplier = await Supplier.create(req.body);
    res
      .status(201)
      .json({ message: "Supplier created successfully", data: supplier });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllSupplier = async (req, res) => {
  try {
    const { reportType, startDate, endDate, month, year } = req.query;

    const suppliers = await Supplier.find().sort({ regdate: -1 });

    const suppliersWithTotals = await Promise.all(
      suppliers.map(async (supplier) => {
        let purchaseQuery = { supplier: supplier._id };
        let voucherQuery = { supplier: supplier._id };
        let purchaseReturnQuery = { sup_id: supplier._id };

        let start, end;
        if (reportType === "daily" && startDate && endDate) {
          start = new Date(startDate);
          end = new Date(endDate);
          purchaseQuery.purchaseDate = { $gte: start, $lte: end };
          voucherQuery.voucherDate = { $gte: start, $lte: end };
          purchaseReturnQuery.returnDate = { $gte: start, $lte: end };
        } else if (reportType === "monthly" && month && year) {
          start = new Date(year, month - 1, 1);
          end = new Date(year, month, 0, 23, 59, 59);
          purchaseQuery.purchaseDate = { $gte: start, $lte: end };
          voucherQuery.voucherDate = { $gte: start, $lte: end };
          purchaseReturnQuery.returnDate = { $gte: start, $lte: end };
        } else if (reportType === "yearly" && year) {
          start = new Date(year, 0, 1);
          end = new Date(year, 11, 31, 23, 59, 59);
          purchaseQuery.purchaseDate = { $gte: start, $lte: end };
          voucherQuery.voucherDate = { $gte: start, $lte: end };
          purchaseReturnQuery.returnDate = { $gte: start, $lte: end };
        }

        let adjustedOpeningBalance = supplier.balance || 0;

        if (start) {
          // Purchases before period
          const prevPurchases = await Purchase.find({
            supplier: supplier._id,
            purchaseDate: { $lt: start },
          });

          // Payments (paidAmount inside purchases) before period
          const prevPaidFromPurchases = prevPurchases.reduce(
            (sum, p) => sum + (p.paidAmount || 0),
            0
          );

          const prevPurchaseTotal = prevPurchases.reduce(
            (sum, p) => sum + (p.totalPrice || 0),
            0
          );

          // Vouchers (payments) before period
          const prevVouchers = await Voucher.find({
            supplier: supplier._id,
            voucherDate: { $lt: start },
          });

          const prevVoucherTotal = prevVouchers.reduce(
            (sum, v) => sum + (v.totalAmount || 0),
            0
          );
          const prevPurchaseReturn = await PurchaseReturn.find({
            sup_id: supplier._id,
            returnDate: { $lt: start },
          });

          const prevReturnTotal = prevPurchaseReturn.reduce(
            (sum, r) => sum + (r.totalPrice || 0),
            0
          );

          adjustedOpeningBalance =
            adjustedOpeningBalance +
            prevPurchaseTotal -
            (prevPaidFromPurchases + prevVoucherTotal + prevReturnTotal);
        }

        const purchases = await Purchase.find(purchaseQuery);
        const vouchers = await Voucher.find(voucherQuery);
        const purchaseReturns = await PurchaseReturn.find(purchaseReturnQuery);

        const totalPurchaseReturn = purchaseReturns.reduce(
          (sum, r) => sum + (r.totalPrice || 0),
          0
        );

        const totalPurchase = purchases.reduce(
          (sum, p) => sum + (p.totalPrice || 0),
          0
        );
        const paidAmount = purchases.reduce(
          (sum, p) => sum + (p.paidAmount || 0),
          0
        );
        const totalPaidFromVoucher = vouchers.reduce(
          (sum, v) => sum + (v.totalAmount || 0),
          0
        );

        const totalPurchaseWithOpening = totalPurchase + adjustedOpeningBalance;
        const totalPaid = paidAmount + totalPaidFromVoucher;
        const totalDue =
          totalPurchaseWithOpening - totalPaid - totalPurchaseReturn;

        return {
          ...supplier.toObject(),
          openingBalance: adjustedOpeningBalance,
          totalPurchase,
          paidAmount,
          totalPaidFromVoucher,
          totalDue,
          totalPurchaseReturn,
        };
      })
    );

    res.status(200).json({ data: suppliersWithTotals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ data: supplier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ data: supplier });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
