import { lazy, Suspense } from "react";
import { RiAdminFill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import Logout from "../Auth/Logout";
import { Link } from "react-router-dom";
import useInView from "../hooks/useInView";

// 🔥 Lazy load
const StudentOverview = lazy(() => import("./StudentOverview"));
const StudentJobs = lazy(() => import("./StudentJobs"));
const Footer = lazy(() => import("../Footer"));

function StudentDashboard() {

  // 👇 scroll triggers
  const [jobsRef, jobsVisible] = useInView({ threshold: 0.2 });
  const [footerRef, footerVisible] = useInView({ threshold: 0.1 });

  return (
    <div className="bg-linear-to-r from-[#141e30] to-[#243b55] text-white min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between bg-linear-to-r from-[#59cde9] to-[#0a2a88]">
        <div className="flex items-center pl-2">
          <img
            src="cpmsLOGO.webp"
            alt="college_logo"
            width={60}
            height={60}
            loading="eager"
            fetchPriority="high"
            className="w-13 h-13 rounded-4xl shadow-lg shadow-black m-1 my-2"
          />
          <h1 className="text-xl md:text-3xl text-black p-2 md:p-4 font-bold">
            CPMS
          </h1>
        </div>

        <div className="flex items-center mr-2">
          <p className="text-lg md:text-2xl text-amber-100 p-2 md:p-4 font-semibold">
            Student Dashboard
          </p>

          <div className="border-2 p-2 rounded-4xl bg-[#edfaff] cursor-pointer hover:bg-blue-400 transition-colors duration-300">
            <Link to="/studentprofile">
              <RiAdminFill size={25} className="text-black" />
            </Link>
          </div>
        </div>
      </div>

      <br />
      <Logout />
      <br />

      {/* OVERVIEW */}
      <p className="text-2xl font-semibold ml-5 flex items-center gap-1">
        <TbListDetails /> Overview
      </p>

      <Suspense
        fallback={
          <div className="animate-pulse h-50 bg-gray-700 rounded-xl m-5"></div>
        }
      >
        <StudentOverview />
      </Suspense>

      <hr className="my-6 h-0.5 border-0 bg-linear-to-r from-transparent via-gray-500 to-transparent" />

      {/* JOBS (scroll-based) */}
      <div ref={jobsRef}>
        {jobsVisible ? (
          <Suspense
            fallback={
              <div className="animate-pulse h-75 bg-gray-700 rounded-xl m-5"></div>
            }
          >
            <StudentJobs />
          </Suspense>
        ) : (
          <div className="animate-pulse h-75 bg-gray-700 rounded-xl m-5"></div>
        )}
      </div>

      {/* FOOTER */}
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

export default StudentDashboard;