import { NavLink, useLocation } from "react-router-dom";

function AuthNavbar() {
  const location = useLocation();
  const isStudent = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="flex justify-center">
      <div className="relative flex items-center bg-gray-100 border border-gray-200 rounded-full p-1 w-fit shadow-inner">
        {/* Sliding pill */}
        <span
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-blue-600 shadow-md transition-all duration-500 ease-in-out ${
            isStudent ? "left-1" : "left-[calc(50%+2px)]"
          }`}
        />

        <NavLink
          to="/"
          className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            isStudent ? "text-white" : "text-slate-800 hover:text-blue-400"
          }`}
        >
          Student
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
              isActive ? "text-slate-100" : "text-slate-800 hover:text-blue-400"
            }`
          }
        >
          Admin
        </NavLink>
      </div>
    </div>
  );
}

export default AuthNavbar;
