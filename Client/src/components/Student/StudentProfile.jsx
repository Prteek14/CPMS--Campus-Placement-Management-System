import { TfiBackRight } from "react-icons/tfi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import Footer from "../Footer";
import api from "../../api/axios";
import { toast } from "react-toastify";

function StudentProfile() {
  const [profile, setProfile] = useState(null);

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.data;

        if (data.message === "Not authorized") {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        setProfile(data); // ✅ real data
      } catch (err) {
        toast.error("Error fetching profile");
        
      }
    };

    fetchProfile();
  });

  if (!profile) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-[#141e30] to-[#243b55] text-gray-200  md:w-full">
      <div className="flex justify-between bg-linear-to-r from-[#59cde9] to-[#0a2a88]">
        <div className="flex items-center pl-2">
          <img
            src="cpmsLOGO.webp"
            alt="colleg_logo"
            className="w-13 h-13 rounded-4xl shadow-lg shadow-black m-1 my-2"
          />
          <h1 className="text-lg text-center md:text-3xl text-black p-4 font-bold ">
            CPMS
          </h1>
        </div>
        <div className="flex items-center mr-2">
          <p className="text-base text-center md:text-2xl text-amber-100 p-4 font-semibold">
            Student Dashboard
          </p>
          <div className="p-2 border rounded-4xl bg-[#edfaff] font-semibold hover:bg-blue-500 transition-colors duration-500">
            <Link to="/studentdashboard">
              <TfiBackRight className="text-black" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Profile */}
      {edit ? (
        <EditProfile setEdit={setEdit} setProfile={setProfile} />
      ) : (
        <ViewProfile profile={profile} handleEdit={handleEdit} />
      )}
      <Footer />
    </div>
  );
}

export default StudentProfile;
