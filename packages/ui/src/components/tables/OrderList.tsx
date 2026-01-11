import { OrderList as PrimeOrderList, OrderListProps as PrimeOrderListProps, OrderListChangeEvent } from 'primereact/orderlist';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface OrderListProps<T = any> extends Omit<PrimeOrderListProps, 'value' | 'onChange' | 'itemTemplate'> {
  value: T[];
  onChange: (e: OrderListChangeEvent) => void;
  itemTemplate: (item: T) => ReactNode;
  header?: string;
  filter?: boolean;
  filterBy?: string;
  filterPlaceholder?: string;
  dragdrop?: boolean;
  className?: string;
}

/**
 * OrderList - Lista ordenável de itens
 * Use para permitir usuário reordenar itens em uma lista
 * 
 * @example
 * <OrderList
 *   value={items}
 *   onChange={(e) => setItems(e.value)}
 *   itemTemplate={(item) => <div>{item.name}</div>}
 *   header="Products"
 *   dragdrop
 *   filter
 * />
 */
export function OrderList<T = any>({
  value,
  onChange,
  itemTemplate,
  header,
  filter = false,
  filterBy,
  filterPlaceholder = 'Search...',
  dragdrop = true,
  className,
  ...props
}: OrderListProps<T>) {
  return (
    <PrimeOrderList
      value={value}
      onChange={onChange}
      itemTemplate={itemTemplate}
      header={header}
      filter={filter}
      filterBy={filterBy}
      filterPlaceholder={filterPlaceholder}
      dragdrop={dragdrop}
      className={classNames('w-full', className)}
      {...props}
    />
  );
}
