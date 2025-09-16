const Product = require('../models/Product');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Stock = require('../models/Stock');


// helper: delete a file if exists
function safeUnlink(filePath) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(filePath, (e) => {
        if (e) console.error('❌ Error deleting file:', e);
      });
    }
  });
}

// GET all products (with optional search)
exports.getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      const searchQuery = search.toLowerCase();
      query = {
        $or: [
          { productName: { $regex: searchQuery, $options: 'i' } },
          { categoryID: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }
    const products = await Product.find(query).sort({ regdate: -1 });

    // Attach stock quantity to each product
    const productsWithStock = await Promise.all(
      products.map(async (product) => {
        const stock = await Stock.findOne({ productID: product._id, compid: product.compid });
        const quantity = stock ? (stock.totalPices - stock.dtquantity) : 0;
        return {
          ...product.toObject(),
          quantity, //  add calculated quantity
        };
      })
    );

    res.status(200).json(productsWithStock);

  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    console.error('❌ Error fetching product by ID:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// CREATE product (with optional image upload)
exports.createProduct = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }

    const product = new Product(payload);
    const savedProduct = await product.save();

    res.status(201).json({
      message: '✅ Product created successfully',
      product: savedProduct
    });
  } catch (err) {
    console.error('❌ Error creating product:', err.message);
    if (req.file) safeUnlink(req.file.path); // cleanup if failed
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// UPDATE product by ID (replace image if new file uploaded)
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      if (req.file) safeUnlink(req.file.path);
      return res.status(400).json({ error: 'Invalid product ID format' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      if (req.file) safeUnlink(req.file.path);
      return res.status(404).json({ error: 'Product not found' });
    }

    if (req.file) {
      if (product.image) {
        const oldPath = path.join(__dirname, '..', product.image);
        safeUnlink(oldPath);
      }
      req.body.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      message: '✅ Product updated successfully',
      product: updatedProduct
    });
  } catch (err) {
    console.error('❌ Error updating product:', err.message);
    if (req.file) safeUnlink(req.file.path);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE product by ID (also delete stored image)
exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

    if (deletedProduct.image) {
      const filePath = path.join(__dirname, '..', deletedProduct.image);
      safeUnlink(filePath);
    }

    res.status(200).json({ message: '✅ Product deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting product:', err.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


