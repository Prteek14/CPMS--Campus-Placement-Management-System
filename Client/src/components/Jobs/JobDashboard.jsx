import { MdWorkOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { TfiBackRight } from "react-icons/tfi";
import { RiAdminFill } from "react-icons/ri";
import Footer from "../Footer";
import JobCard from "./JobCard";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function JobDashboard() {
  const [jobs, setJobs] = useState([]);
  const registeredJobs = jobs.filter((j) => j.status === "registered");
  const inProgressJobs = jobs.filter((j) => j.status === "in-progress");
  const completedJobs = jobs.filter((j) => j.status === "completed");


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("admin/jobs");
        setJobs(response.data);
      } catch (error) {
        toast.error("Error fetching jobs");
        
      }
    };
    fetchJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    try {
      await api.delete(`admin/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("Job deleted");
    } catch (err) {
      toast.error("Delete failed");

    }
  };

  const handleUpdateJob = async (id, status) => {
  try {
    await api.patch(`admin/jobs/${id}`, { status });

    setJobs(prev =>
      prev.map(job =>
        job._id === id ? { ...job, status } : job
      )
    );

    toast.success("Job updated");
  } catch (err) {
    toast.error("Update failed");

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
      <div className="flex-1 p-6 bg-gray-100  bg-linear-to-r from-[#141e30] to-[#243b55] text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-1">
          <MdWorkOutline />
          Job Management
        </h1>

        <div className="grid md:grid-cols-3 gap-6 ">
          {/* Registered Jobs */}
          <div className="bg-gray-200 rounded-xl p-4 h-fit">
            <h2 className="font-semibold mb-3 text-center md:text-2xl bg-gray-700 rounded-2xl text-white p-4 w-fit mx-auto ">
              Registered Jobs
            </h2>

            <div className="space-y-5">
              {registeredJobs.length === 0 ? (
                <p className="text-gray-700 text-center">No registered jobs</p>
              ) : (
                registeredJobs.map((job) => (
                  <JobCard key={job._id} job={job} onDelete={handleDeleteJob} onUpdate={handleUpdateJob}/>
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
                inProgressJobs.map((job) => <JobCard key={job._id} job={job} onDelete={handleDeleteJob} onUpdate={handleUpdateJob}/>)
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
                completedJobs.map((job) => <JobCard key={job._id} job={job} onDelete={handleDeleteJob} onUpdate={handleUpdateJob}/>)
              )}
            </div>
          </div>
        </div>
        <p className="w-fit text-center text-sm text-white flex items-center gap-1 justify-self-end  mt-4 cursor-pointer rounded-xl p-2  transition-all duration-500 bg-size-[200%_auto] bg-[linear-gradient(to_right,#ff0084_0%,#33001b_51%,#ff0084_100%)] hover:bg-right">
          <Link to="/admindashboard">Back</Link> <TfiBackRight />
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default JobDashboard;
