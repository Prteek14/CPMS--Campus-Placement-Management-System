import { FaAnglesRight } from "react-icons/fa6";
import { useState } from "react";
import departmentData from "../Student/Departments";
import BranchModel from "./BranchModel";

function DepartmentCard({ department }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full mx-auto bg-linear-to-r from-[#606c88] to-[#3f4c6b] border border-amber-100 rounded-2xl p-4 hover:shadow-lg hover:shadow-cyan-300 transition duration-300">
      <h2 className="text-center text-2xl font-bold text-cyan-300 mb-4">
        {department.name}
      </h2>

      <ul className="space-y-3 text-sm md:text-[16px]">
        <li className="flex justify-between bg-gray-800/80 p-3 rounded-lg">
          <span>Branches</span>
          <span className="font-semibold text-white">
            {departmentData[department.name]?.length || 0}
          </span>
        </li>

        <li className="flex justify-between bg-gray-800/80 p-3 rounded-lg">
          <span>Total Students</span>
          <span className="font-semibold text-white">
            {department.totalStudents}
          </span>
        </li>

        <li className="flex justify-between bg-gray-800/80 p-3 rounded-lg">
          <span>Job Openings</span>
          <span className="font-semibold text-white">
            {department.jobOpenings}
          </span>
        </li>

        <li className="flex justify-between bg-gray-800/80 p-3 rounded-lg">
          <span>Approved Students</span>
          <span className="font-semibold text-green-400">
            {department.approvedStudents}
          </span>
        </li>
      </ul>

      <div className="flex justify-end mt-4">
        <button
          className=" w-fit text-center text-sm text-white flex items-center gap-1 justify-start mt-4 ml-8 cursor-pointer rounded-xl p-2  transition-all duration-500 bg-size-[200%_auto] bg-[linear-gradient(to_right,#ff0084_0%,#33001b_51%,#ff0084_100%)] hover:bg-right "
          onClick={() => setOpen(true)}
        >
          View Branches <FaAnglesRight size={12} />
        </button>
      </div>
      <BranchModel
        isOpen={open}
        onClose={() => setOpen(false)}
        department={department.name}
      />
    </div>
  );
}

export default DepartmentCard;
