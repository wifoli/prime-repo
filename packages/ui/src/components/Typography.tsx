import { ReactNode, ElementType, HTMLAttributes } from 'react';
import { classNames } from 'primereact/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BodyVariant = 'body1' | 'body2' | 'caption' | 'overline';
type Variant = HeadingLevel | BodyVariant;

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  variant?: Variant;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning';
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  truncate?: boolean;
  gutterBottom?: boolean;
}

/**
 * Typography component for consistent text styling
 */
export function Typography({
  variant = 'body1',
  as,
  children,
  className,
  weight,
  color,
  align,
  transform,
  truncate = false,
  gutterBottom = false,
  ...props
}: TypographyProps) {
  // Default element mapping
  const defaultElementMap: Record<Variant, ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
  };

  const Component = as || defaultElementMap[variant];

  // Variant styles
  const variantClasses: Record<Variant, string> = {
    h1: 'text-4xl font-bold leading-tight',
    h2: 'text-3xl font-bold leading-tight',
    h3: 'text-2xl font-semibold leading-tight',
    h4: 'text-xl font-semibold leading-snug',
    h5: 'text-lg font-medium leading-snug',
    h6: 'text-base font-medium leading-normal',
    body1: 'text-base leading-relaxed',
    body2: 'text-sm leading-relaxed',
    caption: 'text-xs leading-normal',
    overline: 'text-xs uppercase tracking-wide leading-normal',
  };

  // Weight classes
  const weightClasses = weight ? {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }[weight] : '';

  // Color classes
  const colorClasses = color ? {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
  }[color] : 'text-gray-900';

  // Align classes
  const alignClasses = align ? `text-${align}` : '';

  // Transform classes
  const transformClasses = transform && transform !== 'none' ? `${transform}` : '';

  return (
    <Component
      className={classNames(
        variantClasses[variant],
        weightClasses,
        colorClasses,
        alignClasses,
        transformClasses,
        {
          'truncate': truncate,
          'mb-4': gutterBottom,
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Convenience components
export function Heading1(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h1" {...props} />;
}

export function Heading2(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h2" {...props} />;
}

export function Heading3(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h3" {...props} />;
}

export function Heading4(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h4" {...props} />;
}

export function Body(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="body1" {...props} />;
}

export function Caption(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="caption" {...props} />;
}

export function Overline(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="overline" {...props} />;
}
