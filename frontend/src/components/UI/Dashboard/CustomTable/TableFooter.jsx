import { ChevronLeft, ChevronRight } from "lucide-react";
import NavigationButton from "../../Pagination/NavigationButton";
import { useEffect, useState } from "react";

export default function TableFooter({
  isPlaceholderData,
  page,
  totalPages,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  function handleInputChange(e) {
    setCurrentPage(e.target.value);

    const val = parseInt(e.target.value);

    if (isNaN(val)) return;
    if (val > totalPages) return onPageChange(totalPages);
    if (val < 1) return onPageChange(1);
    onPageChange(val);
  }

  function handleNextClick() {
    onPageChange((prevPage) => {
      if (prevPage + 1 > totalPages) return totalPages;
      return prevPage + 1;
    });
  }

  function handlePreviousClick() {
    onPageChange((prevPage) => {
      if (prevPage - 1 < 1) return 1;
      return prevPage - 1;
    });
  }

  if (!page || !totalPages || !onPageChange) return null;

  return (
    <footer className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
      <NavigationButton
        onClick={handlePreviousClick}
        disabled={page === 1 || isPlaceholderData}
      >
        <ChevronLeft size={15} /> Previous
      </NavigationButton>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <input
          type="number"
          min={1}
          max={totalPages}
          step={1}
          value={currentPage}
          onChange={handleInputChange}
          className="w-10 h-8.5 text-center text-sm text-gray-700 font-medium border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition-colors"
        />
        <span>of</span>
        <input
          type="text"
          value={totalPages}
          disabled
          className="w-10 h-8.5 text-center text-sm text-gray-400 bg-gray-50 border border-gray-100 rounded-lg outline-none cursor-not-allowed"
        />
      </div>

      <NavigationButton
        onClick={handleNextClick}
        disabled={page === totalPages || isPlaceholderData}
      >
        Next <ChevronRight size={15} />
      </NavigationButton>
    </footer>
  );
}
