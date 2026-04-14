import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function JobCard({ job, onDelete, onUpdate }) {
  return (
    <div className="w-full  bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">{job.companyName}</h2>

        <button
          className="text-white hover:text-red-600 transition bg-gray-800 rounded-full p-2"
          onClick={() => onDelete(job._id)}
        >
          <FaTrash size={18} />
        </button>
      </div>

      {/* Details */}
      <div className="space-y-1 text-gray-600 text-sm">
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

      {/* Courses */}
      <div className="mt-3">
        <p className="font-semibold text-gray-700 mb-1">Eligible Branches</p>
        <div className="flex flex-wrap gap-2">
          {job.branches.map((branch) => (
            <span
              key={branch._id}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs"
            >
              {branch.name}
            </span>
          ))}
        </div>
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
          <div className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 text-center hover:scale-105">
            <a href={job.jdFile} target="_blank" rel="noopener noreferrer">
              View Job Description
            </a>
          </div>
          <button className="mt-3 w-full bg-amber-400 text-black p-2 rounded-md hover:bg-amber-500 transition hover:scale-105  duration-300">
            <Link to={`/applications/${job._id}`}>View All Applications</Link>
          </button>
          <button
            className="mt-3 w-full bg-green-400 text-black p-2 rounded-md hover:bg-green-500 transition hover:scale-105 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={job.status === "completed"}
            onClick={() =>
              onUpdate(
                job._id,
                job.status === "registered" ? "in-progress" : "completed",
              )
            }
          >
              {job.status === "registered"  ? "Mark as In-Progress" : job.status === "in-progress" ? "Mark as Completed" : "Completed"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
