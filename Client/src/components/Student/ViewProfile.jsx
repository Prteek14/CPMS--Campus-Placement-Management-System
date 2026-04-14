// import { useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";

function ViewProfile({ profile, handleEdit }) {
  return (
    <>
      <div className="flex justify-end m-2">
        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-200 cursor-pointer"
          onClick={handleEdit}
        >
          <LiaUserEditSolid size={20} />
          Edit Profile
        </button>
      </div>
      <div
        className={` p-2 mr-2 rounded-lg cursor-pointer transition w-fit flex justify-self-end text-slate-950 font-bold ${
          profile.isVerified
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {profile.isVerified ? "Verified" : "Unverified"}
      </div>
      <div className="max-w-6xl mx-auto px-6 text-black flex flex-col justify-center gap-2 md:gap-4 ">
        <div className="bg-[#ebf2ff] rounded-2xl w-70 p-2 mx-auto text-center mt-2">
          <h1 className="text-xl md:text-4xl capitalize font-bold">
            {profile.studentName}
          </h1>
          <p className="text-lg capitalize ">{profile.studentId}</p>
        </div>
        <div className="bg-gray-200 rounded-2xl p-2 mx-auto w-4/5 ">
          <p className="text-xl font-semibold text-gray-700">
            Personal Information
          </p>
          <hr className=" border-gray-600" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pl-4  ">
            <p>
              <span className="text-gray-900 text-lg font-bold">E-mail :</span>
              <br />
              {profile.studentEmail}
            </p>
            <p>
              <span className="text-gray-900 text-lg font-bold">Phone :</span>
              <br />
              {profile.phoneNumber}
            </p>
            <p>
              <span className="text-gray-900 text-lg font-bold">Address :</span>
              <br />
              {profile.address}
            </p>
            <p>
              <span className="text-gray-900 text-lg font-bold">
                Date Of Birth :
              </span>
              <br />
              {profile.dob
                ? new Date(profile.dob).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-blue-100 rounded-2xl p-2 mx-auto w-4/5 ">
          <p className="text-xl font-semibold text-blue-700">
            Acadamic Details
          </p>
          <hr className=" border-gray-600" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pl-4  ">
            <p>
              <span className="text-gray-900 text-lg font-bold">
                10<sup>th</sup> Percentage :
              </span>
              <br />
              {profile.tenthResult}
            </p>
            <p>
              <span className="text-gray-900 text-lg font-bold">
                12<sup>th</sup> Percentage :
              </span>
              <br />
              {profile.twelfthResult}
            </p>
            <p>
              <span className="text-lg font-bold">Department :</span> <br />
              {profile.department?.name}
            </p>
            <p>
              <span className="text-lg font-bold">Branch :</span>
              <br />
              {profile.branch?.name}
            </p>
            <p>
              <span className="text-lg font-bold">Year :</span>
              <br />
              {profile.year}
            </p>
            <p>
              <span className="text-lg font-bold">Active Backlogs :</span>
              <br />
              {profile.activeBacklogs}
            </p>
            <p>
              <span className="text-lg font-bold">Graduation Percentage :</span>
              <br />
              {profile.graduationResult}
            </p>
            <p>
              <span className="text-lg font-bold">
                Post Graduation Percentage :
              </span>
              <br />
              {profile.pgResult}
            </p>
          </div>
        </div>
        <div className="bg-green-100 rounded-2xl p-2 mx-auto w-4/5 mb-2 ">
          <p className="text-xl font-semibold text-green-700">Resume</p>
          <p className="text-slate-800 text-xs pl-2 p-1">
            your first impression is your Resume!
          </p>
          <hr className="mb-4 border-gray-600" />
          <div>
            <p className="text-lg font-bold inline-block px-2">Resume :</p>
            {profile.resume?.url ? (
              <a
                href={profile.resume.url}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-white text-center text-sm px-2 py-1 ml-2 bg-sky-400 hover:bg-sky-500 rounded-xl"
              >
                View Resume
              </a>
            ) : (
              <p>No Resume Uploaded</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProfile;
