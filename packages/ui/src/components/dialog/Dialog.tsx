import { Dialog as PrimeDialog, DialogProps as PrimeDialogProps } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface DialogProps extends PrimeDialogProps {
  visible: boolean;
  onHide: () => void;
  header?: string | ReactNode;
  footer?: ReactNode;
  modal?: boolean;
  closable?: boolean;
  dismissableMask?: boolean;
  maximizable?: boolean;
  blockScroll?: boolean;
  className?: string;
}

/**
 * Dialog - Modal dialog
 * Use para mostrar conteúdo em modal
 * 
 * @example
 * <Dialog
 *   visible={visible}
 *   onHide={() => setVisible(false)}
 *   header="Dialog Header"
 *   footer={
 *     <div>
 *       <Button label="Cancel" onClick={() => setVisible(false)} />
 *       <Button label="Save" onClick={handleSave} />
 *     </div>
 *   }
 *   style={{ width: '50vw' }}
 * >
 *   Dialog content
 * </Dialog>
 */
export function Dialog({
  visible,
  onHide,
  header,
  footer,
  modal = true,
  closable = true,
  dismissableMask = false,
  maximizable = false,
  blockScroll = true,
  className,
  children,
  ...props
}: DialogProps) {
  return (
    <PrimeDialog
      visible={visible}
      onHide={onHide}
      header={header}
      footer={footer}
      modal={modal}
      closable={closable}
      dismissableMask={dismissableMask}
      maximizable={maximizable}
      blockScroll={blockScroll}
      className={classNames('dialog-wrapper', className)}
      {...props}
    >
      {children}
    </PrimeDialog>
  );
}
