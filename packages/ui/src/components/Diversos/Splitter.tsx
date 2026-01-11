import { Splitter as PrimeSplitter, SplitterProps as PrimeSplitterProps, SplitterPanel } from 'primereact/splitter';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface SplitterProps extends PrimeSplitterProps {
  layout?: 'horizontal' | 'vertical';
  gutterSize?: number;
  stateKey?: string;
  stateStorage?: 'session' | 'local';
  onResizeEnd?: (e: { sizes: number[] }) => void;
  className?: string;
  children: ReactNode;
}

/**
 * Splitter - Divisor redimensionável
 * Use para criar painéis redimensionáveis
 * 
 * @example
 * <Splitter style={{ height: '300px' }}>
 *   <SplitterPanel size={30}>
 *     Left Panel
 *   </SplitterPanel>
 *   <SplitterPanel size={70}>
 *     Right Panel
 *   </SplitterPanel>
 * </Splitter>
 * 
 * <Splitter layout="vertical" style={{ height: '300px' }}>
 *   <SplitterPanel size={50}>Top</SplitterPanel>
 *   <SplitterPanel size={50}>Bottom</SplitterPanel>
 * </Splitter>
 */
export function Splitter({
  layout = 'horizontal',
  gutterSize = 4,
  stateKey,
  stateStorage = 'session',
  onResizeEnd,
  className,
  children,
  ...props
}: SplitterProps) {
  return (
    <PrimeSplitter
      layout={layout}
      gutterSize={gutterSize}
      stateKey={stateKey}
      stateStorage={stateStorage}
      onResizeEnd={onResizeEnd}
      className={classNames('splitter-wrapper', className)}
      {...props}
    >
      {children}
    </PrimeSplitter>
  );
}

// Re-export SplitterPanel
export { SplitterPanel };
