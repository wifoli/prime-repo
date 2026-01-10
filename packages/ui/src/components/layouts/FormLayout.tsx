import { ReactNode, HTMLAttributes } from 'react';
import { classNames } from 'primereact/utils';

export interface FormLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  responsive?: boolean;
  className?: string;
}

export interface FormRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export interface FormColProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanXl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  className?: string;
}

/**
 * FormLayout - Container principal com grid automático
 */
export function FormLayout({
  children,
  columns = 12,
  gap = 4,
  responsive = true,
  className,
  ...props
}: FormLayoutProps) {
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
  };

  const columnsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  };

  return (
    <div
      className={classNames(
        'grid',
        columnsMap[columns],
        gapMap[gap],
        responsive && 'sm:grid-cols-12', // Sempre 12 colunas em telas maiores se responsive
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * FormRow - Linha do formulário com grid 12 colunas
 */
export function FormRow({
  children,
  gap = 4,
  align,
  className,
  ...props
}: FormRowProps) {
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
  };

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <div
      className={classNames(
        'grid grid-cols-12',
        gapMap[gap],
        align && alignMap[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * FormCol - Coluna responsiva com span
 */
export function FormCol({
  children,
  span = 12,
  spanSm,
  spanMd,
  spanLg,
  spanXl,
  offset,
  className,
  ...props
}: FormColProps) {
  const spanMap = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };

  const offsetMap = {
    0: '',
    1: 'col-start-2',
    2: 'col-start-3',
    3: 'col-start-4',
    4: 'col-start-5',
    5: 'col-start-6',
    6: 'col-start-7',
    7: 'col-start-8',
    8: 'col-start-9',
    9: 'col-start-10',
    10: 'col-start-11',
    11: 'col-start-12',
  };

  return (
    <div
      className={classNames(
        spanMap[span],
        spanSm && `sm:${spanMap[spanSm]}`,
        spanMd && `md:${spanMap[spanMd]}`,
        spanLg && `lg:${spanMap[spanLg]}`,
        spanXl && `xl:${spanMap[spanXl]}`,
        offset && offsetMap[offset],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
