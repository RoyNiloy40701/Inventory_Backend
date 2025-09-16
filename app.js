const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const roleRoutes = require('./routes/roleRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const stockRoutes = require('./routes/stockRoutes')
const productRoutes = require('./routes/productRoutes')
const partyRoutes = require('./routes/partyRoutes')
const companyRoutes = require('./routes/companyRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const unitRoutes = require('./routes/unitRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const bankAccountRoutes = require('./routes/bankAccountRoutes')
const cashAccountRoutes = require('./routes/cashAccountRoutes')
const mobileAccountRoutes = require('./routes/mobileAccountRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
const purchaseReturnRoutes = require('./routes/purchaseReturnRoutes')
const voucherRoutes = require('./routes/voucherRoutes')
const particularVoucherRoutes = require('./routes/particularVoucherRoutes')
const supplierRoutes = require('./routes/supplierRoutes')
const salaryRoutes = require('./routes/salaryRoutes')
const customerRoutes = require('./routes/customerRoutes')
const purchaseProductRoutes = require('./routes/purchaseProductRoutes')
const purchasePaymentRoutes = require('./routes/purchasePaymentRoutes')
const quotationProductRoutes = require('./routes/quotationProductRoutes')
const saleProductRoutes = require('./routes/saleProductRoutes')
const purchaseReturnProductRoutes = require('./routes/purchaseReturnProductRoutes')
const saleReturnRoutes = require("./routes/saleReturnRoutes");
const employeePaymentRoutes = require('./routes/employeePaymentRoutes')
const salePaymentRoutes = require('./routes/salePaymentRoutes')
const saleRoutes = require('./routes/saleRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const app = express();
const path = require('path');
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/api/auth', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/unit', unitRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/AccountSetting', bankAccountRoutes);
app.use('/api/AccountSetting', cashAccountRoutes);
app.use('/api/AccountSetting', mobileAccountRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/purchase/product', purchaseProductRoutes);
app.use('/api/purchase/payment', purchasePaymentRoutes);
app.use('/api/purchaseReturn', purchaseReturnRoutes);
app.use('/api/voucher', voucherRoutes);
app.use('/api/particularVoucher', particularVoucherRoutes);
app.use('/api/quotationProduct', quotationProductRoutes);
app.use('/api/sale/payment', salePaymentRoutes);

app.use('/api/customer', customerRoutes);
app.use('/api/product', productRoutes);
app.use('/api/party', partyRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/quotation', quotationRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/sale/product', saleProductRoutes);
app.use('/api/purchaseReturnProduct', purchaseReturnProductRoutes);
app.use("/api/salesReturn", saleReturnRoutes);
app.use('/api/payment', employeePaymentRoutes);

module.exports = app;