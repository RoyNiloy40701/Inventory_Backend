const Stock = require('../models/Stock')
const PurchaseProduct = require("../models/PurchaseProduct");
exports.stockIn = async (req, res) => {
  const { compid, productID, quantity, regby } = req.body;
  try {
    const stock = await Stock.findOneAndUpdate(
      { compid, productID },
      {
        $inc: { totalPices: quantity },
        $set: { upby: regby }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })

    if (!stock.regby) {
      stock.regby = regby;
    }
    await stock.save();
    res.status(200).json({ message: 'Stock In successful', stock });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


exports.stockOut = async (req, res) => {
  const { compid, productID, quantity, regby } = req.body;
  try {
    const stock = await Stock.findOne({ compid, productID })

    if (!stock || stock.totalPices < quantity) {
      return res.status(400).json({ message: "Insufficient Stock" })
    }
    stock.totalPices -= quantity;
    stock.upby = regby;
    await stock.save();
    res.status(200).json({ message: 'Stock Out successful', stock });

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.stockAdjust = async (req, res) => {
  const { compid, productID, quantity = 0, dtquantity = 0, regby } = req.body;

  try {
    const existing = await Stock.findOne({ compid, productID });

    let updatedTotalPices = quantity;
    let updatedDtQuantity = dtquantity;

    if (existing) {
      updatedTotalPices = existing.totalPices + quantity;
      updatedDtQuantity = existing.dtquantity + dtquantity;
    }

    if (updatedTotalPices < 0) updatedTotalPices = 0;

    const stock = await Stock.findOneAndUpdate(
      { compid, productID },
      {
        $set: {
          totalPices: updatedTotalPices,
          dtquantity: updatedDtQuantity,
          upby: regby,
        },
        $setOnInsert: { regby },
      },
      { new: true, upsert: true }
    );

    const currentStock = stock.totalPices - stock.dtquantity;

    res.status(200).json({ message: 'Stock adjusted successfully', stock, currentStock });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all stocks with product purchases included
exports.getAllStock = async (req, res) => {
  try {
    // Fetch all stocks
    const stocks = await Stock.find().sort({ regdate: -1 });

    // For each stock, calculate total purchase (stockIn)
    const enrichedStocks = await Promise.all(
      stocks.map(async (stock) => {
        const totalPurchased = await PurchaseProduct.aggregate([
          {
            $match: {
              productID: stock.productID.toString() // ✅ fix: convert ObjectId → string
            }
          },
          {
            $group: { _id: null, total: { $sum: "$quantity" } }
          },
        ]);

        const stockIn = totalPurchased.length > 0 ? totalPurchased[0].total : 0;

        return {
          ...stock.toObject(),
          stockIn, // ✅ total purchased quantity
          availableStock: stock.totalPices - (stock.dtquantity || 0),
        };
      })
    );

    res.status(200).json(enrichedStocks);
  } catch (error) {
    console.error("❌ Error fetching stock:", error);
    res.status(500).json({ message: error.message });
  }
};