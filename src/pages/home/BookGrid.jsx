import React from 'react';
import BookImage from '../../assets/book.png';

const BookGrid = () => {
  return (
    <div className="grid grid-cols-3 w-screen bg-gray-50 py-16">
      <div className="relative px-8 flex flex-col items-center">
        <div className="bg-white p-4 shadow-lg mb-8 w-4/5">
          <img
            src={BookImage}
            alt="No Trade Is Free"
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-3xl font-bold text-center leading-tight text-gray-800">
          Éloge du<br />
          <span className="text-[1.95rem]">protectionnisme</span>
        </h2>
      </div>

      <div className="relative px-8 flex flex-col items-center mt-32">
        <div className="bg-white p-4 shadow-lg mb-8 w-4/5">
          <img
            src={BookImage}
            alt="Man-Devil"
            className="w-full h-auto bg-orange-600"
          />
        </div>
        <h2 className="text-3xl font-bold text-center mt-4 text-gray-800">
          Éloge du vice
        </h2>
      </div>

      <div className="relative px-8 flex flex-col items-center">
        <div className="bg-white p-4 shadow-lg mb-8 w-4/5">
          <img
            src={BookImage}
            alt="Notre Titanic"
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800">
          « Notre Titanic »
        </h2>
      </div>
    </div>
  );
};

export default BookGrid;