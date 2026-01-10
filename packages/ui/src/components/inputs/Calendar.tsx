import { Calendar as PrimeCalendar, CalendarProps as PrimeCalendarProps } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface CalendarProps extends Omit<PrimeCalendarProps, 'onChange'> {
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
    label?: string;
    required?: boolean;
    startAddon?: ReactNode;
    endAddon?: ReactNode;
    onChange?: (date: Date | Date[] | null) => void;
}

export const Calendar = ({
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
    dateFormat = 'dd/mm/yy',
    placeholder = 'dd/mm/aaaa',
    showIcon = true,
    ...props
}: CalendarProps) => {
    const inputId = id || `calendar-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: any) => {
        if (onChange) {
            onChange(e.value);
        }
    };

    const calendarElement = (
        <PrimeCalendar
            {...props}
            inputId={inputId}
            onChange={handleChange}
            dateFormat={dateFormat}
            placeholder={placeholder}
            showIcon={showIcon}
            className={classNames(
                'transition-colors duration-200',
                {
                    'w-full': fullWidth,
                },
                className
            )}
            inputClassName={classNames(
                'px-3 py-2 border rounded-md transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                {
                    'w-full': fullWidth,
                    'border-red-500 focus:ring-red-500': error,
                    'border-gray-300 hover:border-gray-400': !error,
                }
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
                    <div className="flex-1">
                        {calendarElement}
                    </div>
                    {endAddon}
                </div>
            ) : (
                calendarElement
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
