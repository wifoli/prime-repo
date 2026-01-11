import { ProgressSpinner as PrimeProgressSpinner, ProgressSpinnerProps as PrimeProgressSpinnerProps } from 'primereact/progressspinner';
import { classNames } from 'primereact/utils';

export interface ProgressSpinnerProps extends PrimeProgressSpinnerProps {
  strokeWidth?: string;
  fill?: string;
  animationDuration?: string;
  className?: string;
}

/**
 * ProgressSpinner - Spinner de loading
 * Use para indicar carregamento
 * 
 * @example
 * <ProgressSpinner />
 * <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
 */
export function ProgressSpinner({
  strokeWidth = '2',
  fill = 'transparent',
  animationDuration = '2s',
  className,
  ...props
}: ProgressSpinnerProps) {
  return (
    <PrimeProgressSpinner
      strokeWidth={strokeWidth}
      fill={fill}
      animationDuration={animationDuration}
      className={classNames('progress-spinner-wrapper', className)}
      {...props}
    />
  );
}
