import { useState } from "react";
import Modal from "../Modal";
import { X, SlidersHorizontal } from "lucide-react";
import AlphabetGrid from "./AlphabetGrid";

export default function FilterLetterModal({
  isOpen,
  handleClose,
  letterSelected,
  handleLetterChange,
  resetPage,
}) {
  function handleSelect(letter) {
    handleLetterChange((prev) => (prev === letter ? null : letter));
    resetPage();
  }

  function handleClear() {
    handleLetterChange(null);
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      {/* Modal Header */}
      <header className="flex items-center justify-between mb-1">
        <h3 className="text-base font-medium text-gray-900 flex items-center gap-2">
          <SlidersHorizontal size={16} /> Filter by letter
        </h3>
        <button
          onClick={handleClose}
          className="cursor-pointer p-1 rounded-lg hover:bg-gray-100 text-gray-400"
        >
          <X size={16} />
        </button>
      </header>

      {/* Letters Grid */}
      <AlphabetGrid
        selected={letterSelected}
        handleSelectLetter={handleSelect}
      />

      <hr className="border-gray-100 mb-4" />

      {/* Selected Letter */}
      <div className="flex items-center gap-2 mb-5 min-h-[28px]">
        <span className="text-sm text-gray-400">Selected:</span>
        {letterSelected ? (
          <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-300 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
            {letterSelected}
            <button className="text-orange-400 hover:text-orange-600">
              <X size={12} onClick={handleClear} />
            </button>
          </span>
        ) : (
          <span className="text-sm text-gray-300 italic">none</span>
        )}
      </div>

      {/* Footer */}
      <footer className="flex justify-end gap-2">
        <button
          onClick={handleClear}
          className="cursor-pointer px-4 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </footer>
    </Modal>
  );
}
