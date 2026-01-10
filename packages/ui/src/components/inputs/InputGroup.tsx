import { ReactNode, ReactElement, cloneElement } from 'react';
import { classNames } from 'primereact/utils';

export interface InputGroupAddonProps {
    children: ReactNode;
    className?: string;
}

export const InputGroupAddon = ({ children, className }: InputGroupAddonProps) => {
    return (
        <span className={classNames(
            'inline-flex items-center px-3 py-2',
            'bg-gray-100 border border-gray-300',
            'text-gray-700 text-sm',
            'first:rounded-l-md last:rounded-r-md',
            'border-r-0 last:border-r',
            className
        )}>
            {children}
        </span>
    );
};

export interface InputGroupProps {
    children: ReactNode;
    className?: string;
    fullWidth?: boolean;
}

export const InputGroup = ({ 
    children, 
    className,
    fullWidth = false 
}: InputGroupProps) => {
    // Process children to add proper classes
    const processedChildren = Array.isArray(children) ? children : [children];
    
    const elements = processedChildren.map((child, index) => {
        if (!child) return null;
        
        const isFirst = index === 0;
        const isLast = index === processedChildren.length - 1;
        
        // If it's an InputGroupAddon, return as is
        if ((child as any)?.type?.name === 'InputGroupAddon') {
            return child;
        }
        
        // If it's a React element (input component), clone with modified props
        if ((child as ReactElement)?.props) {
            const element = child as ReactElement;
            
            return cloneElement(element, {
                ...element.props,
                className: classNames(
                    element.props.className,
                    'rounded-none',
                    {
                        'rounded-l-md': isFirst,
                        'rounded-r-md': isLast,
                        'border-r-0': !isLast,
                    }
                )
            });
        }
        
        return child;
    });

    return (
        <div className={classNames(
            'flex items-stretch',
            {
                'w-full': fullWidth
            },
            className
        )}>
            {elements}
        </div>
    );
};

// Convenience components for common patterns
export interface InputWithIconProps {
    icon: string;
    iconPosition?: 'left' | 'right';
    children: ReactElement;
    fullWidth?: boolean;
}

export const InputWithIcon = ({ 
    icon, 
    iconPosition = 'left', 
    children,
    fullWidth = false 
}: InputWithIconProps) => {
    return (
        <InputGroup fullWidth={fullWidth}>
            {iconPosition === 'left' && (
                <InputGroupAddon>
                    <i className={icon}></i>
                </InputGroupAddon>
            )}
            {children}
            {iconPosition === 'right' && (
                <InputGroupAddon>
                    <i className={icon}></i>
                </InputGroupAddon>
            )}
        </InputGroup>
    );
};

export interface InputWithButtonProps {
    button: ReactElement;
    buttonPosition?: 'left' | 'right';
    children: ReactElement;
    fullWidth?: boolean;
}

export const InputWithButton = ({ 
    button, 
    buttonPosition = 'right', 
    children,
    fullWidth = false 
}: InputWithButtonProps) => {
    // Clone button to add proper classes
    const processedButton = cloneElement(button, {
        ...button.props,
        className: classNames(
            button.props.className,
            'rounded-none',
            {
                'rounded-l-md': buttonPosition === 'left',
                'rounded-r-md': buttonPosition === 'right',
            }
        )
    });

    return (
        <InputGroup fullWidth={fullWidth}>
            {buttonPosition === 'left' && processedButton}
            {children}
            {buttonPosition === 'right' && processedButton}
        </InputGroup>
    );
};

export interface InputWithLabelProps {
    label: string;
    labelPosition?: 'left' | 'right';
    children: ReactElement;
    fullWidth?: boolean;
}

export const InputWithLabel = ({ 
    label, 
    labelPosition = 'left', 
    children,
    fullWidth = false 
}: InputWithLabelProps) => {
    return (
        <InputGroup fullWidth={fullWidth}>
            {labelPosition === 'left' && (
                <InputGroupAddon>
                    <span>{label}</span>
                </InputGroupAddon>
            )}
            {children}
            {labelPosition === 'right' && (
                <InputGroupAddon>
                    <span>{label}</span>
                </InputGroupAddon>
            )}
        </InputGroup>
    );
};
