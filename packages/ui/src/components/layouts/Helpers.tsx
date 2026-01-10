import { ReactNode, HTMLAttributes } from 'react';
import { classNames } from 'primereact/utils';

/**
 * Flex - Alternativa ao Stack com mais opções de controle
 */
export interface FlexProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  wrap?: boolean | 'reverse';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  grow?: boolean;
  shrink?: boolean;
  inline?: boolean;
  className?: string;
}

export function Flex({
  children,
  direction = 'row',
  wrap = false,
  gap = 0,
  align,
  justify,
  grow = false,
  shrink = true,
  inline = false,
  className,
  ...props
}: FlexProps) {
  const directionMap = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    col: 'flex-col',
    'col-reverse': 'flex-col-reverse',
  };

  const gapMap = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16',
  };

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const wrapClass =
    wrap === true ? 'flex-wrap' : wrap === 'reverse' ? 'flex-wrap-reverse' : '';

  return (
    <div
      className={classNames(
        inline ? 'inline-flex' : 'flex',
        directionMap[direction],
        wrapClass,
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        grow && 'flex-grow',
        shrink && 'flex-shrink',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * FlexItem - Item com controle de flex
 */
export interface FlexItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  grow?: boolean | number;
  shrink?: boolean | number;
  basis?: 'auto' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  order?: number;
  className?: string;
}

export function FlexItem({
  children,
  grow,
  shrink,
  basis,
  order,
  className,
  ...props
}: FlexItemProps) {
  const basisMap = {
    auto: 'basis-auto',
    full: 'basis-full',
    '1/2': 'basis-1/2',
    '1/3': 'basis-1/3',
    '2/3': 'basis-2/3',
    '1/4': 'basis-1/4',
    '3/4': 'basis-3/4',
  };

  const getGrowClass = () => {
    if (grow === true) return 'flex-grow';
    if (grow === false) return 'flex-grow-0';
    if (typeof grow === 'number') return `flex-grow-[${grow}]`;
    return '';
  };

  const getShrinkClass = () => {
    if (shrink === true) return 'flex-shrink';
    if (shrink === false) return 'flex-shrink-0';
    if (typeof shrink === 'number') return `flex-shrink-[${shrink}]`;
    return '';
  };

  return (
    <div
      className={classNames(
        getGrowClass(),
        getShrinkClass(),
        basis && basisMap[basis],
        order && `order-${order}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Section - Seção de conteúdo com título, descrição e ações
 */
export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  divider?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Section({
  children,
  title,
  description,
  actions,
  divider = false,
  spacing = 'md',
  className,
  ...props
}: SectionProps) {
  const spacingMap = {
    none: '',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
  };

  return (
    <section className={classNames(spacingMap[spacing], className)} {...props}>
      {(title || description || actions) && (
        <div
          className={classNames('flex items-start justify-between gap-4', {
            'pb-4 mb-4 border-b border-gray-200': divider,
          })}
        >
          <div className="space-y-1 flex-1">
            {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
            {description && <p className="text-sm text-gray-600">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * Spacer - Espaçamento flexível ou fixo
 */
export interface SpacerProps {
  size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  axis?: 'horizontal' | 'vertical' | 'both';
  flexible?: boolean;
  className?: string;
}

export function Spacer({ size = 4, axis = 'vertical', flexible = false, className }: SpacerProps) {
  if (flexible) {
    return <div className={classNames('flex-grow', className)} />;
  }

  const sizeMap = {
    0: 0,
    1: 'h-1 w-1',
    2: 'h-2 w-2',
    3: 'h-3 w-3',
    4: 'h-4 w-4',
    5: 'h-5 w-5',
    6: 'h-6 w-6',
    8: 'h-8 w-8',
    10: 'h-10 w-10',
    12: 'h-12 w-12',
    16: 'h-16 w-16',
    20: 'h-20 w-20',
    24: 'h-24 w-24',
  };

  const axisClass =
    axis === 'horizontal'
      ? sizeMap[size].split(' ')[1]
      : axis === 'vertical'
      ? sizeMap[size].split(' ')[0]
      : sizeMap[size];

  return <div className={classNames(axisClass, className)} aria-hidden="true" />;
}

/**
 * Center - Centraliza conteúdo
 */
export interface CenterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  axis?: 'horizontal' | 'vertical' | 'both';
  inline?: boolean;
  className?: string;
}

export function Center({ children, axis = 'both', inline = false, className, ...props }: CenterProps) {
  const getClasses = () => {
    if (axis === 'both') {
      return 'flex items-center justify-center';
    }
    if (axis === 'horizontal') {
      return 'flex justify-center';
    }
    return 'flex items-center';
  };

  return (
    <div className={classNames(getClasses(), inline && 'inline-flex', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * AspectRatio - Container com proporção fixa
 */
export interface AspectRatioProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  ratio?: '1/1' | '16/9' | '4/3' | '3/2' | '21/9' | number;
  className?: string;
}

export function AspectRatio({ children, ratio = '16/9', className, ...props }: AspectRatioProps) {
  const ratioMap = {
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '21/9': 'aspect-[21/9]',
  };

  const ratioClass = typeof ratio === 'string' ? ratioMap[ratio] : `aspect-[${ratio}]`;

  return (
    <div className={classNames('relative w-full', ratioClass, className)} {...props}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
