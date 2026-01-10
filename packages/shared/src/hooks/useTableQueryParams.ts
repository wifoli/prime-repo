import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface TableQueryParams {
  // Pagination
  page?: number;
  pageSize?: number;
  
  // Ordering (Django DRF style)
  ordering?: string; // "column1,-column2,column3"
  
  // Filters
  [key: string]: any;
}

export interface SortField {
  field: string;
  order: 'asc' | 'desc';
}

export interface UseTableQueryParamsResult {
  // Current values
  page: number;
  pageSize: number;
  ordering: string | undefined;
  sortFields: SortField[];
  filters: Record<string, any>;
  
  // Pagination methods
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  
  // Sorting methods (Django DRF style)
  setOrdering: (ordering: string) => void;
  addSort: (field: string, order: 'asc' | 'desc') => void;
  removeSort: (field: string) => void;
  toggleSort: (field: string) => void;
  clearSort: () => void;
  getSortOrder: (field: string) => 'asc' | 'desc' | null;
  
  // Filter methods
  setFilter: (key: string, value: any) => void;
  setFilters: (filters: Record<string, any>) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  
  // Combined
  reset: () => void;
  
  // Raw params for API calls
  toQueryString: () => string;
  toObject: () => TableQueryParams;
}

const RESERVED_PARAMS = ['page', 'pageSize', 'ordering'];

/**
 * Hook para gerenciar query params de tabelas via URL
 * Padrão Django DRF para ordenação
 */
export function useTableQueryParams(
  defaultPage: number = 1,
  defaultPageSize: number = 10
): UseTableQueryParamsResult {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse current params
  const currentParams = useMemo(() => {
    const params: TableQueryParams = {
      page: defaultPage,
      pageSize: defaultPageSize,
    };

    searchParams.forEach((value, key) => {
      if (key === 'page') {
        params.page = parseInt(value) || defaultPage;
      } else if (key === 'pageSize') {
        params.pageSize = parseInt(value) || defaultPageSize;
      } else if (key === 'ordering') {
        params.ordering = value;
      } else {
        // Filters
        try {
          params[key] = JSON.parse(value);
        } catch {
          params[key] = value;
        }
      }
    });

    return params;
  }, [searchParams, defaultPage, defaultPageSize]);

  // Parse ordering into sort fields
  const sortFields = useMemo((): SortField[] => {
    if (!currentParams.ordering) return [];

    return currentParams.ordering.split(',').map(field => {
      const trimmed = field.trim();
      if (trimmed.startsWith('-')) {
        return { field: trimmed.substring(1), order: 'desc' as const };
      }
      return { field: trimmed, order: 'asc' as const };
    });
  }, [currentParams.ordering]);

  // Get filters (exclude reserved params)
  const filters = useMemo(() => {
    const result: Record<string, any> = {};
    Object.entries(currentParams).forEach(([key, value]) => {
      if (!RESERVED_PARAMS.includes(key)) {
        result[key] = value;
      }
    });
    return result;
  }, [currentParams]);

  // Update URL with new params
  const updateParams = useCallback((updates: Partial<TableQueryParams>) => {
    const newParams = { ...currentParams, ...updates };

    // Remove undefined/null
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === undefined || newParams[key] === null || newParams[key] === '') {
        delete newParams[key];
      }
    });

    const urlParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.set(
          key,
          typeof value === 'object' ? JSON.stringify(value) : String(value)
        );
      }
    });

    setSearchParams(urlParams);
  }, [currentParams, setSearchParams]);

  // Pagination methods
  const setPage = useCallback((page: number) => {
    updateParams({ page });
  }, [updateParams]);

  const setPageSize = useCallback((size: number) => {
    updateParams({ pageSize: size, page: 1 }); // Reset to page 1 when changing size
  }, [updateParams]);

  const nextPage = useCallback(() => {
    setPage((currentParams.page || defaultPage) + 1);
  }, [currentParams.page, defaultPage, setPage]);

  const prevPage = useCallback(() => {
    const current = currentParams.page || defaultPage;
    if (current > 1) {
      setPage(current - 1);
    }
  }, [currentParams.page, defaultPage, setPage]);

  // Sorting methods (Django DRF style)
  const setOrdering = useCallback((ordering: string) => {
    updateParams({ ordering: ordering || undefined });
  }, [updateParams]);

  const addSort = useCallback((field: string, order: 'asc' | 'desc') => {
    const current = sortFields.filter(s => s.field !== field);
    const newField = order === 'desc' ? `-${field}` : field;
    const newOrdering = [...current.map(s => s.order === 'desc' ? `-${s.field}` : s.field), newField].join(',');
    setOrdering(newOrdering);
  }, [sortFields, setOrdering]);

  const removeSort = useCallback((field: string) => {
    const current = sortFields.filter(s => s.field !== field);
    const newOrdering = current.map(s => s.order === 'desc' ? `-${s.field}` : s.field).join(',');
    setOrdering(newOrdering || '');
  }, [sortFields, setOrdering]);

  const toggleSort = useCallback((field: string) => {
    const existing = sortFields.find(s => s.field === field);
    
    if (!existing) {
      // Add as ascending
      addSort(field, 'asc');
    } else if (existing.order === 'asc') {
      // Change to descending
      addSort(field, 'desc');
    } else {
      // Remove
      removeSort(field);
    }
  }, [sortFields, addSort, removeSort]);

  const clearSort = useCallback(() => {
    setOrdering('');
  }, [setOrdering]);

  const getSortOrder = useCallback((field: string): 'asc' | 'desc' | null => {
    const found = sortFields.find(s => s.field === field);
    return found ? found.order : null;
  }, [sortFields]);

  // Filter methods
  const setFilter = useCallback((key: string, value: any) => {
    updateParams({ [key]: value, page: 1 }); // Reset to page 1 when filtering
  }, [updateParams]);

  const setFilters = useCallback((newFilters: Record<string, any>) => {
    updateParams({ ...newFilters, page: 1 });
  }, [updateParams]);

  const removeFilter = useCallback((key: string) => {
    const updates = { ...currentParams };
    delete updates[key];
    updateParams(updates);
  }, [currentParams, updateParams]);

  const clearFilters = useCallback(() => {
    const updates: TableQueryParams = {
      page: currentParams.page,
      pageSize: currentParams.pageSize,
      ordering: currentParams.ordering,
    };
    updateParams(updates);
  }, [currentParams, updateParams]);

  // Reset everything
  const reset = useCallback(() => {
    updateParams({
      page: defaultPage,
      pageSize: defaultPageSize,
    });
  }, [defaultPage, defaultPageSize, updateParams]);

  // Convert to query string for API calls
  const toQueryString = useCallback((): string => {
    const params = new URLSearchParams();
    Object.entries(currentParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(
          key,
          typeof value === 'object' ? JSON.stringify(value) : String(value)
        );
      }
    });
    return params.toString();
  }, [currentParams]);

  const toObject = useCallback((): TableQueryParams => {
    return { ...currentParams };
  }, [currentParams]);

  return {
    // Current values
    page: currentParams.page || defaultPage,
    pageSize: currentParams.pageSize || defaultPageSize,
    ordering: currentParams.ordering,
    sortFields,
    filters,

    // Pagination
    setPage,
    setPageSize,
    nextPage,
    prevPage,

    // Sorting
    setOrdering,
    addSort,
    removeSort,
    toggleSort,
    clearSort,
    getSortOrder,

    // Filters
    setFilter,
    setFilters,
    removeFilter,
    clearFilters,

    // Combined
    reset,
    toQueryString,
    toObject,
  };
}
