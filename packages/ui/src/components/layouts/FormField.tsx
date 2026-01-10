import { ReactNode, ReactElement, cloneElement } from 'react';
import { classNames } from 'primereact/utils';
import type { UseFormResult } from '@prime-repo/shared/hooks';

export interface FormFieldProps {
  children: ReactElement;
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  form?: UseFormResult;
  showError?: boolean;
  className?: string;
}

/**
 * FormField - Wrapper inteligente para campos de formulário
 * 
 * Adiciona automaticamente:
 * - Label com indicador de obrigatório
 * - Descrição/helper text
 * - Mensagem de erro (integrado com useForm)
 * - Estados de erro visual
 */
export function FormField({
  children,
  name,
  label,
  description,
  required = false,
  form,
  showError = true,
  className,
}: FormFieldProps) {
  // Obter erro e touched do form se fornecido
  const error = form?.errors[name];
  const touched = form?.touched[name];
  const hasError = showError && touched && !!error;

  // Clonar o input child e adicionar props do form
  const enhancedChild = form
    ? cloneElement(children, {
        value: form.values[name] ?? '',
        onChange: form.handleChange(name),
        onBlur: form.handleBlur(name),
        error: hasError,
        name,
      } as any)
    : cloneElement(children, {
        error: hasError,
        name,
      } as any);

  return (
    <div className={classNames('flex flex-col gap-1.5', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input */}
      <div>{enhancedChild}</div>

      {/* Description ou Error */}
      {hasError ? (
        <span className="text-sm text-red-500 flex items-center gap-1">
          <i className="pi pi-exclamation-circle text-xs" />
          {error}
        </span>
      ) : description ? (
        <span className="text-sm text-gray-600">{description}</span>
      ) : null}
    </div>
  );
}

/**
 * FormSection - Seção de formulário com título e descrição
 */
export interface FormSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  divider?: boolean;
  className?: string;
}

export function FormSection({
  children,
  title,
  description,
  divider = false,
  className,
}: FormSectionProps) {
  return (
    <div className={classNames('space-y-4', className)}>
      {(title || description) && (
        <div className={classNames('space-y-1', { 'pb-4 border-b border-gray-200': divider })}>
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * FormActions - Container para ações do formulário (botões)
 */
export interface FormActionsProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  sticky?: boolean;
  className?: string;
}

export function FormActions({
  children,
  align = 'right',
  sticky = false,
  className,
}: FormActionsProps) {
  const alignMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={classNames(
        'flex items-center gap-3 pt-6 mt-6 border-t border-gray-200',
        alignMap[align],
        {
          'sticky bottom-0 bg-white shadow-lg -mx-6 px-6 -mb-6 pb-6': sticky,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * FormGroup - Agrupa múltiplos campos relacionados
 */
export interface FormGroupProps {
  children: ReactNode;
  label?: string;
  description?: string;
  className?: string;
}

export function FormGroup({
  children,
  label,
  description,
  className,
}: FormGroupProps) {
  return (
    <fieldset className={classNames('space-y-3', className)}>
      {(label || description) && (
        <legend className="space-y-1">
          {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
          {description && <div className="text-sm text-gray-600">{description}</div>}
        </legend>
      )}
      <div className="space-y-3">{children}</div>
    </fieldset>
  );
}
