import { PickList as PrimePickList, PickListProps as PrimePickListProps, PickListChangeEvent } from 'primereact/picklist';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface PickListProps<T = any> extends Omit<PrimePickListProps, 'source' | 'target' | 'onChange' | 'itemTemplate'> {
  source: T[];
  target: T[];
  onChange: (e: PickListChangeEvent) => void;
  itemTemplate: (item: T) => ReactNode;
  sourceHeader?: string;
  targetHeader?: string;
  filter?: boolean;
  filterBy?: string;
  sourceFilterPlaceholder?: string;
  targetFilterPlaceholder?: string;
  showSourceControls?: boolean;
  showTargetControls?: boolean;
  className?: string;
}

/**
 * PickList - Transferência de itens entre duas listas
 * Use para selecionar/mover itens de uma lista para outra
 * 
 * @example
 * <PickList
 *   source={availableProducts}
 *   target={selectedProducts}
 *   onChange={(e) => {
 *     setAvailableProducts(e.source);
 *     setSelectedProducts(e.target);
 *   }}
 *   itemTemplate={(item) => <div>{item.name}</div>}
 *   sourceHeader="Available"
 *   targetHeader="Selected"
 *   filter
 * />
 */
export function PickList<T = any>({
  source,
  target,
  onChange,
  itemTemplate,
  sourceHeader = 'Available',
  targetHeader = 'Selected',
  filter = false,
  filterBy,
  sourceFilterPlaceholder = 'Search...',
  targetFilterPlaceholder = 'Search...',
  showSourceControls = true,
  showTargetControls = true,
  className,
  ...props
}: PickListProps<T>) {
  return (
    <PrimePickList
      source={source}
      target={target}
      onChange={onChange}
      itemTemplate={itemTemplate}
      sourceHeader={sourceHeader}
      targetHeader={targetHeader}
      filter={filter}
      filterBy={filterBy}
      sourceFilterPlaceholder={sourceFilterPlaceholder}
      targetFilterPlaceholder={targetFilterPlaceholder}
      showSourceControls={showSourceControls}
      showTargetControls={showTargetControls}
      className={classNames('picklist-wrapper', className)}
      {...props}
    />
  );
}
