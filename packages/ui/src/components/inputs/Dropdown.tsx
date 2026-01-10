import { Dropdown as PrimeDropdown, DropdownProps as PrimeDropdownProps } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface DropdownOption {
    label: string;
    value: any;
    icon?: string;
    disabled?: boolean;
}

export interface DropdownProps extends Omit<PrimeDropdownProps, 'onChange' | 'options'> {
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
    label?: string;
    required?: boolean;
    startAddon?: ReactNode;
    endAddon?: ReactNode;
    options: DropdownOption[];
    onChange?: (value: any) => void;
    searchable?: boolean;
}

export const Dropdown = ({
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
    searchable = false,
    filter = searchable,
    options,
    placeholder = 'Selecione...',
    emptyMessage = 'Nenhum resultado encontrado',
    emptyFilterMessage = 'Nenhum resultado encontrado',
    ...props
}: DropdownProps) => {
    const inputId = id || `dropdown-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: any) => {
        if (onChange) {
            onChange(e.value);
        }
    };

    const dropdownElement = (
        <PrimeDropdown
            {...props}
            inputId={inputId}
            options={options}
            onChange={handleChange}
            filter={filter}
            placeholder={placeholder}
            emptyMessage={emptyMessage}
            emptyFilterMessage={emptyFilterMessage}
            className={classNames(
                'transition-colors duration-200',
                {
                    'w-full': fullWidth,
                    'border-red-500': error,
                },
                className
            )}
            panelClassName="shadow-lg border border-gray-200"
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
                    <div className="flex-1">
                        {dropdownElement}
                    </div>
                    {endAddon}
                </div>
            ) : (
                dropdownElement
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
