import { useState, useCallback, useMemo } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import { SortOrder } from 'primereact/api';

/**
 * Interface para parâmetros de query da tabela
 */
export interface TableQueryParams<TFilters = Record<string, any>> {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: SortOrder;
  filters?: TFilters;
}

/**
 * Interface para resposta paginada do servidor
 */
export interface PaginatedResponse<TData> {
  data: TData[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Interface para o estado da tabela
 */
export interface TableState<TFilters = Record<string, any>> {
  first: number;
  rows: number;
  sortField?: string;
  sortOrder?: SortOrder;
  filters?: DataTableFilterMeta;
  customFilters?: TFilters;
}

/**
 * Retorno do hook
 */
export interface UseTableQueryParamsReturn<TData, TFilters = Record<string, any>> {
  // Estado
  tableState: TableState<TFilters>;
  queryParams: TableQueryParams<TFilters>;
  isLoading: boolean;
  data: TData[];
  totalRecords: number;
  
  // Ações
  onPage: (event: any) => void;
  onSort: (event: any) => void;
  onFilter: (event: any) => void;
  setCustomFilters: (filters: Partial<TFilters>) => void;
  resetFilters: () => void;
  refetch: () => void;
  
  // Helpers
  getCurrentPage: () => number;
  getTotalPages: () => number;
}

/**
 * Configuração do hook
 */
export interface UseTableQueryParamsConfig<TData, TFilters = Record<string, any>> {
  fetchFn: (params: TableQueryParams<TFilters>) => Promise<PaginatedResponse<TData>>;
  initialPageSize?: number;
  initialSortField?: string;
  initialSortOrder?: SortOrder;
  initialFilters?: TFilters;
  onError?: (error: Error) => void;
}

/**
 * Hook para gerenciar state de tabelas com paginação server-side
 * 
 * @template TData - Tipo dos dados da tabela
 * @template TFilters - Tipo dos filtros customizados
 * 
 * @example
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * interface UserFilters {
 *   status?: 'active' | 'inactive';
 *   role?: string;
 *   searchTerm?: string;
 * }
 * 
 * const {
 *   tableState,
 *   data,
 *   totalRecords,
 *   isLoading,
 *   onPage,
 *   onSort,
 *   setCustomFilters
 * } = useTableQueryParams<User, UserFilters>({
 *   fetchFn: fetchUsers,
 *   initialPageSize: 10
 * });
 * ```
 */
export function useTableQueryParams<TData, TFilters = Record<string, any>>({
  fetchFn,
  initialPageSize = 10,
  initialSortField,
  initialSortOrder = 0,
  initialFilters,
  onError,
}: UseTableQueryParamsConfig<TData, TFilters>): UseTableQueryParamsReturn<TData, TFilters> {
  
  // Estado da tabela
  const [tableState, setTableState] = useState<TableState<TFilters>>({
    first: 0,
    rows: initialPageSize,
    sortField: initialSortField,
    sortOrder: initialSortOrder,
    customFilters: initialFilters,
  });

  // Estado dos dados
  const [data, setData] = useState<TData[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Calcula parâmetros de query baseados no estado atual
  const queryParams = useMemo<TableQueryParams<TFilters>>(() => ({
    page: Math.floor(tableState.first / tableState.rows) + 1,
    pageSize: tableState.rows,
    sortField: tableState.sortField,
    sortOrder: tableState.sortOrder,
    filters: tableState.customFilters,
  }), [tableState]);

  // Fetch de dados
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchFn(queryParams);
      setData(response.data);
      setTotalRecords(response.total);
    } catch (error) {
      console.error('Error fetching table data:', error);
      if (onError) {
        onError(error as Error);
      }
      setData([]);
      setTotalRecords(0);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, fetchFn, onError]);

  // Efeito para buscar dados quando os parâmetros mudarem
  useState(() => {
    fetchData();
  });

  // Handler de paginação
  const onPage = useCallback((event: any) => {
    setTableState(prev => ({
      ...prev,
      first: event.first,
      rows: event.rows,
    }));
  }, []);

  // Handler de ordenação
  const onSort = useCallback((event: any) => {
    setTableState(prev => ({
      ...prev,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
      first: 0, // Reset para primeira página ao ordenar
    }));
  }, []);

  // Handler de filtros do DataTable
  const onFilter = useCallback((event: any) => {
    setTableState(prev => ({
      ...prev,
      filters: event.filters,
      first: 0, // Reset para primeira página ao filtrar
    }));
  }, []);

  // Setter de filtros customizados
  const setCustomFilters = useCallback((filters: Partial<TFilters>) => {
    setTableState(prev => ({
      ...prev,
      customFilters: {
        ...(prev.customFilters || {}),
        ...filters,
      } as TFilters,
      first: 0, // Reset para primeira página ao filtrar
    }));
  }, []);

  // Reset de filtros
  const resetFilters = useCallback(() => {
    setTableState(prev => ({
      ...prev,
      filters: undefined,
      customFilters: initialFilters,
      first: 0,
    }));
  }, [initialFilters]);

  // Refetch manual
  const refetch = useCallback(() => {
    setFetchTrigger(prev => prev + 1);
    fetchData();
  }, [fetchData]);

  // Helpers
  const getCurrentPage = useCallback(() => {
    return Math.floor(tableState.first / tableState.rows) + 1;
  }, [tableState.first, tableState.rows]);

  const getTotalPages = useCallback(() => {
    return Math.ceil(totalRecords / tableState.rows);
  }, [totalRecords, tableState.rows]);

  return {
    // Estado
    tableState,
    queryParams,
    isLoading,
    data,
    totalRecords,
    
    // Ações
    onPage,
    onSort,
    onFilter,
    setCustomFilters,
    resetFilters,
    refetch,
    
    // Helpers
    getCurrentPage,
    getTotalPages,
  };
}
