const Job = require("../models/job-model");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.createJob = async (req, res) => {
  try {
    const {
      companyName,
      location,
      companyType,
      salary,
      jobType,
      regStartDate,
      regEndDate,
    } = req.body;

    // ✅ Fix arrays
    const departments = Array.isArray(req.body.departments)
      ? req.body.departments
      : req.body.departments
      ? [req.body.departments]
      : [];

    const branches = Array.isArray(req.body.branches)
      ? req.body.branches
      : req.body.branches
      ? [req.body.branches]
      : [];

    // ✅ Upload JD to Cloudinary
    let jdUrl = null;

    if (req.file) {
      const uploadedFile = await uploadToCloudinary(req.file.buffer);
      jdUrl = uploadedFile.secure_url;
    }

    // ✅ Save in DB
    const job = await Job.create({
      companyName,
      location,
      companyType,
      salary,
      jobType,
      departments,
      branches,
      regStartDate,
      regEndDate,
      jobDescription: "N/A",
      jdFile: jdUrl, // ✅ FINAL URL
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};