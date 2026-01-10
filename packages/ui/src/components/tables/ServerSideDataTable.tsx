import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataTableColumn, DataTableProps } from './DataTable';
import { useTableQueryParams } from '@prime-repo/shared/hooks';

export interface ServerSideDataTableProps<T = any> extends Omit<DataTableProps<T>, 'data' | 'pagination' | 'sorting' | 'loading'> {
  // Data fetching
  fetchData: (params: {
    page: number;
    pageSize: number;
    ordering?: string;
    filters: Record<string, any>;
  }) => Promise<{
    data: T[];
    total: number;
  }>;
  
  // Columns
  columns: DataTableColumn[];
  
  // Optional overrides
  defaultPageSize?: number;
  rowsPerPageOptions?: number[];
  
  // Auto-fetch on mount
  autoFetch?: boolean;
  
  // Loading overlay
  loadingOverlay?: boolean;
}

/**
 * DataTable com integração automática com useTableQueryParams
 * Gerencia paginação, ordenação e filtros via URL (padrão Django DRF)
 */
export function ServerSideDataTable<T = any>({
  fetchData,
  columns,
  defaultPageSize = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  autoFetch = true,
  loadingOverlay = true,
  ...props
}: ServerSideDataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const tableParams = useTableQueryParams(1, defaultPageSize);

  // Fetch data from server
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchData({
        page: tableParams.page,
        pageSize: tableParams.pageSize,
        ordering: tableParams.ordering,
        filters: tableParams.filters,
      });
      
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [fetchData, tableParams.page, tableParams.pageSize, tableParams.ordering, tableParams.filters]);

  // Auto-fetch when params change
  useEffect(() => {
    if (autoFetch) {
      loadData();
    }
  }, [loadData, autoFetch]);

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loadingOverlay && loading}
      pagination={{
        page: tableParams.page,
        pageSize: tableParams.pageSize,
        totalRecords: total,
        onPageChange: tableParams.setPage,
        onPageSizeChange: tableParams.setPageSize,
        rowsPerPageOptions,
      }}
      sorting={{
        ordering: tableParams.ordering,
        onSort: tableParams.toggleSort,
        getSortOrder: tableParams.getSortOrder,
      }}
      lazy
      {...props}
    />
  );
}

/**
 * Exemplo de uso:
 * 
 * const fetchUsers = async ({ page, pageSize, ordering, filters }) => {
 *   const queryString = new URLSearchParams({
 *     page: String(page),
 *     page_size: String(pageSize),
 *     ...(ordering && { ordering }),
 *     ...filters
 *   }).toString();
 *   
 *   const response = await fetch(`/api/users?${queryString}`);
 *   const json = await response.json();
 *   
 *   return {
 *     data: json.results,
 *     total: json.count
 *   };
 * };
 * 
 * <ServerSideDataTable
 *   fetchData={fetchUsers}
 *   columns={[
 *     { field: 'id', header: 'ID', sortable: true },
 *     { field: 'name', header: 'Nome', sortable: true },
 *     { field: 'email', header: 'Email', sortable: true },
 *   ]}
 * />
 */
