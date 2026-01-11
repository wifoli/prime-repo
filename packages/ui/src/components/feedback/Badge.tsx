import { Badge as PrimeBadge, BadgeProps as PrimeBadgeProps } from 'primereact/badge';
import { classNames } from 'primereact/utils';

export interface BadgeProps extends PrimeBadgeProps {
  value?: string | number;
  severity?: 'success' | 'info' | 'warning' | 'danger' | null;
  size?: 'normal' | 'large' | 'xlarge';
  className?: string;
}

/**
 * Badge - Badge indicador (PrimeReact)
 * Use para contadores, notificações ou status
 * 
 * @example
 * <Badge value="2" severity="danger" />
 * <Badge value="New" severity="success" />
 * 
 * // Com overlay em botão:
 * <Button label="Messages" className="p-overlay-badge">
 *   <Badge value="5" />
 * </Button>
 */
export function Badge({
  value,
  severity = null,
  size = 'normal',
  className,
  ...props
}: BadgeProps) {
  return (
    <PrimeBadge
      value={value}
      severity={severity}
      size={size}
      className={classNames('badge-wrapper', className)}
      {...props}
    />
  );
}
