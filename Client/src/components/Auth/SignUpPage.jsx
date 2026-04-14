import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", formData);
      toast.info(res.data?.message, {
        position: "top-right",
        autoClose: 5000,
        icon: <FaCheckCircle color="white" size={20} />,
        style: {
          background: "linear-gradient(to right, #009ffc, #1da1f2)", // better direction
          color: "#fff", // ❗ white text for contrast
          borderRadius: "12px", // cleaner than rem here
          fontWeight: "600",
          padding: "12px 16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        },
        bodyClassName: "text-sm",
      });

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      // ✅ store full user data
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/studentprofile");
    } catch (err) {
      
      toast.error(err.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        icon: <FaCheckCircle color="white" size={20} />,
        style: {
          background: "linear-gradient(to right, #93291e, #ed213a)", // better direction
          color: "#fff", // ❗ white text for contrast
          borderRadius: "12px", // cleaner than rem here
          fontWeight: "600",
          padding: "12px 16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        },
        bodyClassName: "text-sm",
      });
    }
  };

  return (
    <div className="w-full px-4">
      <h1 className="text-4xl font-bold ">Create an account</h1>
      <p className="text-slate-400 p-2">Connecting talent with opportunity.</p>
      <br />
      <form onSubmit={handleSubmit} className="md:pr-8">
        <input
          name="studentName"
          type="text"
          placeholder="Name"
          value={formData.studentName}
          onChange={handleChange}
          className="w-full p-2 border-2 border-gray-300 rounded-md mb-4"
        />

        <input
          name="studentEmail"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border-2 border-gray-300 rounded-md mb-4"
        />

        <div className="relative w-full mb-4">
          <input
            name="studentPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.studentPassword}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md"
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="border border-[#26D0CE] font-bold hover:shadow-[0_0_10px_#26D0CE] rounded-2xl p-2 w-full text-center text-lg cursor-pointer transition-all duration-500 bg-size-[200%_auto] bg-linear-to-r from-[#1A2980] via-[#26D0CE] to-[#1A2980] hover:bg-right"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center mt-2 ">
        Already have an account?
        <Link to="login" className="text-purple-500 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
