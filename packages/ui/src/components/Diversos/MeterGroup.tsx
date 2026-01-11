import { MeterGroup as PrimeMeterGroup, MeterGroupProps as PrimeMeterGroupProps } from 'primereact/metergroup';
import { classNames } from 'primereact/utils';

export interface MeterItem {
  label: string;
  value: number;
  color?: string;
  icon?: string;
}

export interface MeterGroupProps extends Omit<PrimeMeterGroupProps, 'value'> {
  value: MeterItem[];
  min?: number;
  max?: number;
  orientation?: 'horizontal' | 'vertical';
  labelPosition?: 'start' | 'end';
  className?: string;
}

/**
 * MeterGroup - Grupo de medidores
 * Use para mostrar múltiplos valores em medidores
 * 
 * @example
 * const values = [
 *   { label: 'Apps', color: '#34d399', value: 16 },
 *   { label: 'Messages', color: '#fbbf24', value: 8 },
 *   { label: 'Media', color: '#60a5fa', value: 24 }
 * ];
 * 
 * <MeterGroup value={values} />
 */
export function MeterGroup({
  value,
  min = 0,
  max = 100,
  orientation = 'horizontal',
  labelPosition = 'end',
  className,
  ...props
}: MeterGroupProps) {
  return (
    <PrimeMeterGroup
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      labelPosition={labelPosition}
      className={classNames('metergroup-wrapper', className)}
      {...props}
    />
  );
}
