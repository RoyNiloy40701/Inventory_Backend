const Customer = require('../models/Customer');
const Quotation = require('../models/Quotation');
const QuotationProduct = require('../models/QuotationProduct');
const generateSerialId = require('../utils/generateSerialId');

exports.getAllQuotation = async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ regdate: -1 });
    const quotationsWithProducts = await Promise.all(
      quotations.map(async (quotation) => {
        const quotationProducts = await QuotationProduct.find({
          qutid: quotation._id
        });
        const customer = await Customer.findOne({
          _id: quotation.customerID,
        });

        return {
          ...quotation.toObject(),
          customerName: customer ? customer?.customerName : null,
          products: quotationProducts,

        };
      })
    );

    if (quotations.length === 0) {
      return res.status(404).json({ message: "No quotations found" });
    }
    res.status(200).json({ data: quotationsWithProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createQuotation = async (req, res) => {
  try {
    const { serialNo, id } = await generateSerialId({
      compid: req.body.compid,
      Model: Quotation,
      prefixLetter: 'Qut',
    });
    req.body.qinvoice = id;
    req.body.serialNo = serialNo;
    const quotation = await Quotation.create(req.body);
    res.status(201).json({ message: "Mobile Account Created Successfully", data: quotation });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    res.status(200).json({ message: 'Quotation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }
    const quotationProduct = await QuotationProduct.find({ qutid: quotation._id });
    const quotationWithProducts = {
      ...quotation.toObject(),
      products: quotationProduct,
    };

    res.status(200).json({ data: quotationWithProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateQuotation = async (req, res) => {
  try {
    const deleteProduct = await QuotationProduct.deleteMany({ qutid: req.params.id });

    const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quotation) {
      return res.status(404).json({ message: "Quotation Not Found" })
    }
    res.status(200).json({ data: quotation });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



