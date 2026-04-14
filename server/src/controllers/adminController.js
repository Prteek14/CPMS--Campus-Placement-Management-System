const Student = require("../models/student-model");
const Branch = require("../models/branch-model"); // ✅ import

exports.getStudentsByBranch = async (req, res) => {
  try {
    const { branchName } = req.params;

    // 🔥 decode (spaces fix)
    const decodedBranch = decodeURIComponent(branchName);

    // 🔥 find branch by name
    const branch = await Branch.findOne({ name: decodedBranch });

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // 🔥 find students using ObjectId
    const students = await Student.find({
      branch: branch._id,
    })
      .populate("branch", "name") // ✅ correct populate
      .select("-password")
      .sort({ studentId: 1});

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};