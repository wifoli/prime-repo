import { useState, useCallback, useMemo } from 'react';

export interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

export interface PaginationResult {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  reset: () => void;
}

/**
 * Hook for pagination logic
 */
export function usePagination(options: PaginationOptions = {}): PaginationResult {
  const {
    initialPage = 1,
    initialPageSize = 10,
    totalItems: initialTotal = 0,
  } = options;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(initialTotal);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize) || 1;
  }, [totalItems, pageSize]);

  // Check if has next/prev page
  const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPrevPage = useMemo(() => page > 1, [page]);

  // Go to specific page
  const goToPage = useCallback((newPage: number) => {
    const targetPage = Math.max(1, Math.min(newPage, totalPages));
    setPage(targetPage);
  }, [totalPages]);

  // Next page
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(p => p + 1);
    }
  }, [hasNextPage]);

  // Previous page
  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setPage(p => p - 1);
    }
  }, [hasPrevPage]);

  // Change page size
  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1); // Reset to first page
  }, []);

  // Reset pagination
  const reset = useCallback(() => {
    setPage(initialPage);
    setPageSize(initialPageSize);
    setTotalItems(initialTotal);
  }, [initialPage, initialPageSize, initialTotal]);

  return {
    page,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    setPageSize: changePageSize,
    setTotalItems,
    reset,
  };
}
