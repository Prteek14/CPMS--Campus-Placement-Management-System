import React from "react";

function AppliedJobs({ jobs }) {
  // ✅ filter applied jobs
  const appliedJobs = jobs.filter((job) => job.isApplied);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-6 ">
      {appliedJobs.length === 0 ? (
        <p className="text-center text-gray-500">No Applied Jobs</p>
      ) : (
        appliedJobs.map((job) => (
          <div
            key={job._id}
            className="w-full bg-mist-400 shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="mb-3">
              <h2 className="text-xl text-center font-bold text-gray-800">
                {job.companyName} - Applied
              </h2>
            </div>

            {/* Details */}
            <div className="space-y-1 text-black text-base">
              <p>
                <span className="font-semibold">Location:</span> {job.location}
              </p>
              <p>
                <span className="font-semibold">Company Type:</span>{" "}
                {job.companyType}
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
                  ? new Date(job.regEndDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>

              <div className="my-2 text-xs lg:text-sm">
                <p className="mt-5 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 text-center hover:scale-105">
                  <a
                    href={job.jdFile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Job Description
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AppliedJobs;
