// const mongoose = require("mongoose");
// require("dotenv").config();

// const Department = require("./src/models/department-model");
// const Branch = require("./src/models/branch-model");

// const departmentData = {
//   "B.Tech": [
//     "B.Tech CSE",
//     "B.Tech CSE Lateral",
//     "B.Tech CSE (Artificial Intelligence)",
//     "B.Tech CSE (Artificial Intelligence) Lateral",
//     "B.Tech CSE (Cloud Computing)",
//     "B.Tech CSE (Cloud Computing) Lateral",
//     "B.Tech Civil Engineering",
//     "B.Tech Civil Engineering Lateral",
//     "B.Tech Mechanical Engineering",
//     "B.Tech Mechanical Engineering Lateral",
//     "B.Tech Electrical Engineering",
//     "B.Tech Electrical Engineering Lateral",
//     "B.Tech Biotechnology",
//     "B.Tech Biotechnology Lateral",
//     "B.Tech Robotics and Automation",
//   ],
//   BCA: [
//     "Bachelor of Computer Applications",
//     "BCA (Artificial Intelligence)",
//     "BCA (Cloud computing)",
//   ],
//   BBA: [
//     "Bachelor of Business Administration",
//     "BBA FinTech with AI",
//     "BBA Business Analytics",
//     "BBA + LLB (Integrated)",
//   ],
//   "B.Sc": [
//     "B.Sc Computer Science (Honours)",
//     "B.Sc Physics (Honours)",
//     "B.Sc Chemistry (Honours)",
//     "B.Sc Mathematics (Honours)",
//     "B.Sc PCM",
//     "B.Sc Fashion Design",
//     "B.Sc & B.Ed. Integrated",
//     "B.Sc ZBC",
//     "B.Sc Biotechnology (Honours)",
//     "B.Sc Agriculture (Honours)",
//     "B.Sc (H) Forensic Science",
//   ],
//   "M.Tech": [
//     "M.Tech Computer Science",
//     "M.Tech Mechanical Engineering",
//     "M.Tech Civil Engineering",
//   ],
//   MBA: [
//     "MBA Fintech with AI",
//     "MBA Business Analytics",
//     "MBA Dual Specialization",
//   ],
//   MCA: ["Master of Computer Applications", "MCA AI & ML"],
//   "M.Sc": [
//     "M.Sc Chemistry",
//     "M.Sc Biotechnology",
//     "M.Sc Mathematics",
//     "M.Sc Microbiology",
//     "M.Sc Physics",
//     "M.Sc Food Technology",
//     "M.Sc Agriculture",
//   ],
// };

// const seedData = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       dbName: "cpmsdb",
//     });

//     console.log("DB Connected ✅");

//     // ❗ optional: clear old data
//     await Department.deleteMany();
//     await Branch.deleteMany();

//     for (const deptName in departmentData) {
//       // create department
//       const department = await Department.create({
//         name: deptName,
//       });

//       // create branches for that department
//       const branches = departmentData[deptName].map((branchName) => ({
//         name: branchName,
//         department: department._id,
//       }));

//       await Branch.insertMany(branches);
//     }

//     console.log("🌱 Seed Data Inserted Successfully");
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// seedData();
