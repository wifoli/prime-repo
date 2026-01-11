import { Sidebar as PrimeSidebar, SidebarProps as PrimeSidebarProps } from 'primereact/sidebar';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface SidebarProps extends PrimeSidebarProps {
  visible: boolean;
  onHide: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom' | 'full';
  fullScreen?: boolean;
  modal?: boolean;
  dismissable?: boolean;
  showCloseIcon?: boolean;
  blockScroll?: boolean;
  header?: ReactNode;
  icons?: ReactNode;
  className?: string;
}

/**
 * Sidebar - Painel lateral
 * Use para navegação, filtros ou conteúdo adicional lateral
 * 
 * @example
 * <Sidebar
 *   visible={visible}
 *   onHide={() => setVisible(false)}
 *   position="right"
 *   header="Filters"
 * >
 *   <div>Sidebar content</div>
 * </Sidebar>
 */
export function Sidebar({
  visible,
  onHide,
  position = 'left',
  fullScreen = false,
  modal = true,
  dismissable = true,
  showCloseIcon = true,
  blockScroll = true,
  header,
  icons,
  className,
  children,
  ...props
}: SidebarProps) {
  return (
    <PrimeSidebar
      visible={visible}
      onHide={onHide}
      position={position}
      fullScreen={fullScreen}
      modal={modal}
      dismissable={dismissable}
      showCloseIcon={showCloseIcon}
      blockScroll={blockScroll}
      header={header}
      icons={icons}
      className={classNames('sidebar-wrapper', className)}
      {...props}
    >
      {children}
    </PrimeSidebar>
  );
}
