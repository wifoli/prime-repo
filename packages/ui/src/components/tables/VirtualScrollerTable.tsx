import { DataTable as PrimeDataTable, DataTableProps as PrimeDataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';
import { DataTableColumn, DataTableSorting } from './DataTable';

export interface VirtualScrollerTableProps<T = any> extends Omit<PrimeDataTableProps<T[]>, 'value' | 'virtualScrollerOptions'> {
  data: T[];
  columns: DataTableColumn[];
  
  // Virtual Scroller
  itemSize?: number; // Height of each row in pixels
  scrollHeight?: string; // Height of scrollable area (e.g., "400px")
  
  // Sorting
  sorting?: DataTableSorting;
  
  // Loading state
  loading?: boolean;
  loadingItems?: number; // Number of skeleton rows to show
  
  // Empty state
  emptyMessage?: string | ReactNode;
  
  // Selection
  selection?: T | T[];
  onSelectionChange?: (e: { value: T | T[] }) => void;
  selectionMode?: 'single' | 'multiple' | 'checkbox' | 'radiobutton';
  
  // Lazy loading
  onLazyLoad?: (event: { first: number; last: number }) => void;
  
  // Style
  striped?: boolean;
  gridlines?: boolean;
  showHeader?: boolean;
  
  className?: string;
}

/**
 * DataTable com Virtual Scroller para grandes volumes de dados
 * Renderiza apenas os itens visíveis
 */
export function VirtualScrollerTable<T = any>({
  data,
  columns,
  itemSize = 50,
  scrollHeight = '400px',
  sorting,
  loading = false,
  loadingItems = 10,
  emptyMessage = 'Nenhum registro encontrado',
  selection,
  onSelectionChange,
  selectionMode,
  onLazyLoad,
  striped = true,
  gridlines = false,
  showHeader = true,
  className,
  ...props
}: VirtualScrollerTableProps<T>) {

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

  // Create loading data for skeleton
  const loadingData = loading 
    ? Array.from({ length: loadingItems }, (_, i) => ({ id: `loading-${i}` }))
    : [];

  return (
    <div className={classNames('virtual-scroller-table-wrapper', className)}>
      <PrimeDataTable
        value={loading ? loadingData : data}
        scrollable
        scrollHeight={scrollHeight}
        virtualScrollerOptions={{
          itemSize,
          onLazyLoad: onLazyLoad as any,
        }}
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
            body={loading ? () => <div className="h-4 bg-gray-200 rounded animate-pulse" /> : col.body}
            sortable={false}
            style={col.bodyStyle}
            headerStyle={col.headerStyle}
            {...col}
          />
        ))}
      </PrimeDataTable>
    </div>
  );
}
