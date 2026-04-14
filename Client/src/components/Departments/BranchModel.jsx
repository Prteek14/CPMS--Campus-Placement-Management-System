import { IoClose } from "react-icons/io5";
import departmentData from "../Student/Departments";
import { Link } from "react-router-dom";

function BranchModel({ isOpen, onClose, department }) {

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs rounded-2xl z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-300 text-black p-6 rounded-xl shadow-lg max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-3 hover:cursor-pointer"
          onClick={onClose}
        >
          <IoClose size={20} />
        </button>

        <div className="mx-4">
          {departmentData[department].map((branch) => {
            return (
              <Link to={`/branch/${branch}`} key={branch}>
              <div
                className="bg-slate-800 text-white text-sm p-2 border border-slate-300 rounded-2xl w-full m-1 hover:cursor-pointer hover:scale-[1.04] transition duration-200"
              >
                {branch}
              </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default BranchModel;
