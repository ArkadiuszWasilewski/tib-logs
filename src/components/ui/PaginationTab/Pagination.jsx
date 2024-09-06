import React, { useState } from "react";
import ButtonPagination from "./ButtonPagination";
import ButtonNavigation from "./ButtonNavigation";

const Pagination = ({ totalPages = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (typeof page === "string") {
      if (page === "Previous" && currentPage > 1)
        setCurrentPage(currentPage - 1);
      else if (page === "Next" && currentPage < totalPages)
        setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-base h-10">
        <ButtonNavigation
          direction="Previous"
          onPageChange={handlePageChange}
          isDisabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <ButtonPagination
              key={pageNumber}
              page={pageNumber}
              isActive={pageNumber === currentPage}
              onPageChange={handlePageChange}
            />
          );
        })}
        <ButtonNavigation
          direction="Next"
          onPageChange={handlePageChange}
          isDisabled={currentPage === totalPages}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
