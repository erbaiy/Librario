import React from 'react';

function PopUpSuccess({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold text-green-600">Registration Successful!</h2>
        <p className="mt-2 text-gray-700">
          You have registered successfully. Please check your email for verification.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          aria-label="Close success message"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PopUpSuccess;
