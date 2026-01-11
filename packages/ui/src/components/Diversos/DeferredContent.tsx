import { DeferredContent as PrimeDeferredContent, DeferredContentProps as PrimeDeferredContentProps } from 'primereact/deferredcontent';
import { ReactNode } from 'react';

export interface DeferredContentProps extends PrimeDeferredContentProps {
  onLoad?: (e: Event) => void;
  children: ReactNode;
}

/**
 * DeferredContent - Carregamento lazy de conteúdo
 * Use para carregar conteúdo apenas quando visível (lazy loading)
 * 
 * @example
 * <DeferredContent onLoad={loadData}>
 *   <DataTable value={data} />
 * </DeferredContent>
 */
export function DeferredContent({
  onLoad,
  children,
  ...props
}: DeferredContentProps) {
  return (
    <PrimeDeferredContent onLoad={onLoad} {...props}>
      {children}
    </PrimeDeferredContent>
  );
}
