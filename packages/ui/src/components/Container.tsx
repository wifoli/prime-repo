import { ReactNode, HTMLAttributes } from 'react';
import { classNames } from 'primereact/utils';

export interface ContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  centered?: boolean;
  className?: string;
}

/**
 * Container component for consistent max-width layouts
 */
export function Container({
  children,
  maxWidth = 'lg',
  padding = true,
  centered = true,
  className,
  ...props
}: ContainerProps) {
  const maxWidthMap = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={classNames(
        'w-full',
        maxWidthMap[maxWidth],
        centered && 'mx-auto',
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
