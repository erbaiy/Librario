import React from "react";
import backgroundImage from "../../assets/book.png"; // Import the image

export default function ArabicBooksBackground() {
  return (
    <div
      className="relative w-full h-[50vh] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-foreground/80"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Discover the masterpieces of Arabic literature
        </h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full pl-10 pr-12 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Icon (left side) */}
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.2-5.85a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
