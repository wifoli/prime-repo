import { ReactElement, cloneElement } from 'react';
import { classNames } from 'primereact/utils';
import type { UseFormResult } from '../hooks';

export interface FormFieldProps<T extends Record<string, any>> {
  children: ReactElement;
  name: keyof T;
  label?: string;
  description?: string;
  required?: boolean;
  form?: UseFormResult<T>;
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
export function FormField<T extends Record<string, any>>({
  children,
  name,
  label,
  description,
  required = false,
  form,
  showError = true,
  className,
}: FormFieldProps<T>) {
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
          htmlFor={name as string}
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
