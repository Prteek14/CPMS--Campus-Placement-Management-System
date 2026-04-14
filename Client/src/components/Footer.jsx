import React from "react";

function Footer() {
  return (
    <div className=" text-xs md:text-base bg-blue-900 p-1 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-around w-full text-center sm:text-left text-white gap-2 ">
      <img
        src="/cpmsLOGO.webp"
        width={20}
        alt="college logo"
        className="w-15 mt-1 mx-auto sm:mx-0 shadow-lg shadow-slate-900 rounded-2xl"
      />
      <div className="w-0.5 h-12  bg-gray-400 hidden lg:block"></div>
      <p className="px-2">
        Address of Specific University
      </p>
      <div className="w-0.5 h-12 bg-gray-400 hidden lg:block"></div>
      <p className="px-2">
        Copyright © 2026 CPMS, All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
