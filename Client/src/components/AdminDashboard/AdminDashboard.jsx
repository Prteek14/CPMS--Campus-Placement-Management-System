import { lazy, useState, Suspense } from "react";
import { RiAdminFill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { MdWorkOutline } from "react-icons/md";
import Logout from "../Auth/Logout";
import useInView from "../hooks/useInView";

const Overview = lazy(() => import("./Overview"));
const Departments = lazy(() => import("../Departments/Departments"));
const Job = lazy(() => import("../Jobs/Job"));
const Footer = lazy(() => import("../Footer"));

function AdminDashboard() {
  const [refresh, setRefresh] = useState(false);

  // 👇 scroll triggers
  const [deptRef, deptVisible] = useInView({ threshold: 0.2 });
  const [jobRef, jobVisible] = useInView({ threshold: 0.2 });
  const [footerRef, footerVisible] = useInView({ threshold: 0.1 });

  return (
    <div className="relative bg-linear-to-r from-[#141e30] to-[#243b55] text-white h-auto">
      {/* HEADER */}
      <div className="flex justify-between bg-linear-to-r from-[#59cde9] to-[#0a2a88]">
        <div className="flex items-center pl-2">
          <img
            src="/cpmsLOGO.webp"
            alt="college_logo"
            width={60}
            height={60}
            loading="eager"
            className="w-13 h-13 rounded-4xl shadow-lg shadow-black m-1 my-2"
          />
          <h1 className="text-xl md:text-2xl text-black p-4 font-bold">
            CPMS 
          </h1>
        </div>

        <div className="flex items-center mr-2">
          <p className="text-sm md:text-xl text-amber-100 p-2 font-semibold">
            Admin Dashboard
          </p>
          <RiAdminFill size={25} />
        </div>
      </div>

      <br />
      <Logout />

      {/* OVERVIEW (always load first) */}
      <p className="text-2xl font-semibold ml-5 flex items-center gap-1">
        <TbListDetails /> Overview
      </p>
      <Suspense fallback={<div className="p-5">Loading Overview...</div>}>
        <Overview refresh={refresh} />
      </Suspense>

      <hr className="my-6 h-0.5 border-0 bg-linear-to-r from-transparent via-gray-500 to-transparent" />

      {/* DEPARTMENTS (load on scroll) */}
      <div ref={deptRef}>
        <p className="text-2xl font-semibold ml-5 flex items-center gap-1">
          <BiCategoryAlt /> Departments
        </p>

        {deptVisible ? (
          <Suspense fallback={<div className="p-5">Loading...</div>}>
            <Departments />
          </Suspense>
        ) : (
          // 🔥 Skeleton here
          <div className="animate-pulse h-75 bg-gray-700 rounded-xl m-5"></div>
        )}
      </div>

      <hr className="my-6 h-0.5 border-0 bg-linear-to-r from-transparent via-gray-500 to-transparent" />

      {/* JOBS (load on scroll) */}
      <div ref={jobRef}>
        <p className="text-2xl font-semibold ml-5 flex items-center gap-1">
          <MdWorkOutline /> Jobs
        </p>

        {jobVisible ? (
          <Suspense fallback={<div className="p-5">Loading...</div>}>
            <Job setRefresh={setRefresh} />
          </Suspense>
        ) : (
          <div className="animate-pulse h-100 bg-gray-700 rounded-xl m-5"></div>
        )}
      </div>

      {/* FOOTER (load last) */}
      <div ref={footerRef}>
        {footerVisible && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
