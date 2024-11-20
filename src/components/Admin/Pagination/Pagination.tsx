import React from 'react';

interface PaginationProps {
  currentPage: number; 
  totalPages: number;  
  onPageChange: (page: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-3 mt-4">
      
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-300 transition-all duration-200'}`}
      >
        Previous
      </button>
  
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`w-10 h-10 border rounded-full flex items-center justify-center ${page === currentPage ? 'bg-blue-800 text-white' : 'hover:bg-blue-700 transition-all duration-200'}`}
        >
          {page}
        </button>
      ))}
  
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-700 transition-all duration-200'}`}
      >
        Next
      </button>
    </div>
  );
}  

export default Pagination;
