import { DataTable as PrimeDataTable, DataTableProps as PrimeDataTableProps } from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface DataTableColumn extends Omit<ColumnProps, 'sortable'> {
  field: string;
  header: string;
  sortable?: boolean;
  body?: (data: any) => ReactNode;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  filter?: boolean;
  filterElement?: ReactNode;
}

export interface DataTablePagination {
  page: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  rowsPerPageOptions?: number[];
}

export interface DataTableSorting {
  ordering?: string;
  onSort: (field: string) => void;
  getSortOrder: (field: string) => 'asc' | 'desc' | null;
}

export interface DataTableProps<T = any> extends Omit<PrimeDataTableProps<T[]>, 'value' | 'paginator' | 'rows'> {
  data: T[];
  columns: DataTableColumn[];
  
  // Pagination (external)
  pagination?: DataTablePagination;
  
  // Sorting (Django DRF via URL)
  sorting?: DataTableSorting;
  
  // Loading state
  loading?: boolean;
  
  // Empty state
  emptyMessage?: string | ReactNode;
  
  // Selection
  selection?: T | T[];
  onSelectionChange?: (e: { value: T | T[] }) => void;
  selectionMode?: 'single' | 'multiple' | 'checkbox' | 'radiobutton';
  
  // Style
  striped?: boolean;
  gridlines?: boolean;
  showHeader?: boolean;
  
  // Other
  lazy?: boolean;
  className?: string;
}

/**
 * DataTable wrapper com suporte a paginação externa e ordenação Django DRF
 */
export function DataTable<T = any>({
  data,
  columns,
  pagination,
  sorting,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado',
  selection,
  onSelectionChange,
  selectionMode,
  striped = true,
  gridlines = false,
  showHeader = true,
  lazy = true,
  className,
  ...props
}: DataTableProps<T>) {
  
  // Handle sort
  const handleSort = (field: string) => {
    if (sorting) {
      sorting.onSort(field);
    }
  };

  // Get sort icon
  const getSortIcon = (field: string): ReactNode => {
    if (!sorting) return null;
    
    const order = sorting.getSortOrder(field);
    
    if (order === 'asc') {
      return <i className="pi pi-sort-up ml-2 text-blue-600" />;
    } else if (order === 'desc') {
      return <i className="pi pi-sort-down ml-2 text-blue-600" />;
    }
    return <i className="pi pi-sort-alt ml-2 text-gray-400" />;
  };

  // Custom header template with sort
  const headerTemplate = (column: DataTableColumn) => {
    return (
      <div 
        className={classNames(
          'flex items-center',
          { 'cursor-pointer select-none': column.sortable }
        )}
        onClick={() => column.sortable && handleSort(column.field)}
      >
        <span>{column.header}</span>
        {column.sortable && getSortIcon(column.field)}
      </div>
    );
  };

  return (
    <div className={classNames('datatable-wrapper', className)}>
      <PrimeDataTable
        value={data}
        lazy={lazy}
        loading={loading}
        emptyMessage={emptyMessage}
        stripedRows={striped}
        showGridlines={gridlines}
        showHeaders={showHeader}
        selection={selection}
        onSelectionChange={onSelectionChange}
        selectionMode={selectionMode}
        dataKey="id"
        className="border rounded-lg overflow-hidden"
        {...props}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={headerTemplate(col)}
            body={col.body}
            sortable={false} // We handle sort manually
            style={col.bodyStyle}
            headerStyle={col.headerStyle}
            filter={col.filter}
            filterElement={col.filterElement}
            {...col}
          />
        ))}
      </PrimeDataTable>

      {pagination && (
        <Paginator
          first={(pagination.page - 1) * pagination.pageSize}
          rows={pagination.pageSize}
          totalRecords={pagination.totalRecords}
          rowsPerPageOptions={pagination.rowsPerPageOptions || [10, 25, 50, 100]}
          onPageChange={(e: PaginatorPageChangeEvent) => {
            const newPage = Math.floor(e.first / e.rows) + 1;
            if (newPage !== pagination.page) {
              pagination.onPageChange(newPage);
            }
            if (e.rows !== pagination.pageSize) {
              pagination.onPageSizeChange(e.rows);
            }
          }}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
          currentPageReportTemplate="{first} a {last} de {totalRecords} registros"
          className="mt-4"
        />
      )}
    </div>
  );
}
