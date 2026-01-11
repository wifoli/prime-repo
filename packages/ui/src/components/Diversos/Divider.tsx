import { Divider as PrimeDivider, DividerProps as PrimeDividerProps } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface DividerProps extends PrimeDividerProps {
  align?: 'left' | 'center' | 'right' | 'top' | 'center' | 'bottom';
  layout?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed' | 'dotted';
  children?: ReactNode;
  className?: string;
}

/**
 * Divider - Divisor visual (PrimeReact)
 * Use para separar visualmente seções de conteúdo
 * 
 * @example
 * <Divider />
 * <Divider align="center">OR</Divider>
 * <Divider layout="vertical" />
 * <Divider type="dashed" />
 */
export function Divider({
  align = 'center',
  layout = 'horizontal',
  type = 'solid',
  children,
  className,
  ...props
}: DividerProps) {
  return (
    <PrimeDivider
      align={align}
      layout={layout}
      type={type}
      className={classNames('divider-wrapper', className)}
      {...props}
    >
      {children}
    </PrimeDivider>
  );
}
