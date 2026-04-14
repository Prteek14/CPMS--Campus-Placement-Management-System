const Admin = require('../models/admin-model');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// admin login
exports.loginAdmin = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  const admin = await Admin.findOne({ adminEmail });
  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const adminData = admin.toObject();
  delete adminData.adminPassword;

  res.json({
    token: generateToken(admin),
    user: {
      ...adminData,
      role: "admin" // 🔥 must for role-based auth
    }
  });
};