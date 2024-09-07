import React from "react";
import ButtonPagination from "./ButtonPagination";
import ButtonNavigation from "./ButtonNavigation";
import { usePokemonContext } from "../../../context/PokemonContext";

const Pagination = () => {
  const { currentPage, setCurrentPage, filteredPokemon, itemsPerPage } =
    usePokemonContext();

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const maxVisiblePages = 5;

  const handlePageChange = (page) => {
    if (typeof page === "string") {
      if (page === "Previous" && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (page === "Next" && currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if reaching the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Include the first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add the middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Include the last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center">
      <ul className="inline-flex -space-x-px text-base h-10 mt-[30px]">
        <ButtonNavigation
          direction="Previous"
          onPageChange={handlePageChange}
          isDisabled={currentPage === 1}
        />
        {getPageNumbers().map((pageNumber, index) =>
          typeof pageNumber === "number" ? (
            <ButtonPagination
              key={index}
              page={pageNumber}
              isActive={pageNumber === currentPage}
              onPageChange={handlePageChange}
            />
          ) : (
            <li key={index} className="px-3 py-2">
              ...
            </li>
          )
        )}
        <ButtonNavigation
          direction="Next"
          onPageChange={handlePageChange}
          isDisabled={currentPage === totalPages}
        />
      </ul>
    </div>
  );
};

export default Pagination;
