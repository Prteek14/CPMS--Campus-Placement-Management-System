import { MdWorkOutline } from "react-icons/md";
import StudentJobCard from "../Student/StudentJobCard";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function StudentJobs() {
  const [jobs, setJobs] = useState([]);
  const registeredJobs = jobs.filter((j) => j.status === "registered");
  const inProgressJobs = jobs.filter((j) => j.status === "in-progress");
  const completedJobs = jobs.filter((j) => j.status === "completed");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const branchId = user?.branch;
        const token = localStorage.getItem("token");

        const response = await api.get(`/auth/jobs/${branchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data);
      } catch (error) {
        toast.error("Error fetching jobs");
        
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-linear-to-r from-[#141e30] to-[#243b55] text-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-1">
        {" "}
        <MdWorkOutline />
        Job Management
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Registered Jobs */}
        <div className="bg-gray-200 rounded-xl p-4">
          <h2 className="font-semibold mb-3 text-center md:text-2xl bg-gray-700 rounded-2xl text-white p-4 w-fit mx-auto ">
            Registered Jobs
          </h2>

          <div className="space-y-5">
            {registeredJobs.length === 0 ? (
              <p className="text-gray-700 text-center">No registered jobs</p>
            ) : (
              registeredJobs.map((job) => (
                <StudentJobCard key={job._id} job={job} />
              ))
            )}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-blue-100 rounded-xl p-4 h-fit">
          <h2 className="font-semibold bg-blue-700 mb-3 text-center md:text-2xl rounded-2xl text-white p-4 w-fit mx-auto">
            In-Progress
          </h2>

          <div className="space-y-3">
            {inProgressJobs.length === 0 ? (
              <p className="text-gray-700 text-center">No in-progress jobs</p>
            ) : (
              inProgressJobs.map((job) => (
                <StudentJobCard key={job._id} job={job} />
              ))
            )}
          </div>
        </div>

        {/* Completed */}
        <div className="bg-green-100 rounded-xl p-4 h-fit ">
          <h2 className="font-semibold bg-green-700 mb-3 text-center md:text-2xl rounded-2xl text-white p-4 w-fit mx-auto">
            Completed
          </h2>

          <div className="space-y-3">
            {completedJobs.length === 0 ? (
              <p className="text-gray-500 text-center">No completed jobs</p>
            ) : (
              completedJobs.map((job) => (
                <StudentJobCard key={job._id} job={job} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentJobs;
