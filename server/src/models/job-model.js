const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    companyName: { type: String, trim: true },

    companyType: {
      type: String,
      enum: ["Startup", "MNC", "Other"],
    },

    location: String,
    salary: Number,

    jobType: {
      type: String,
      enum: ["Internship", "Full Time", "Contract Based"],
    },

    // ✅ FIXED (array)
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],

    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
      },
    ],

    regStartDate: Date,
    regEndDate: Date,

    status: {
      type: String,
      enum: ["registered", "in-progress", "completed"],
      default: "registered",
    },

    jdFile: String, // cloudinary URL
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
