import { InputText, InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

export interface CustomInputProps extends InputTextProps {
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
}

export const Input = ({
                          fullWidth = false,
                          error = false,
                          helperText,
                          className,
                          ...props
                      }: CustomInputProps) => {
    return (
        <div className={classNames('flex flex-col gap-1', { 'w-full': fullWidth })}>
            <InputText
                {...props}
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