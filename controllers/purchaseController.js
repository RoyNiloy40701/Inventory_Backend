const { getAccountModel } = require("../helper/AccountHelper");
const Product = require("../models/Product");
const Purchase = require("../models/Purchase");
const PurchaseProduct = require("../models/PurchaseProduct");
const Supplier = require("../models/Supplier");
const generateSerialId = require("../utils/generateSerialId");

exports.createPurchase = async (req, res) => {
  try {
    const { serialNo, id } = await generateSerialId({
      compid: req.body.compid,
      Model: Purchase,
      prefixLetter: "Inv",
    });
    req.body.challanNo = id;
    req.body.serialNo = serialNo;
    const purchase = await Purchase.create(req.body);

    if (req.body.accountType && req.body.accountNo) {
      await getAccountModel(req.body.accountType).findByIdAndUpdate(
        req.body.accountNo,
        { $inc: { balance: -req.body.paidAmount } }
      );
    }

    res
      .status(201)
      .json({ message: "Purchase created successfully", data: purchase });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPurchase = async (req, res) => {
  try {
    // Get all purchases, sorted by regDate descending
    const purchases = await Purchase.find().sort({ regDate: -1 });

    // Map through each purchase and attach its products
    const purchasesWithProducts = await Promise.all(
      purchases.map(async (purchase) => {
        const purchaseProducts = await PurchaseProduct.find({
          purchaseID: purchase._id,
          compid: purchase.compid,
        });

        const productsWithName = await Promise.all(
          purchaseProducts.map(async (p) => {
            const prod = await Product.findById(p.productID);
            return {
              ...p.toObject(),
              productName: prod ? prod.productName : null,
            };
          })
        );

        const supplier = await Supplier.findOne({
          _id: purchase.supplier,
          compid: purchase.compid,
        });

        return {
          ...purchase.toObject(),
          products: productsWithName,
          sCompany: supplier ? supplier?.compName : null,
          sName: supplier ? supplier?.supplierName : null,
          sMobile: supplier ? supplier?.mobile : null,
          sAddress: supplier ? supplier?.address : null,
        };
      })
    );

    res.status(200).json({ data: purchasesWithProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase Not Found" });
    }
    const purchaseProduct = await PurchaseProduct.find({
      purchaseID: purchase._id,
      compid: purchase.compid,
    });
    const supplier = await Supplier.findOne({
      _id: purchase.supplier,
      compid: purchase.compid,
    });
    const purchaseWithProducts = {
      ...purchase.toObject(),
      products: purchaseProduct,
      sCompany: supplier ? supplier?.compName : null,
      sName: supplier ? supplier?.supplierName : null,
      sMobile: supplier ? supplier?.mobile : null,
      sAddress: supplier ? supplier?.address : null,
    };

    res.status(200).json({ data: purchaseWithProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const deleteProduct = await PurchaseProduct.deleteMany({
      purchaseID: req.params.id,
      compid: req.body.compid,
    });

    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase Not Found" });
    }

    if (req.body.accountType && req.body.accountNo) {
      await getAccountModel(req.body.accountType).findByIdAndUpdate(
        req.body.accountNo,
        { $inc: { balance: -req.body.amount } }
      );
    }

    res
      .status(200)
      .json({ data: purchase, message: "Purchase updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase Not Found" });
    }
    res.status(200).json({ message: "Purchase Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
