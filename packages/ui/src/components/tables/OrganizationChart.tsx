import { OrganizationChart as PrimeOrganizationChart, OrganizationChartProps as PrimeOrganizationChartProps, OrganizationChartNodeSelectEvent } from 'primereact/organizationchart';
import { TreeNode } from 'primereact/treenode';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface OrganizationChartProps extends Omit<PrimeOrganizationChartProps, 'value'> {
  value: TreeNode[];
  selectionMode?: 'single' | 'multiple';
  selection?: any;
  onSelectionChange?: (e: OrganizationChartNodeSelectEvent) => void;
  nodeTemplate?: (node: TreeNode) => ReactNode;
  className?: string;
}

/**
 * OrganizationChart - Gráfico de organização hierárquica
 * Use para mostrar estruturas organizacionais (hierarquia de empresa, etc)
 * 
 * @example
 * const data = [{
 *   label: 'CEO',
 *   expanded: true,
 *   data: { name: 'John Doe', avatar: 'user.jpg' },
 *   children: [
 *     { label: 'Manager 1', data: { name: 'Jane Smith' } },
 *     { label: 'Manager 2', data: { name: 'Bob Johnson' } }
 *   ]
 * }];
 * 
 * <OrganizationChart
 *   value={data}
 *   nodeTemplate={(node) => (
 *     <div className="text-center">
 *       <div className="font-bold">{node.label}</div>
 *       <div className="text-sm text-gray-600">{node.data.name}</div>
 *     </div>
 *   )}
 * />
 */
export function OrganizationChart({
  value,
  selectionMode,
  selection,
  onSelectionChange,
  nodeTemplate,
  className,
  ...props
}: OrganizationChartProps) {
  return (
    <PrimeOrganizationChart
      value={value}
      selectionMode={selectionMode}
      selection={selection}
      onSelectionChange={onSelectionChange}
      nodeTemplate={nodeTemplate}
      className={classNames('org-chart', className)}
      {...props}
    />
  );
}
