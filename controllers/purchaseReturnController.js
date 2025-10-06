const PurchaseReturn = require('../models/PurchaseReturn');
const Purchase = require('../models/Purchase');
const PurchaseProduct = require('../models/PurchaseProduct');
const Supplier = require('../models/Supplier');
const PurchaseReturnProduct = require('../models/PurchaseReturnProduct'); 
const { getAccountModel } = require("../helper/AccountHelper");

// Helper function: get purchase info by ID (same as getPurchaseById)
async function getPurchaseInfoById(purchaseId) {
  const purchase = await Purchase.findById(purchaseId);
  if (!purchase) return null;

  const purchaseProduct = await PurchaseProduct.find({ purchaseID: purchase._id, compid: purchase.compid });
  const supplier = await Supplier.findOne({
    _id: purchase.supplier,
    compid: purchase.compid,
  });

  return {
    ...purchase.toObject(),
    products: purchaseProduct,
    sCompany: supplier ? supplier?.compName : null,
    sName: supplier ? supplier?.supplierName : null,
    sMobile: supplier ? supplier?.mobile : null,
    sAddress: supplier ? supplier?.address : null,
  };
}

exports.searchPurchaseByChallanNo = async (req, res) => {
  try {
    const { challanNo } = req.query;
    if (!challanNo) {
      return res
        .status(400)
        .json({ message: "challanNo query parameter is required" });
    }

    // Find purchase by challan number
    const purchase = await Purchase.findOne({ challanNo });
    if (!purchase) {
      return res
        .status(404)
        .json({ message: "No purchase found for this challanNo" });
    }

    // Purchase info (products + supplier)
    const purchaseInfo = await getPurchaseInfoById(purchase._id);
    if (!purchaseInfo) {
      return res.status(404).json({ message: "Purchase Not Found" });
    }

    // 🔹 Find all purchase returns for this challan
    const purchaseReturns = await PurchaseReturn.find({ invoice: challanNo });

    // 🔹 Attach products for each purchase return
    const enrichedReturns = await Promise.all(
      purchaseReturns.map(async (ret) => {
        const returnProducts = await PurchaseReturnProduct.find({
          purchaseReturnID: ret._id,
        });

        return {
          ...ret.toObject(),
          products: returnProducts,
        };
      })
    );

    // 🔹 Get all return products for this challan (across all returns)
    const allReturnedProducts = await PurchaseReturnProduct.find({
      purchaseReturnID: { $in: purchaseReturns.map((r) => r._id) },
    });

    // 🔹 Calculate remaining qty for each purchased product
    const structuredProducts = purchaseInfo.products.map((prod) => {
      const returnedQty = allReturnedProducts
        .filter((r) => r.productID.toString() === prod.productID.toString())
        .reduce((sum, r) => sum + r.quantity, 0);

      return {
        ...prod.toObject(),
        remainingQty: prod.quantity - returnedQty, // 👈 remaining returnable qty
      };
    });

    // Final structured response
    res.status(200).json({
      data: {
        ...purchaseInfo,
        products: structuredProducts, // includes remainingQty
        purchaseReturns: enrichedReturns,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.createPurchaseReturn = async (req, res) => {
//   try {
//     const purchase = await PurchaseReturn.create(req.body)
//       res.status(201).json({
//       message: "Purchase Return created successfully",
//       _id: purchase._id,
//       purchase
//     });
//     console.log(req.body)
//         if (req.body.accountType && req.body.accountNo) {
//           await getAccountModel(req.body.accountType).findByIdAndUpdate(
//             req.body.accountNo,
//             { $inc: { balance: -req.body.paidAmount } }
//           );
//         }
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// }
exports.createPurchaseReturn = async (req, res) => {
  try {
    // Create the Purchase Return
    const purchase = await PurchaseReturn.create(req.body);
    const { accountType, accountNo, totalPrice } = req.body;

    // Fetch and update account if applicable
    if (accountType && accountNo && totalPrice) {
      const AccountModel = getAccountModel(accountType);
      const account = await AccountModel.findById(accountNo);

      if (account) {
        // Update account balance (adding money back)
        await AccountModel.findByIdAndUpdate(
          accountNo,
          { $inc: { balance: totalPrice } }
        );
      }
    }

    // Send response
    res.status(201).json({
      message: "Purchase Return created successfully",
      _id: purchase._id,
      purchase,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.getAllPurchaseReturn = async (req, res) => {
  try {
    const purchase = await PurchaseReturn.find().sort({ regDate: -1 })
    res.status(200).json(purchase)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPurchaseReturnById = async (req, res) => {
    try {
    const purchaseReturn = await PurchaseReturn.findById(req.params.id);
    if (!purchaseReturn) {
      return res.status(404).json({ message: "Purchase Return Not Found" });
    }

    const products = await PurchaseReturnProduct.find({
      purchaseReturnID: req.params.id,
    });

    res.status(200).json({
      ...purchaseReturn.toObject(),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//   try {
//     const purchase = await PurchaseReturn.findById(req.params.id)
//     if (!purchase) {
//       return res.status(404).json({ message: "Purchase Return Not Found" })
//     }
//     res.status(200).json(purchase)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

exports.updatePurchaseReturn = async (req, res) => {
  try {
    const purchase = await PurchaseReturn.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!purchase) {
      return res.status(404).json({ message: "Purchase Return Not Found" })
    }
    res.status(200).json(purchase)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deletePurchaseReturn = async (req, res) => {
  try {
    const purchase = await PurchaseReturn.findByIdAndDelete(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase Return Not Found" });
    }

    // Delete all related PurchaseReturnProduct entries
    await PurchaseReturnProduct.deleteMany({ purchaseReturnID: req.params.id });

    res.status(200).json({ message: "Purchase Return and related products deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPurchaseReturnWithProductsById = async (req, res) => {
  try {
    // Find the purchase return by ID
    const purchaseReturn = await PurchaseReturn.findById(req.params.id);
    if (!purchaseReturn) {
      return res.status(404).json({ message: "Purchase Return Not Found" });
    }

    // Find all related purchase return products
    const products = await PurchaseReturnProduct.find({ purchaseReturnID: req.params.id });

    // Combine and return
    res.status(200).json({
      ...purchaseReturn.toObject(),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


