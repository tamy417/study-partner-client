import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-blue-50 to-white px-4">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-blue-300"></div>

        <div className="w-24 h-24 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin shadow-lg"></div>

        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <svg
            className="w-6 h-6 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M12 2v6l4 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold text-blue-700">
        StudyMate is loading…
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Preparing your study space — one sec
      </p>

      <div className="flex items-center gap-2 mt-4">
        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse delay-150" />
        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse delay-300" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
