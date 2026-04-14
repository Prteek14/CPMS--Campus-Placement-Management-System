import { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useRef } from "react";

function JobForm( {setRefresh} ) {
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const [departmentsList, setDepartmentsList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await api.get("/admin/departments");
      setDepartmentsList(res.data);
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = async (e) => {
    const { value, checked } = e.target;

    handleCheckbox(e);

    if (checked) {
      try {
        const res = await api.get(`/auth/branches/${value}`);

        // ✅ add new branches (without duplicates)
        setBranchesList((prev) => {
          const newBranches = res.data;

          const unique = [
            ...prev,
            ...newBranches.filter((b) => !prev.some((p) => p._id === b._id)),
          ];

          return unique;
        });
      } catch (err) {
        toast.error("Error fetching branches", { autoClose: 2000 });
        console.error(err);
      }
    } else {
      // ✅ remove branches of unchecked department
      setBranchesList((prev) => prev.filter((b) => b.department !== value));

      setJobData((prev) => ({
        ...prev,
        branches: prev.branches.filter((id) => {
          return !branchesList.some(
            (b) => b._id === id && b.department === value,
          );
        }),
      }));
    }
  };

  const [jobData, setJobData] = useState({
    companyName: "",
    location: "",
    companyType: "",
    salary: "",
    jobType: "",
    departments: [], // ✅ plural
    branches: [], // ✅ plural
    regStartDate: "",
    regEndDate: "",
  });

  const [jdFile, setJdFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    setJobData((prev) => {
      if (checked) {
        return {
          ...prev,
          [name]: [...prev[name], value], // add
        };
      } else {
        return {
          ...prev,
          [name]: prev[name].filter((item) => item !== value), // remove
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      // 🔹 append normal fields
      formData.append("companyName", jobData.companyName);
      formData.append("location", jobData.location);
      formData.append("companyType", jobData.companyType);
      formData.append("salary", jobData.salary);
      formData.append("jobType", jobData.jobType);
      formData.append("regStartDate", jobData.regStartDate);
      formData.append("regEndDate", jobData.regEndDate);

      // 🔹 append arrays
      jobData.departments.forEach((dept) => {
        formData.append("departments", dept);
      });

      jobData.branches.forEach((branch) => {
        formData.append("branches", branch);
      });

      // 🔹 append file
      if (jdFile) {
        formData.append("jdFile", jdFile);
      }

      // 🔥 API CALL
      await api.post("/admin/create-job", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.info("Job Created ✅");
      setRefresh((prev) => !prev);
    } catch (err) {
      
      toast.error("Error creating job", { autoClose: 2000 });
    } finally {
      setLoading(false);
      setJobData({
        companyName: "",
        location: "",
        companyType: "",
        salary: "",
        jobType: "",
        departments: [],
        branches: [],
        regStartDate: "",
        regEndDate: "",
      });
      setJdFile(null);
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-gray-600 text-white shadow-lg shadow-black rounded-2xl p-6 md:max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center bg-[linear-gradient(45deg,#4169e1,#00f0ff_50%,#29FFA6)] bg-clip-text text-transparent">
        Create Job Opening
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Company Name */}
        <div className="flex flex-col">
          <label htmlFor="companyName" className="font-medium mb-1">
            Company Name
          </label>
          <input
            required
            name="companyName"
            value={jobData.companyName}
            onChange={handleChange}
            id="companyName"
            type="text"
            placeholder="Enter company name"
            className="bg-gray-700 border border-slate-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="location" className="font-medium mb-1">
            Location
          </label>
          <input
            name="location"
            value={jobData.location}
            onChange={handleChange}
            id="location"
            type="text"
            placeholder="Enter job location"
            className="bg-gray-700 border border-slate-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Company Type */}
        <div className="flex flex-col">
          <label htmlFor="companyType" className="font-medium mb-1">
            Company Type
          </label>

          <select
            name="companyType"
            value={jobData.companyType || ""} // ✅ fallback
            onChange={handleChange}
            id="companyType"
            className="bg-gray-700 border border-slate-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select Company Type
            </option>

            <option value="Startup">Startup</option>
            <option value="MNC">MNC</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Offer Salary */}
        <div className="flex flex-col">
          <label htmlFor="salary" className="font-medium mb-1">
            Offer Salary
          </label>
          <input
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            id="salary"
            type="number"
            placeholder="Enter salary"
            className="bg-gray-700 border border-slate-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* JD */}
        <div className="flex flex-col">
          <label htmlFor="jdFile" className="font-medium mb-1">
            Upload JD
          </label>
          <input
            name="jdFile"
            ref={fileInputRef}
            id="jdFile"
            type="file"
            onChange={(e) => setJdFile(e.target.files[0])}
            className="w-full md:w-fit p-2 text-center border border-blue-400  rounded-2xl bg-blue-600 hover:bg-blue-500 cursor-pointer transition duration-300"
          />
        </div>

        {/* Job Type */}
        <div className="flex flex-col">
          <label htmlFor="jobType" className="font-medium mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            value={jobData.jobType || ""}
            onChange={handleChange} // ✅ ADD THIS
            id="jobType"
            className="bg-gray-700 border border-slate-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select Job Type
            </option>
            <option value="Internship">Internship</option>
            <option value="Full Time">Full Time</option>
            <option value="Contract Based">Contract Based</option>
          </select>
        </div>

        {/* Eligible department */}
        <fieldset className="flex flex-col">
          <legend className="font-medium  mb-2">Eligible Department</legend>

          <div className="grid grid-cols-2 gap-2 text-sm bg-gray-700 border border-slate-500 rounded-xl p-2">
            {departmentsList.map((dept) => (
              <label
                key={dept._id}
                htmlFor={dept._id}
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <input
                  id={dept._id}
                  type="checkbox"
                  name="departments"
                  value={dept._id}
                  onChange={handleDepartmentChange}
                  checked={jobData.departments.includes(dept._id)}
                  className="accent-blue-600"
                />
                {dept.name} {/* ✅ FIX */}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Eligible Branches */}
        <fieldset className="flex flex-col">
          <legend className="font-medium  mb-2">Eligible Course</legend>

          <div className="grid grid-cols-2 gap-2 text-sm  max-h-48 overflow-y-auto border border-slate-500 rounded-xl p-2 bg-gray-700">
            {branchesList.map((branch) => (
              <label
                key={branch._id} // ✅ FIX
                htmlFor={branch._id}
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <input
                  name="branches"
                  id={branch._id}
                  type="checkbox"
                  value={branch._id}
                  onChange={handleCheckbox}
                  checked={jobData.branches.includes(branch._id)}
                  className="accent-blue-600"
                />
                {branch.name} {/* ✅ FIX */}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Registration Start Date */}
        <div className="flex flex-col">
          <label htmlFor="regStartDate" className="font-medium  mb-1">
            Registration Start Date
          </label>
          <input
            name="regStartDate"
            value={jobData.regStartDate}
            onChange={handleChange}
            id="regStartDate"
            type="date"
            className="bg-gray-700 border border-slate-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Registration Close Date */}
        <div className="flex flex-col">
          <label htmlFor="regEndDate" className="font-medium mb-1">
            Registration Last Date
          </label>
          <input
            name="regEndDate"
            value={jobData.regEndDate}
            onChange={handleChange}
            id="regEndDate"
            type="date"
            className="bg-gray-700 border border-slate-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="border border-[#26D0CE] font-bold  hover:shadow-[0_0_10px_#26D0CE] rounded-2xl p-2 w-full text-center text-lg cursor-pointer   transition-all duration-500 bg-size-[200%_auto] bg-linear-to-r from-[#1A2980] via-[#26D0CE] to-[#1A2980] hover:bg-right disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Job..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
