import { Outlet } from "react-router-dom";
import AuthNavbar from "../Navs/AuthNavbar";
import Footer from "../Footer";

function AuthLayout() {
  return (
    <div className="flex flex-col gap-10 min-h-screen bg-slate-900 text-white ">
      <div className="flex bg-amber-100 items-center justify-center">
        <img
          src="/cpmsLOGO.webp"
          alt="college logo"
          className="w-13 h-13 rounded-4xl shadow-lg shadow-black m-1 my-2"
        />
        <h1 className="text-center sm:text-3xl text-black p-2  font-bold ">
          College Placement Management System
        </h1>
      </div>
      <div className="w-full flex flex-1 items-center justify-center gap-10 p-4 sm:flex-wrap ">
        <div className="hidden sm:block lg:flex-1/6 lg:ml-4">
          <img
            src="invertis_university.webp"
            alt="college_image"
            className="h-full w-full object-cover rounded-2xl shadow-lg shadow-cyan-200"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <AuthNavbar />
          <br />
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AuthLayout;
