import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Message */}
      <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export default Loader;
