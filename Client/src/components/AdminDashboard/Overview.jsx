import { useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";

function Overview( {refresh} ) {
  console.time("Overview Rendered");
  const [jobs, setJobs] = useState([]);
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
  }, [refresh]);
  const stats = useMemo(() => {
    return [
      { title: "Total Departments", value: 8, color: "bg-orange-500" },
      { title: "Job Openings", value: jobs.length, color: "bg-blue-400" },
      {
        title: "In-Progress Jobs",
        value: jobs.filter((j) => j.status === "in-progress").length,
        color: "bg-green-500",
      },
      {
        title: "Completed Jobs",
        value: jobs.filter((j) => j.status === "completed").length,
        color: "bg-red-500",
      },
    ];
  }, [jobs]);
  console.timeEnd("Overview Rendered");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`${item.color} text-black rounded-2xl p-4 shadow-md
          transition-all duration-500 ease-in-out
          hover:scale-105 hover:shadow-xl`}
        >
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-3xl font-bold text-right mt-4">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default Overview;
