import { Dialog } from 'primereact/dialog';
import { Button } from '@prime-repo/ui';

export interface ConfirmDialogProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: string;
  severity?: 'info' | 'warning' | 'danger' | 'success';
}

/**
 * Confirm dialog component
 */
export function ConfirmDialog({
  visible,
  onHide,
  onConfirm,
  title = 'Confirmação',
  message = 'Você tem certeza?',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  icon = 'pi pi-question-circle',
  severity = 'warning',
}: ConfirmDialogProps) {
  const severityColors = {
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    success: 'text-green-600',
  };

  const severityVariants = {
    info: 'primary' as const,
    warning: 'warning' as const,
    danger: 'danger' as const,
    success: 'success' as const,
  };

  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  const footer = (
    <div className="flex gap-2 justify-end">
      <Button
        label={cancelLabel}
        onClick={onHide}
        variant="secondary"
      />
      <Button
        label={confirmLabel}
        onClick={handleConfirm}
        variant={severityVariants[severity]}
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={title}
      footer={footer}
      style={{ width: '450px' }}
      modal
    >
      <div className="flex items-start gap-4">
        <i className={`${icon} text-4xl ${severityColors[severity]}`}></i>
        <p className="text-gray-700 flex-1">{message}</p>
      </div>
    </Dialog>
  );
}
