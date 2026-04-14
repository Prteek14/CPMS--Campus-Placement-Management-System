const Student = require("../models/student-model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ================= SIGNUP =================
exports.registerStudent = async (req, res) => {
  try {
    const { studentName, studentEmail, studentPassword } = req.body;

    // check existing user
    const existing = await Student.findOne({ studentEmail });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(studentPassword, 10);

    // create student
    const student = await Student.create({
      studentName,
      studentEmail,
      studentPassword: hashedPassword,
    });

    // remove password
    const userData = student.toObject();
    delete userData.studentPassword;

    res.status(201).json({
      token: generateToken(student),
      user: userData,
      message:"Signup Successfull, Complete your profile!!"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= LOGIN =================
exports.loginStudent = async (req, res) => {
  try {
    const { studentEmail, studentPassword } = req.body;

    // get user with password
    const student = await Student.findOne({ studentEmail }).select("+studentPassword");

    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(studentPassword, student.studentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // remove password
    const userData = student.toObject();
    delete userData.studentPassword;

    res.json({
      token: generateToken(student),
      user: userData,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};