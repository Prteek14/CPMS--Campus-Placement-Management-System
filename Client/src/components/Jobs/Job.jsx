import JobForm from "./JobForm";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Job( {setRefresh} ) {
  return (
    <div className="m-4 mb-0">
      <p className="w-fit text-center text-lg text-black flex items-center gap-1 justify-start mt-4 ml-8 cursor-pointer rounded-2xl p-2  transition-all duration-500 bg-size-[200%_auto] bg-[linear-gradient(to_right,#02AAB0_0%,#00CDAC_51%,#02AAB0_100%)] hover:bg-right">
        <Link
          to="/jobdashboard"
        >
          View Jobs Status
        </Link>
        <FaAnglesRight />
      </p>
      <JobForm setRefresh={setRefresh} />
      <br />
    </div>
  );
}

export default Job;
