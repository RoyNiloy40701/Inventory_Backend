const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { compid, empid, name, compname, email, mobile, password, userrole, photo, status, otp, regby, upby } = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists with this email.' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      compid,
      empid,
      name,
      compname,
      email,
      mobile,
      password: hashedPassword,
      userrole,
      photo,
      status,
      otp,
      regby,
      upby,
    });

    res.status(200).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        userrole: newUser.userrole,
        status: newUser.status,
        regdate: newUser.regdate,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid email' })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid Password" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    res.status(200).json({
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        userrole: user.userrole,
        status: user.status,
        compid: user.compid
      },
      token
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });

  }
}

exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' });
  } catch {

    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const { com_pid } = req.body;

    if (!com_pid) {
      return res.status(400).json({ message: 'Company ID is required' });
    }

    const company = await Company.findOne({ _id: com_pid });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ data: company });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};