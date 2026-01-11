import { Skeleton as PrimeSkeleton, SkeletonProps as PrimeSkeletonProps } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';

export interface SkeletonProps extends PrimeSkeletonProps {
  shape?: 'rectangle' | 'circle';
  size?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  animation?: 'wave' | 'none';
  className?: string;
}

/**
 * Skeleton - Placeholder de loading (PrimeReact)
 * Use para mostrar placeholders durante carregamento
 * 
 * @example
 * <Skeleton width="10rem" className="mb-2" />
 * <Skeleton width="5rem" className="mb-2" />
 * <Skeleton height="2rem" className="mb-2" />
 * <Skeleton width="100%" height="150px" />
 * <Skeleton shape="circle" size="4rem" />
 */
export function Skeleton({
  shape = 'rectangle',
  size,
  width = '100%',
  height = '1rem',
  borderRadius,
  animation = 'wave',
  className,
  ...props
}: SkeletonProps) {
  return (
    <PrimeSkeleton
      shape={shape}
      size={size}
      width={width}
      height={height}
      borderRadius={borderRadius}
      animation={animation}
      className={classNames('skeleton-wrapper', className)}
      {...props}
    />
  );
}
