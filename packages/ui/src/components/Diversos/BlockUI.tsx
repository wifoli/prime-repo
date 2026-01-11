import { BlockUI as PrimeBlockUI, BlockUIProps as PrimeBlockUIProps } from 'primereact/blockui';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface BlockUIProps extends PrimeBlockUIProps {
  blocked: boolean;
  fullScreen?: boolean;
  template?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * BlockUI - Bloquear interface durante operação
 * Use para bloquear interação durante loading
 * 
 * @example
 * <BlockUI blocked={loading}>
 *   <Panel header="Content">
 *     Content that will be blocked
 *   </Panel>
 * </BlockUI>
 * 
 * <BlockUI blocked={loading} fullScreen />
 */
export function BlockUI({
  blocked,
  fullScreen = false,
  template,
  className,
  children,
  ...props
}: BlockUIProps) {
  return (
    <PrimeBlockUI
      blocked={blocked}
      fullScreen={fullScreen}
      template={template}
      className={classNames('blockui-wrapper', className)}
      {...props}
    >
      {children}
    </PrimeBlockUI>
  );
}
