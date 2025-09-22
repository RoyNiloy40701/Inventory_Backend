# 📦 Inventory Management System – Backend

This is the **Backend API** for the [Inventory Management System](https://github.com/RoyNiloy40701/Inventory).  
It provides secure and scalable REST APIs for managing products, suppliers, stock in/out, sales, and reports.  

Built with **Node.js, Express, and MongoDB**.

---

## 🚀 Features

- 🔑 **User Authentication & Authorization (JWT)**
- 📦 **Stock Management APIs**  
  - Stock In / Stock Out  
  - Adjustment tracking  
- 🛒 **Products & Suppliers CRUD APIs**
- 📊 **Sales & Returns APIs**
- ⏱️ **Timestamps for all records (regdate, update)**
- 🌐 **REST API with JSON responses**

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose ODM  
- **Authentication**: JWT  
- **Validation**: Express Validator / Yup  
- **Environment**: dotenv  

---

## 📂 Project Structure

```bash
Inventory_Backend/
├── models/         # Mongoose models (Stock, User, Supplier, etc.)
├── routes/         # Express routes (stock, users, suppliers, sales)
├── controllers/    # Business logic for routes
├── middleware/     # Auth middleware (JWT protection)
├── utils/          # Helper functions
├── server.js       # Entry point
├── package.json
└── README.md
