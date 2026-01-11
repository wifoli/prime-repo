import { Tag as PrimeTag, TagProps as PrimeTagProps } from 'primereact/tag';
import { classNames } from 'primereact/utils';

export interface TagProps extends PrimeTagProps {
  value?: string | number;
  severity?: 'success' | 'info' | 'warning' | 'danger' | null;
  rounded?: boolean;
  icon?: string;
  className?: string;
}

/**
 * Tag - Tag de status/categoria
 * Use para categorias, tags, status
 * 
 * @example
 * <Tag value="New" severity="success" />
 * <Tag value="Sale" severity="danger" icon="pi pi-tag" />
 * <Tag value="Pending" severity="warning" rounded />
 */
export function Tag({
  value,
  severity = null,
  rounded = false,
  icon,
  className,
  ...props
}: TagProps) {
  return (
    <PrimeTag
      value={value}
      severity={severity}
      rounded={rounded}
      icon={icon}
      className={classNames('tag-wrapper', className)}
      {...props}
    />
  );
}
