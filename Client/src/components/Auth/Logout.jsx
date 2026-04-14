import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Logout() {

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login", { replace: true });
  };

  return (
    <div className='absolute top-24 right-4 sm:top-20 w-fit text-center text-sm mr-2 text-black flex items-center gap-1 justify-self-end  cursor-pointer rounded-2xl p-2  transition-all duration-500 bg-size-[200%_auto] bg-[linear-gradient(to_right,#e52d27_0%,#b31217_51%,#e52d27_100%)] hover:bg-right' onClick={handleClick}>
      Logout <TbLogout />
    </div>
  )
}

export default Logout
