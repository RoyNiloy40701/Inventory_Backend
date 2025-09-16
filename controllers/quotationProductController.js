const Product = require('../models/Product');
const QuotationProduct = require('../models/QuotationProduct');

exports.getAllQuotationProduct = async (req, res) => {
  try {
    const quotations = await QuotationProduct.find().sort({ regdate: -1 });
    if (quotations.length === 0) {
      return res.status(404).json({ message: "No quotations  product found" });
    }
    res.status(200).json({ data: quotations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createQuotationProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.body.productID,
    });
    req.body.pName = product ? product?.productName : null;
    const quotation = await QuotationProduct.create(req.body);
    res.status(201).json({ message: "Quotation Product Created Successfully", data: quotation });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteQuotationProduct = async (req, res) => {
  try {
    const quotation = await QuotationProduct.findByIdAndDelete(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation Product not found' });
    }
    res.status(200).json({ message: 'Quotation Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuotationProductById = async (req, res) => {
  try {
    const quotation = await QuotationProduct.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation Product not found' });
    }
    res.status(200).json({ data: quotation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateQuotationProduct = async (req, res) => {
  try {
    const quotation = await QuotationProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quotation) {
      return res.status(404).json({ message: "Quotation Product Not Found" })
    }
    res.status(200).json({ data: quotation });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



