import { HTMLAttributes } from 'react';
import { classNames } from 'primereact/utils';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'rounded' | 'square';
  name?: string; // For initials fallback
  className?: string;
}

/**
 * Avatar component for user images
 */
export function Avatar({
  src,
  alt,
  size = 'md',
  variant = 'circle',
  name,
  className,
  ...props
}: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const variantClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none',
  };

  // Get initials from name
  const getInitials = (name?: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (src) {
    return (
      <div
        className={classNames(
          'inline-flex items-center justify-center overflow-hidden bg-gray-200',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <img src={src} alt={alt || name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'inline-flex items-center justify-center bg-blue-500 text-white font-semibold',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {getInitials(name)}
    </div>
  );
}
