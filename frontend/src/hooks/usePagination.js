import { useState } from "react";

export function usePagination(defaultLimit = 10) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  function handleLimitChange(val) {
    setLimit(val);
    setPage(1);
  }

  function resetPage() {
    setPage(1);
  }

  return {
    page,
    limit,
    totalPages,
    setPage,
    setTotalPages,
    handleLimitChange,
    resetPage,
  };
}
