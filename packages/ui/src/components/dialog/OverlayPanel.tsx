import { OverlayPanel as PrimeOverlayPanel, OverlayPanelProps as PrimeOverlayPanelProps } from 'primereact/overlaypanel';
import { classNames } from 'primereact/utils';
import { ReactNode, forwardRef } from 'react';

export interface OverlayPanelProps extends PrimeOverlayPanelProps {
  children: ReactNode;
  dismissable?: boolean;
  showCloseIcon?: boolean;
  className?: string;
}

/**
 * OverlayPanel - Painel sobreposto
 * Use para mostrar conteúdo adicional ao clicar em um elemento
 * 
 * @example
 * const op = useRef(null);
 * 
 * <Button label="Show" onClick={(e) => op.current.toggle(e)} />
 * <OverlayPanel ref={op}>
 *   Panel content
 * </OverlayPanel>
 */
export const OverlayPanel = forwardRef<PrimeOverlayPanel, OverlayPanelProps>(
  ({ children, dismissable = true, showCloseIcon = false, className, ...props }, ref) => {
    return (
      <PrimeOverlayPanel
        ref={ref}
        dismissable={dismissable}
        showCloseIcon={showCloseIcon}
        className={classNames('overlay-panel-wrapper', className)}
        {...props}
      >
        {children}
      </PrimeOverlayPanel>
    );
  }
);

OverlayPanel.displayName = 'OverlayPanel';
