import { useState, useEffect } from "react";
import { updateProfile } from "../../api/studentApi";
import { toast } from "react-toastify";
import api from "../../api/axios";

function EditProfile({ setEdit }) {
  const [loading, setLoading] = useState(false);

  const handleClickBack = () => {
    setEdit(false);
  };

  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    studentEmail: "",
    phoneNumber: "",
    address: "",
    dob: "",
    year: "",
    activeBacklogs: "",
    tenthResult: "",
    twelfthResult: "",
    graduationResult: "",
    pgResult: "",
  });

  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 fetch departments
        const deptRes = await api.get("/auth/departments");
        setDepartments(deptRes.data);

        // 🔹 fetch profile (JWT token required)
        const token = localStorage.getItem("token");

        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        setFormData({
          studentName: data.studentName || "",
          studentId: data.studentId || "",
          studentEmail: data.studentEmail || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
          year: data.year || "",
          activeBacklogs: data.activeBacklogs || "",
          tenthResult: data.tenthResult || "",
          twelfthResult: data.twelfthResult || "",
          graduationResult: data.graduationResult || "",
          pgResult: data.pgResult || "",
        });

        setDepartment(data.department?._id || data.department);
        setCourse(data.branch?._id || data.branch);

        // 🔹 fetch branches for selected department
        if (data.department) {
          const branchRes = await api.get(
            `/auth/branches/${data.department._id || data.department}`,
          );
          setBranches(branchRes.data);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  const handleDepartmentChange = async (e) => {
    const deptId = e.target.value;
    setDepartment(deptId);
    setCourse("");

    try {
      const res = await api.get(
        `/auth/branches/${deptId}`,
      );
      const data = await res.data;
      setBranches(data);
    } catch (err) {

      toast.error(err.message);
    }
  };

  const [resume, setResume] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("department", department);
      data.append("branch", course);

      if (resume) {
        data.append("resume", resume);
      }

      const result = await updateProfile(data);

      if (result.success) {
        toast.success(result.message || "Profile updated ✅");

        // 🔥 auto close
        setTimeout(() => {
          setEdit(false);
        }, 1200);
      } else {
        toast.error(result.message || "Update failed ❌");
      }
    } catch (err) {
      toast.error("Server error ❌");

    } finally {
      setLoading(false); // ✅ ALWAYS RUN
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-linear-to-r from-[#141e30] to-[#243b55] text-white flex justify-center py-10 px-4">
        <div className="w-full max-w-5xl bg-gray-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
            Edit Your Profile
          </h1>

          {/* PERSONAL INFORMATION */}

          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <hr className="mb-6 border-gray-600" />

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div>
              <label htmlFor="studentName" className="block mb-1">
                Student Name
              </label>
              <input
                id="studentName"
                type="text"
                required
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="studentId" className="block mb-1">
                Student ID
              </label>
              <input
                id="studentId"
                type="text"
                name="studentId"
                required
                value={formData.studentId}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="studentEmail" className="block mb-1">
                E-mail
              </label>
              <input
                id="studentEmail"
                type="email"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                autoComplete="email"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block mb-1">
                Phone No.
              </label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                autoComplete="address"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block mb-1">
                DOB
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>
          </div>

          {/* ACADEMIC INFORMATION */}

          <h2 className="text-xl font-semibold mb-2">Academic Information</h2>
          <hr className="mb-6 border-gray-600" />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Department */}

            <div>
              <label htmlFor="department" className="block mb-1">
                Department
              </label>

              <select
                id="department"
                required
                value={department}
                onChange={handleDepartmentChange}
                className="w-full  p-2 rounded bg-gray-700 border border-gray-600"
              >
                <option value="">Select Department</option>

                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Course */}

            <div>
              <label htmlFor="course" className="block mb-1">
                Course
              </label>

              <select
                id="course"
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              >
                <option value="">Select Course</option>

                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block mb-1">
                Year
              </label>
              <input
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                type="number"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="activeBacklogs" className="block mb-1">
                Active Backlogs
              </label>
              <input
                id="activeBacklogs"
                type="number"
                name="activeBacklogs"
                value={formData.activeBacklogs}
                onChange={handleChange}
                min={0}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 form-input"
              />
            </div>

            <div>
              <label htmlFor="tenthResult" className="block mb-1">
                10<sup>th</sup> Percentage
              </label>
              <input
                id="tenthResult"
                name="tenthResult"
                value={formData.tenthResult}
                onChange={handleChange}
                min={0}
                max={100}
                type="number"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="twelfthResult" className="block mb-1">
                12<sup>th</sup> Percentage
              </label>
              <input
                id="twelfthResult"
                name="twelfthResult"
                value={formData.twelfthResult}
                onChange={handleChange}
                min={0}
                max={100}
                type="number"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="graduationResult" className="block mb-1">
                Graduation Percentage
              </label>
              <input
                id="graduationResult"
                name="graduationResult"
                value={formData.graduationResult}
                onChange={handleChange}
                type="number"
                min={0}
                max={100}
                placeholder="Enter Your Avg Percentage"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 form-input"
              />
            </div>

            <div>
              <label htmlFor="pgResult" className="block mb-1">
                Post Graduation Percentage
              </label>
              <input
                id="pgResult"
                type="number"
                name="pgResult"
                min={0}
                max={100}
                value={formData.pgResult}
                onChange={handleChange}
                placeholder="Enter Your Avg Percentage"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 form-input"
              />
            </div>

            <div>
              <label htmlFor="resume" className="block mb-1">
                Resume <br />
                <span className="text-xs text-gray-300">
                  File size less then 2 MB and .pdf Format
                </span>
              </label>
              <input
                id="resume"
                type="file"
                name="resume"
                onChange={handleFileChange}
                className="w-full md:w-fit p-2 text-center  rounded-2xl bg-blue-500 hover:bg-blue-400 cursor-pointer"
              />
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-2 sm:gap-4 mt-8">
            <button
              type="button"
              className="p-2 sm:p-4 rounded bg-sky-400 hover:bg-sky-500"
              onClick={handleClickBack}
            >
              Back
            </button>

            <button
              type="reset"
              className="p-2 sm:p-4 rounded bg-gray-600 hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`p-2 sm:p-4 rounded font-semibold ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
