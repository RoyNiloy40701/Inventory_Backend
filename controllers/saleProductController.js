const SaleProduct = require('../models/SaleProduct');

exports.getAllSaleProducts = async (req, res) => {
  try {
    const products = await SaleProduct.find(); // returns only saleID and productID as ObjectId
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching sale products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET a single sale product by ID
exports.getSaleProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await SaleProduct.findById(id).populate('saleID').populate('productID');
    if (!product) {
      return res.status(404).json({ message: 'Sale product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching sale product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// // CREATE a new sale product
// exports.createSaleProduct = async (req, res) => {
//   try {
//     const newProduct = new SaleProduct({
//       saleID: req.body.saleID,
//       productID: req.body.productID,
//       pName: req.body.pName,
//       sprice: req.body.sprice,
//       quantity: req.body.quantity,
//       totalPrice: req.body.totalPrice,
//       regby: req.body.regby,
//       upby: req.body.upby,
//     });

//     const savedProduct = await newProduct.save();
//     console.log('Sale product saved:', savedProduct);
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     console.error('Error creating sale product:', err);
//     res.status(500).json({ message: 'Failed to create sale product' });
//   }
// };


exports.createSaleProduct = async (req, res) => {
  try {
    const purchaseProduct = await SaleProduct.create(req.body)
    res.status(201).json({ message: "Sale Product created successfully", data: purchaseProduct })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// UPDATE a sale product by ID
exports.updateSaleProduct = async (req, res) => {
  try {
    const purchaseProduct = await SaleProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!purchaseProduct) {
      return res.status(404).json({ message: "SaleProduct Not Found" })
    }
    res.status(200).json({ data: purchaseProduct })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE a sale product by ID
exports.deleteSaleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await SaleProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Sale product not found' });
    }

    res.status(200).json({ message: 'Sale product deleted successfully' });
  } catch (err) {
    console.error('Error deleting sale product:', err);
    res.status(500).json({ message: 'Failed to delete sale product' });
  }
};
