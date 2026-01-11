import { Chip as PrimeChip, ChipProps as PrimeChipProps } from 'primereact/chip';
import { classNames } from 'primereact/utils';

export interface ChipProps extends PrimeChipProps {
  label?: string;
  icon?: string;
  image?: string;
  removable?: boolean;
  removeIcon?: string;
  onRemove?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

/**
 * Chip - Chip de informação compacta
 * Use para tags, filtros selecionados, etc
 * 
 * @example
 * <Chip label="Action" icon="pi pi-check" />
 * <Chip label="Comedy" icon="pi pi-star" removable onRemove={handleRemove} />
 * <Chip label="John Doe" image="user.jpg" />
 */
export function Chip({
  label,
  icon,
  image,
  removable = false,
  removeIcon = 'pi pi-times-circle',
  onRemove,
  className,
  ...props
}: ChipProps) {
  return (
    <PrimeChip
      label={label}
      icon={icon}
      image={image}
      removable={removable}
      removeIcon={removeIcon}
      onRemove={onRemove}
      className={classNames('chip-wrapper', className)}
      {...props}
    />
  );
}
