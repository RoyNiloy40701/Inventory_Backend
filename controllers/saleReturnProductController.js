//saleReturnProductController
const SaleReturnProduct = require("../models/SaleReturnProduct");

exports.createSaleReturnProduct = async (req, res) => {
  try {
    const { saleReturnID, productID, quantity, unitPrice, regby, upby, maxQty } = req.body;

    // Calculate subtotal
    const subtotal = quantity * unitPrice;

    const newProduct = new SaleReturnProduct({
      saleReturnID,
      productID,
      quantity,
      unitPrice,
      subtotal,
      maxQty: maxQty || 0,
      regby,
      upby: upby || null,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Sale return product created successfully",
      data: savedProduct,
    });
  } catch (err) {
    console.error("Error creating sale return product:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
