import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import AppliedJobs from "./AppliedJobs/AppliedJobs";
import { toast } from "react-toastify";

function StudentOverview() {
  const { data, isLoading, isError} = useQuery({
    queryKey: ["studentStats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    refetchInterval: 1000 * 60 * 10,
  });
  const jobs = data?.jobs || [];

  if (isLoading) {
    return (
      <div className="text-white text-center mt-10 text-xl">Loading...</div>
    );
  }

  if (isError) {
    toast.error("Error fetching student stats");

    return <div>No Data Found</div>;
  }

  // ✅ UPDATED (because now stats is inside data.stats)
  const stats = [
    {
      title: "Job Openings",
      value: data?.stats?.jobOpenings || 0,
      color: "bg-blue-500",
    },
    {
      title: "In-Progress Jobs",
      value: data?.stats?.inProgress || 0,
      color: "bg-green-500",
    },
    {
      title: "Completed Jobs",
      value: data?.stats?.completed || 0,
      color: "bg-red-500",
    },
  ];

  return (
    <>
      {/* 🔥 STATS UI (UNCHANGED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 mx-8 ">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`${item.color} text-white rounded-2xl p-5 shadow-md
            transition-all duration-500 ease-in-out
            hover:scale-105 hover:shadow-xl`}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-3xl font-bold text-right mt-4">{item.value}</p>
          </div>
        ))}
      </div>
      {/* 🔥 JOBS UI */}
      <AppliedJobs jobs={jobs} />
    </>
  );
}

export default StudentOverview;
