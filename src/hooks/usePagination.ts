import { useState, useCallback } from 'react';

interface PaginationHookResult {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
}

export function usePagination(initialPage = 1, initialPageSize = 10): PaginationHookResult {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);

  const setPageSafe = useCallback((newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  }, [totalPages]);

  return { page, setPage: setPageSafe, pageSize, setPageSize, totalPages, setTotalPages };
}