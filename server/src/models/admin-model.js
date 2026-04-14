const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      trim: true,
    },
    adminEmail: {
      type: String,
      trim: true,
      required: true,
    },
    adminPassword: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
