import { ProgressBar as PrimeProgressBar, ProgressBarProps as PrimeProgressBarProps } from 'primereact/progressbar';
import { classNames } from 'primereact/utils';

export interface ProgressBarProps extends PrimeProgressBarProps {
  value?: number;
  showValue?: boolean;
  mode?: 'determinate' | 'indeterminate';
  color?: string;
  className?: string;
}

/**
 * ProgressBar - Barra de progresso
 * Use para mostrar progresso de operações
 * 
 * @example
 * <ProgressBar value={50} />
 * <ProgressBar mode="indeterminate" />
 * <ProgressBar value={75} showValue={false} />
 */
export function ProgressBar({
  value,
  showValue = true,
  mode = 'determinate',
  color,
  className,
  ...props
}: ProgressBarProps) {
  return (
    <PrimeProgressBar
      value={value}
      showValue={showValue}
      mode={mode}
      color={color}
      className={classNames('progressbar-wrapper', className)}
      {...props}
    />
  );
}
