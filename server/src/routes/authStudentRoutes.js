const express = require("express");
const cloudinary = require("../config/cloudinary");
const router = express.Router();
const streamifier = require("streamifier");

const mongoose = require("mongoose");
const {
  registerStudent,
  loginStudent,
} = require("../controllers/authController");
const upload = require("../middleware/upload"); // ✅ ADD THIS
const Student = require("../models/student-model"); // ✅ ADD THIS
const Branch = require("../models/branch-model");
const Department = require("../models/department-model");
const { protect } = require("../middleware/authMiddleware");
const Job = require("../models/job-model");
const Application = require("../models/application-model");
const { authorizeRoles } = require("../middleware/authMiddleware");

router.post("/signup", registerStudent);
router.post("/login", loginStudent);

router.put(
  "/update-profile",
  protect,
  upload.single("resume"),
  async (req, res) => {
    try {
      const studentId = req.user.id;

      const student = await Student.findById(studentId);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      const updateData = { ...req.body };

      // 🔥 NEW CLOUDINARY UPLOAD LOGIC
      if (req.file) {
        // 🔴 delete old resume
        if (student.resume?.public_id) {
          await cloudinary.uploader.destroy(student.resume.public_id);
        }

        // 🟢 upload new resume
        const streamUpload = () =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: `cpms_uploads/${studentId}`,
                resource_type: "raw", // ✅ MUST (for PDF)
                format: "pdf", // ✅ ensure correct format
                access_mode: "public",
              },
              (error, result) => {
                if (result) resolve(result);
                else reject(error);
              },
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });

        const result = await streamUpload();

        updateData.resume = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }

      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        updateData,
        { new: true },
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedStudent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

router.get("/departments", async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

router.get("/branches/:deptId", async (req, res) => {
  const branches = await Branch.find({
    department: req.params.deptId,
  });

  res.json(branches);
});

router.get("/me", protect, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .populate("department", "name")
      .populate("branch", "name")
      .select("-studentPassword"); // 🔐 password hide

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/jobs/:branchId", protect, async (req, res) => {
  try {
    const jobs = await Job.find({
      branches: req.params.branchId,
    });

    const applications = await Application.find({
      student: req.user.id,
    });

    const appliedJobIds = applications.map((app) => app.job.toString());

    const jobsWithStatus = jobs.map((job) => ({
      ...job.toObject(),
      isApplied: appliedJobIds.includes(job._id.toString()),
    }));

    res.json(jobsWithStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/apply/:jobId",
  protect,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const studentId = req.user.id;

      // ❗ Check if already applied
      const existing = await Application.findOne({
        job: jobId,
        student: studentId,
      });

      if (existing) {
        return res.status(400).json({ message: "Already applied" });
      }

      const application = await Application.create({
        job: jobId,
        student: studentId,
      });

      res.status(201).json(application);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

router.get("/stats", protect, async (req, res) => {
  try {
    const studentId = req.user.id;

    // ✅ get student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ directly use branch id
    const branchId = student.branch;

    if (!branchId) {
      return res.status(400).json({ message: "Branch not assigned" });
    }

    // ✅ find jobs based on branch
    const jobs = await Job.find({
      branches: branchId,
    });

    // ✅ get applied jobs
    const applications = await Application.find({
      student: studentId,
    });

    const appliedJobIds = applications.map((app) =>
      app.job.toString()
    );

    // ✅ stats + isApplied
    let stats = {
      jobOpenings: 0,
      inProgress: 0,
      completed: 0,
      appliedCount: appliedJobIds.length,
    };

    const jobsWithDetails = jobs.map((job) => {
      if (job.status === "registered") stats.jobOpenings++;
      else if (job.status === "in-progress") stats.inProgress++;
      else if (job.status === "completed") stats.completed++;

      return {
        ...job.toObject(),
        isApplied: appliedJobIds.includes(job._id.toString()),
      };
    });

    res.json({
      success: true,
      stats,
      jobs: jobsWithDetails,
    });
  } catch (err) {
    console.error("Stats Error:", err); // 🔥 important
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
