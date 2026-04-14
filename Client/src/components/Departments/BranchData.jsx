import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TfiBackRight } from "react-icons/tfi";
import { RiAdminFill } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

function BranchData() {
  const { branchName } = useParams();

  // ✅ state
  const [students, setStudents] = useState([]);

  // ✅ table headers dynamic
  const tableHeaders = [
    "Sr. No.",
    "Student ID",
    "Name",
    "E-mail",
    "Phone",
    "Active Backlogs",
    "10th Result",
    "12th Result",
    "UG Result",
    "PG Result",
    "View Docs",
    "Student Status",
  ];

  // ✅ fetch data (backend se)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(
          `/admin/students/${encodeURIComponent(branchName)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStudents(res.data.students);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
      }
    };

    fetchStudents();
  }, [branchName]);

  const isUGBranch = branchName.startsWith("B");
  const filteredHeaders = isUGBranch
    ? tableHeaders.filter((header) => header !== "PG Result")
    : tableHeaders;

  const handleVerify = async (student) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(
        `/admin/students/${student._id}`,
        { isVerified: !student.isVerified }, // toggle
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ UI update instantly
      setStudents((prev) =>
        prev.map((s) => (s._id === student._id ? res.data : s)),
      );

      toast.success("Status updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between bg-linear-to-r from-[#59cde9] to-[#0a2a88]">
        <div className="flex items-center pl-2">
          <img
            src="/cpmsLOGO.webp"
            alt="colleg_logo"
            className="w-13 h-13 rounded-4xl shadow-lg shadow-black m-1 my-2"
          />
          <h1 className="text-xl text-center md:text-2xl text-black p-4 font-bold ">
            CPMS
          </h1>
        </div>
        <div className="flex items-center mr-2 text-amber-100">
          <p className="text-center text-sm md:text-xl  p-2 font-semibold">
            Admin Dashboard
          </p>
          <RiAdminFill size={25} />
        </div>
      </div>
      <div className="flex-1 p-6 bg-linear-to-r from-[#141e30] to-[#243b55] ">
        <h1 className="text-center text-white text-3xl m-4 font-bold">
          {branchName} Table
        </h1>
        {/* Search Bar */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            name="searchBar"
            max={15}
            placeholder="Search by Student ID"
            className="border border-slate-200 rounded-lg px-4 py-2 w-74 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700 text-white"
          />
        </div>

        {/* Table */}
        {students.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-black shadow-lg rounded-xl mb-4">
            <table className="w-full text-left border border-gray-300 border-collapse rounded-xl">
              <thead className="bg-gray-100 text-gray-700 text-center ">
                <tr>
                  {filteredHeaders.map((header, index) => (
                    <th key={index} className="p-2 border border-gray-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-slate-800 text-white">
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="hover:bg-mauve-700 transition text-center border border-gray-300"
                  >
                    <td className="p-2 border border-gray-600">{index + 1}</td>
                    <td className="p-2 border border-gray-600">
                      {student.studentId}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.studentName}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.studentEmail}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.phoneNumber}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.activeBacklogs}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.tenthResult}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.twelfthResult}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.graduationResult}
                    </td>
                    {!isUGBranch && (
                      <td className="p-2 border border-gray-600">
                        {student.pgResult || "NA"}
                      </td>
                    )}

                    {/* View Docs */}
                    <td className="p-2 border border-gray-600">
                      <button className="text-black flex items-center gap-1 mx-auto bg-blue-400 px-2 py-1 rounded-lg hover:bg-blue-500 cursor-pointer">
                        <FaEye size={14} />
                        {student.resume?.url ? (
                          <a
                            href={student.resume.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Resume
                          </a>
                        ) : (
                          <p>No Resume Uploaded</p>
                        )}
                      </button>
                    </td>

                    <td className="p-2 border border-gray-600">
                      <div
                        onClick={() => handleVerify(student)}
                        className={`py-1 px-2 rounded-lg cursor-pointer transition w-fit mx-auto text-white ${
                          student.isVerified
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {student.isVerified ? "Verified" : "Verify"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white text-center text-xl sm:text-2xl md:text-4xl flex flex-col justify-center items-center">
            <br />
            <FiAlertCircle size={50} />
            <br />
            No data Available !!
          </p>
        )}

        <p className="w-fit text-center text-sm text-white flex items-center justify-self-end gap-1  cursor-pointer rounded-xl px-6 py-2 font-semibold transition-all duration-500 bg-size-[200%_auto] bg-[linear-gradient(to_right,#ff0084_0%,#33001b_51%,#ff0084_100%)] hover:bg-right ">
          <Link to="/admindashboard">Back</Link> <TfiBackRight size={15} />
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default BranchData;
