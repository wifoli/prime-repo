import { DataView as PrimeDataView, DataViewProps as PrimeDataViewProps, DataViewLayoutOptions } from 'primereact/dataview';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface DataViewProps<T = any> extends Omit<PrimeDataViewProps, 'value'> {
  value: T[];
  itemTemplate: (item: T, layout: 'list' | 'grid') => ReactNode;
  
  // Pagination
  paginated?: boolean;
  page?: number;
  pageSize?: number;
  totalRecords?: number;
  onPageChange?: (event: PaginatorPageChangeEvent) => void;
  
  // Layout
  layout?: 'list' | 'grid';
  onLayoutChange?: (layout: 'list' | 'grid') => void;
  
  // Loading
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

/**
 * DataView - Exibição de dados em grid ou lista
 * Use para mostrar coleções de dados com layouts alternativos (grid/list)
 * 
 * @example
 * <DataView
 *   value={products}
 *   itemTemplate={(product, layout) => (
 *     layout === 'grid' ? <ProductGridItem product={product} /> : <ProductListItem product={product} />
 *   )}
 *   layout={layout}
 *   onLayoutChange={setLayout}
 *   paginated
 *   page={page}
 *   pageSize={10}
 *   totalRecords={100}
 *   onPageChange={(e) => setPage(e.page)}
 * />
 */
export function DataView<T = any>({
  value,
  itemTemplate,
  paginated = false,
  page = 0,
  pageSize = 10,
  totalRecords,
  onPageChange,
  layout = 'list',
  onLayoutChange,
  loading = false,
  emptyMessage = 'No items found',
  className,
  ...props
}: DataViewProps<T>) {
  const header = onLayoutChange && (
    <div className="flex justify-end">
      <DataViewLayoutOptions 
        layout={layout} 
        onChange={(e) => onLayoutChange(e.value as 'list' | 'grid')} 
      />
    </div>
  );

  return (
    <div className={classNames('dataview-wrapper', className)}>
      <PrimeDataView
        value={value}
        itemTemplate={(item) => itemTemplate(item, layout)}
        layout={layout}
        header={header}
        emptyMessage={emptyMessage}
        loading={loading}
        {...props}
      />
      
      {paginated && totalRecords !== undefined && (
        <Paginator
          first={page * pageSize}
          rows={pageSize}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
          className="mt-4"
        />
      )}
    </div>
  );
}
