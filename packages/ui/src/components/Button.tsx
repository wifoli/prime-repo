import { Button as PrimeButton, ButtonProps as PrimeButtonProps } from 'primereact/button';
import { classNames } from 'primereact/utils';

export interface ButtonProps extends Omit<PrimeButtonProps, 'size'> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    size?: 'small' | 'medium' | 'large';
}

export const Button = ({
                           variant = 'primary',
                           size = 'medium',
                           className,
                           ...props
                       }: ButtonProps) => {
    const variantClasses = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white border-gray-500',
        success: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
        danger: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
        info: 'bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500'
    };

    const sizeClasses = {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-5 py-3'
    };

    return (
        <PrimeButton
            {...props}
            className={classNames(
                'transition-colors duration-200 font-medium rounded-md',
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
        />
    );
};