import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">

      {/* 🔝 Header */}
      <div className="flex items-center justify-center bg-amber-100 shadow-md">
        <img
          src="/cpmsLOGO.webp"
          alt="CPMS logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg shadow-black m-2"
        />
        <h1 className="text-lg sm:text-2xl md:text-3xl text-black font-bold">
          CPMS
        </h1>
      </div>

      {/* ❌ Error Content */}
      <div className="flex-1 flex items-center justify-center px-4">

        <div className="text-center text-white max-w-xl w-full">

          {/* 404 */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold animate-[bounce_2s_infinite]">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Page not found. Looks like you took a wrong turn 👀
          </p>

          {/* Button */}
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 rounded-full font-semibold
            bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600
            bg-size-[200%_auto] hover:bg-right transition-all duration-500
            shadow-lg hover:shadow-cyan-400/50"
          >
            Go Back Home
          </Link>

        </div>

      </div>
    </div>
  );
}

export default ErrorPage;