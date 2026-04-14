import api from "../../api/axios";
import { toast } from "react-toastify";
import { useState } from "react";

function StudentJobCard({ job }) {
  const [applied, setApplied] = useState(job.isApplied);
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/auth/apply/${job._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Applied successfully 🎉");
      setApplied(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Apply failed");
      setApplied(false);
    }
  };

  return (
    <div className="w-full  bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl text-center font-bold text-gray-800">
          {job.companyName}
        </h2>
      </div>

      {/* Details */}
      <div className="space-y-1 text-gray-600 text-base">
        <p>
          <span className="font-semibold">Location:</span> {job.location}
        </p>
        <p>
          <span className="font-semibold">Company Type:</span> {job.companyType}
        </p>
        <p>
          <span className="font-semibold">Salary:</span> {job.salary}
        </p>
        <p>
          <span className="font-semibold">Job Type:</span> {job.jobType}
        </p>
      </div>

      {/* Dates */}
      <div className="mt-3 text-sm text-slate-800 font-bold">
        <p>
          Registration:{" "}
          {job.regStartDate
            ? new Date(job.regStartDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"}{" "}
          -{" "}
          {job.regEndDate
            ? new Date(job.regEndDate).toLocaleDateString("en-In", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </p>
        {/* {btns} */}
        <div className="my-2 text-xs lg:text-sm">
          <p className="mt-5 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 text-center hover:scale-105">
            <a href={job.jdFile} target="_blank" rel="noopener noreferrer">
              View Job Description
            </a>
          </p>
          <button
            className="mt-3 w-full bg-amber-400 text-black p-2 rounded-md hover:bg-amber-500 transition hover:scale-105  duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentJobCard;
