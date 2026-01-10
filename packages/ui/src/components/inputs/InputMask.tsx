import { InputMask as PrimeInputMask, InputMaskProps as PrimeInputMaskProps } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface InputMaskProps extends Omit<PrimeInputMaskProps, 'onChange'> {
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
    label?: string;
    required?: boolean;
    startAddon?: ReactNode;
    endAddon?: ReactNode;
    onChange?: (value: string) => void;
}

export const InputMask = ({
    fullWidth = false,
    error = false,
    helperText,
    label,
    required = false,
    className,
    id,
    startAddon,
    endAddon,
    onChange,
    ...props
}: InputMaskProps) => {
    const inputId = id || `input-mask-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: any) => {
        if (onChange) {
            onChange(e.value);
        }
    };

    const inputElement = (
        <PrimeInputMask
            {...props}
            id={inputId}
            onChange={handleChange}
            className={classNames(
                'px-3 py-2 border rounded-md transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                {
                    'w-full': fullWidth,
                    'border-red-500 focus:ring-red-500': error,
                    'border-gray-300 hover:border-gray-400': !error,
                },
                className
            )}
        />
    );

    return (
        <div className={classNames('flex flex-col gap-1', { 'w-full': fullWidth })}>
            {label && (
                <label 
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            {(startAddon || endAddon) ? (
                <div className={classNames('flex items-center gap-2', { 'w-full': fullWidth })}>
                    {startAddon}
                    {inputElement}
                    {endAddon}
                </div>
            ) : (
                inputElement
            )}

            {helperText && (
                <span className={classNames('text-sm', {
                    'text-red-500': error,
                    'text-gray-600': !error
                })}>
                    {helperText}
                </span>
            )}
        </div>
    );
};

// Predefined masks for common use cases
export const MaskPresets = {
    CPF: '999.999.999-99',
    CNPJ: '99.999.999/9999-99',
    PHONE: '(99) 99999-9999',
    PHONE_FIXED: '(99) 9999-9999',
    CEP: '99999-999',
    DATE: '99/99/9999',
    TIME: '99:99',
    CREDIT_CARD: '9999 9999 9999 9999',
    CVV: '999',
    CPF_CNPJ: '999.999.999-99||99.999.999/9999-99'
} as const;
