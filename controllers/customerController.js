const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const Voucher = require('../models/Voucher');
const generateSerialId = require('../utils/generateSerialId');


exports.createCustomer = async (req, res) => {
  try {
    const { serialNo, id } = await generateSerialId({
      compid: req.body.compid,
      Model: Customer,
      prefixLetter: 'C',
    });

    req.body.serialNo = serialNo;
    req.body.cus_id = id;

    const customer = await Customer.create(req.body)
    res.status(201).json({ data: customer })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllCustomer = async (req, res) => {
  try {

   const { reportType, startDate, endDate, month, year } = req.query;
   const customers = await Customer.find().sort({ regdate: -1 })
   
    const customersWithTotals = await Promise.all(
          customers.map(async (customer) => {
        let saleQuery = { customerID: customer._id };
        let voucherQuery = { customerID: customer._id };
    
            let start, end;
        if (reportType === "daily" && startDate && endDate) {
          start = new Date(startDate);
          end = new Date(endDate);
          saleQuery.saleDate = { $gte: start, $lte: end };
          voucherQuery.voucherDate = { $gte: start, $lte: end };
        } else if (reportType === "monthly" && month && year) {
              start = new Date(year, month - 1, 1);
              end = new Date(year, month, 0, 23, 59, 59);
               saleQuery.saleDate = { $gte: start, $lte: end };
          voucherQuery.voucherDate = { $gte: start, $lte: end };
            } else if (reportType === "yearly" && year) {
              start = new Date(year, 0, 1);
              end = new Date(year, 11, 31, 23, 59, 59);
              saleQuery.saleDate = { $gte: start, $lte: end };
          voucherQuery.voucherDate = { $gte: start, $lte: end };
            }
    
            let adjustedOpeningBalance = customer.balance || 0;
    
            if (start) {
          // Sales before period
          const prevSales = await Sale.find({
            customerID: customer._id,
            saleDate: { $lt: start },
          });
    
          const prevPaidFromSales = prevSales.reduce(
            (sum, s) => sum + (s.paidAmount || 0),
            0
          );
               const prevSalesTotal = prevSales.reduce(
            (sum, s) => sum + (s.totalAmount || 0),
            0
          );

          // Vouchers (payments) before period
          const prevVouchers = await Voucher.find({
            customerID: customer._id,
            voucherDate: { $lt: start },
          });
    

    const prevVoucherTotal = prevVouchers.reduce(
            (sum, v) => sum + (v.totalAmount || 0),
            0
          );

          adjustedOpeningBalance =
            adjustedOpeningBalance +
            prevSalesTotal -
            (prevPaidFromSales + prevVoucherTotal);
        }
    
             const sales = await Sale.find(saleQuery);
        const vouchers = await Voucher.find(voucherQuery);

        const totalSales = sales.reduce(
          (sum, s) => sum + (s.totalAmount || 0),
          0
        );
        const paidAmount = sales.reduce(
          (sum, s) => sum + (s.paidAmount || 0),
          0
        );
        const totalPaidFromVoucher = vouchers.reduce(
          (sum, v) => sum + (v.totalAmount || 0),
          0
        );

    
            const totalSalesWithOpening = totalSales + adjustedOpeningBalance;
        const totalPaid = paidAmount + totalPaidFromVoucher;
        const totalDue = totalSalesWithOpening - totalPaid;

        return {
          ...customer.toObject(),
          openingBalance: adjustedOpeningBalance,
          totalSales,
          paidAmount,
          totalPaidFromVoucher,
          totalDue,
            
            };
          })
        );
    res.status(200).json({ data: customersWithTotals })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json({ data: customer })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json({ data: customer })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json({ message: 'Deleted successfully' })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}