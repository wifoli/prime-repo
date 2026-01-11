import { ConfirmDialog as PrimeConfirmDialog, ConfirmDialogProps as PrimeConfirmDialogProps, confirmDialog } from 'primereact/confirmdialog';

export interface ConfirmDialogProps extends PrimeConfirmDialogProps {
}

/**
 * ConfirmDialog - Dialog de confirmação global
 * Use o serviço confirmDialog() para mostrar confirmações
 * 
 * @example
 * // No root do app:
 * <ConfirmDialog />
 * 
 * // Para usar:
 * import { confirmDialog } from 'primereact/confirmdialog';
 * 
 * confirmDialog({
 *   message: 'Are you sure you want to proceed?',
 *   header: 'Confirmation',
 *   icon: 'pi pi-exclamation-triangle',
 *   accept: () => handleDelete(),
 *   reject: () => console.log('Cancelled')
 * });
 */
export function ConfirmDialog(props: ConfirmDialogProps) {
  return <PrimeConfirmDialog {...props} />;
}

// Re-export confirmDialog service
export { confirmDialog };
