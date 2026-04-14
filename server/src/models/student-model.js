const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      trim: true,
    },

    studentEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    dob:{
      type: Date,
    },

    address:{
      type:String,
    },

    studentPassword: {
      type: String,
      required: true,
      select: false,
    },

    studentId: {
      type: String,
      trim: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },

    phoneNumber: {
      type: String,
    },

    activeBacklogs: {
      type: Number,
      default: 0,
    },

    tenthResult: {
      type: Number,
    },

    twelfthResult: {
      type: Number,
    },

    graduationResult: {
      type: Number,
    },

    pgResult: {
      type: Number,
    },

    year:{
      type:Number,
    },

    resume: {
      url: String,
      public_id: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", studentSchema);
