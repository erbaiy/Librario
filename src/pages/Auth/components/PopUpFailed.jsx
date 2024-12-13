import React from 'react';

function PopUpFailed({ show, error, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold text-red-600">Registration Failed!</h2>
        <p className="mt-2 text-gray-700">{error || "Something went wrong, please try again."}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          aria-label="Close error message"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PopUpFailed;
