// purchase return controller.js
const PurchaseReturnProduct = require('../models/PurchaseReturnProduct');

// Create one or multiple PurchaseReturnProduct entries
exports.createPurchaseReturnProduct = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        message: 'Request body must be a non-empty array of products.',
      });
    }

    const newProducts = await PurchaseReturnProduct.insertMany(data);

    res.status(201).json({
      message: 'PurchaseReturnProducts created successfully',
      data: newProducts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all PurchaseReturnProducts
exports.getAllPurchaseReturnProduct = async (req, res) => {
  try {
    const products = await PurchaseReturnProduct.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PurchaseReturnProduct by ID
exports.getPurchaseReturnProductById = async (req, res) => {
  try {
    const product = await PurchaseReturnProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'PurchaseReturnProduct not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update PurchaseReturnProduct
exports.updatePurchaseReturnProduct = async (req, res) => {
  try {
    const updatedProduct = await PurchaseReturnProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'PurchaseReturnProduct not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete PurchaseReturnProduct
exports.deletePurchaseReturnProduct = async (req, res) => {
  try {
    const deletedProduct = await PurchaseReturnProduct.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'PurchaseReturnProduct not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
