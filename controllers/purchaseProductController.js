const Product = require('../models/Product');
const PurchaseProduct = require('../models/PurchaseProduct');


exports.createPurchaseProduct = async (req, res) => {
  try {
    const purchaseProduct = await PurchaseProduct.create(req.body)
    res.status(201).json({ message: "Purchase Product created successfully", data: purchaseProduct })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllPurchaseProduct = async (req, res) => {
  try {
    const purchaseProducts = await PurchaseProduct.find().sort({ regDate: -1 })
    // Map through each purchase and attach its products
    const purchasesWithProducts = await Promise.all(
      purchaseProducts?.map(async (product) => {
        const products = await Product.findOne({
          _id: product?.productID,
        });

        return {
          ...product.toObject(),
          productName: products ? products?.productName : null,

        };
      })
    );
    res.status(200).json({ data: purchasesWithProducts })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPurchaseProductById = async (req, res) => {
  try {
    const purchaseProduct = await PurchaseProduct.findById(req.params.id)
    if (!purchaseProduct) {
      return res.status(404).json({ message: "Purchase  Product Not Found" })
    }

    const products = await Product.findOne({
      _id: purchaseProduct?.productID,

    });
    const purchaseWithProducts = {
      ...purchaseProduct.toObject(),
      productName: products ? products?.productName : null,

    };
    res.status(200).json({ data: purchaseWithProducts })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.updatePurchaseProduct = async (req, res) => {
  try {
    const purchaseProduct = await PurchaseProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!purchaseProduct) {
      return res.status(404).json({ message: "Purchase Product Not Found" })
    }
    res.status(200).json({ data: purchaseProduct })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deletePurchaseProduct = async (req, res) => {
  try {
    const purchaseProduct = await PurchaseProduct.findByIdAndDelete(req.params.id)
    if (!purchaseProduct) {
      return res.status(404).json({ message: "Purchase Product Not Found" })
    }
    res.status(200).json({ message: "Purchase Product Deleted Successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}