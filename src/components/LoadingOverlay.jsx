import React from "react";

const LoadingOverlay = ({ message = "Processing your request..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;