import { Tree as PrimeTree, TreeProps as PrimeTreeProps, TreeNodeClickEvent, TreeSelectionEvent, TreeExpandedKeysType } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface TreeProps extends Omit<PrimeTreeProps, 'value'> {
  value: TreeNode[];
  selectionMode?: 'single' | 'multiple' | 'checkbox';
  selectionKeys?: any;
  onSelectionChange?: (e: TreeSelectionEvent) => void;
  expandedKeys?: TreeExpandedKeysType;
  onToggle?: (e: { value: TreeExpandedKeysType }) => void;
  filter?: boolean;
  filterMode?: 'strict' | 'lenient';
  filterPlaceholder?: string;
  loading?: boolean;
  nodeTemplate?: (node: TreeNode) => ReactNode;
  className?: string;
}

/**
 * Tree - Árvore hierárquica navegável
 * Use para estruturas de dados hierárquicas (pastas, categorias, etc)
 * 
 * @example
 * const nodes = [
 *   {
 *     key: '0',
 *     label: 'Documents',
 *     icon: 'pi pi-folder',
 *     children: [
 *       { key: '0-0', label: 'Work', icon: 'pi pi-folder', children: [...] },
 *       { key: '0-1', label: 'Home', icon: 'pi pi-folder' }
 *     ]
 *   }
 * ];
 * 
 * <Tree
 *   value={nodes}
 *   selectionMode="checkbox"
 *   selectionKeys={selectedKeys}
 *   onSelectionChange={(e) => setSelectedKeys(e.value)}
 *   filter
 * />
 */
export function Tree({
  value,
  selectionMode,
  selectionKeys,
  onSelectionChange,
  expandedKeys,
  onToggle,
  filter = false,
  filterMode = 'lenient',
  filterPlaceholder = 'Search...',
  loading = false,
  nodeTemplate,
  className,
  ...props
}: TreeProps) {
  return (
    <PrimeTree
      value={value}
      selectionMode={selectionMode}
      selectionKeys={selectionKeys}
      onSelectionChange={onSelectionChange}
      expandedKeys={expandedKeys}
      onToggle={onToggle}
      filter={filter}
      filterMode={filterMode}
      filterPlaceholder={filterPlaceholder}
      loading={loading}
      nodeTemplate={nodeTemplate}
      className={classNames('tree-wrapper', className)}
      {...props}
    />
  );
}
