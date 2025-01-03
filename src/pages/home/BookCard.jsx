import React, { useEffect, useState } from "react";
import bookPlaceholder from "../../assets/book.png";
import axiosInstance from "../../config/axios";
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';







const BookCard = ({ book }) => {
 const borrow = async () => {
  try {
    const currentUser = await getCurrentUser();
    await axiosInstance.post("/borrow", {
      bookId: book._id,
      userId: currentUser.userId
    });
  } catch (err) {
    console.log(err);
  }
}


  
  return (
    <div className="rounded-lg shadow-lg bg-gray-100 border border-gray-300 p-5 transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-48 overflow-hidden rounded-md relative bg-gradient-to-br from-white-50 to-white-100">
        <img
          src={book.image || bookPlaceholder}
          alt={book.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 truncate">
          {book.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1 italic">{book.author}</p>
      </div>

      <div className="mt-6 flex justify-center">
        <button  onClick={borrow} className="bg-gray-800 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-all">
          Borrow
        </button>
      </div>
    </div>
  );
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/books");
        setBooks(response.data);

        console.log("Books fetched:", response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }

    };

    fetchBooks();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = books.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full bg-white">
      <div className="text-center relative mb-16 mt-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Library Collection</h1>
        <p className="text-gray-600">Discover our extensive collection of literary classics</p>
        <div className="absolute left-1/2 -translate-x-1/2 h-16 w-px bg-gray-300 mt-4"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      {/* Styled Pagination Component */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-800 border rounded-md shadow hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === page + 1
                ? "bg-gray-500 text-white"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-gray-800 border rounded-md shadow hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;