const express = require("express");
const router = express.Router();
const Student = require("../models/student-model");

const { loginAdmin } = require("../controllers/authAdminController");
const { getStudentsByBranch } = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { createJob } = require("../controllers/jobController");
const upload = require("../middleware/upload"); // for file uploads
const Department = require("../models/department-model");
const Branch = require("../models/branch-model");
const Job = require("../models/job-model");
const Application = require("../models/application-model");
// login
router.post("/login", loginAdmin);

router.get(
  "/students/:branchName",
  protect,
  authorizeRoles("admin"),
  getStudentsByBranch,
);

router.patch(
  "/students/:studentId", // ✅ change this
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.studentId, // ✅ change this
        req.body,
        { new: true },
      );

      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(updatedStudent);
    } catch (err) {
      console.error(err); // 👈 ADD THIS
      res.status(500).json({ message: err.message });
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

router.post(
  "/create-job",
  protect,
  authorizeRoles("admin"),
  upload.single("jdFile"),
  createJob,
);

router.get("/jobs", async (req, res) => {
  const jobs = await Job.find().populate("branches");
  res.json(jobs);
});

router.delete("/jobs/:jobId", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.jobId);
    res.json(deletedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/jobs/:jobId/applications", async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("student") // student details
      .populate("job", "companyName"); // optional

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.patch("/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/departments/stats", async (req, res) => {
  try {
    const departments = await Department.find();

    const data = await Promise.all(
      departments.map(async (dept) => {
        const totalStudents = await Student.countDocuments({ department: dept._id });
        const approvedStudents = await Student.countDocuments({
          department: dept._id,
          isVerified: true,
        });
        const jobOpenings = await Job.countDocuments({
          departments: dept._id,
        });

        return {
          name: dept.name,
          id: dept._id,
          totalStudents,
          approvedStudents,
          jobOpenings,
        };
      })
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
