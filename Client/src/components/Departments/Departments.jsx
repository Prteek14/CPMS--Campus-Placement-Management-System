import DepartmentCard from "./DepartmentCard";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

function Departments() {
  const {
    data: departments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await api.get("/admin/departments/stats");
      return res.data;
    },
  });
  return (
    <div className=" text-teal-50">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 md:gap-12 m-6 sm:m-8">
        {isLoading ? (
          <p className="text-center text-lg mt-10">Loading departments...</p>
        ) : (
          departments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))
        )}
        {isError && (
          <p className="text-center text-lg mt-10 text-red-500">
            Failed to load departments. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

export default Departments;
