import React from 'react';
import bookImage from '../../assets/book.png';

const BlogPreview = () => {
  return (
    <div className="w-full bg-white px-4">
      <div className="text-center relative mb-32 mt-16">
        <h1 className="text-lg font-medium tracking-wider text-gray-800">
          DERNIERS ARTICLES
        </h1>
        <div className="absolute left-1/2 -translate-x-1/2 h-16 w-px bg-gray-300 mt-4"></div>
      </div>

      <div className="flex justify-center gap-24 w-full">
        <div className="flex-1 max-w-md">
          <div className="text-gray-400 text-sm mb-3">GUY LESCHZINER</div>
          <img
            src={bookImage}
            alt="Seven Deadly Sins book cover"
            className="w-full h-auto shadow-lg mb-3"
          />
          <div className="text-sm text-gray-600">The Biology of Being Human</div>
        </div>

        <div className="flex-1 max-w-xl pt-12">
          <div className="mb-4">
            <span className="text-red-500 uppercase text-sm tracking-wider font-medium">
              Pathologies
            </span>
          </div>
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            Circonstances atténuantes
          </h2>
          <div className="text-sm text-gray-600">
            par <span className="hover:text-gray-900 cursor-pointer">Books</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;