import { Inplace as PrimeInplace, InplaceProps as PrimeInplaceProps, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { classNames } from 'primereact/utils';
import { ReactNode } from 'react';

export interface InplaceProps extends PrimeInplaceProps {
  closable?: boolean;
  disabled?: boolean;
  active?: boolean;
  onToggle?: (e: { originalEvent: React.SyntheticEvent; value: boolean }) => void;
  display: ReactNode;
  content: ReactNode;
  className?: string;
}

/**
 * Inplace - Edição inline
 * Use para edição de conteúdo no local (inline editing)
 * 
 * @example
 * <Inplace
 *   closable
 *   display={<span>View Content</span>}
 *   content={<InputText value={text} onChange={(e) => setText(e.target.value)} />}
 * />
 */
export function Inplace({
  closable = false,
  disabled = false,
  active,
  onToggle,
  display,
  content,
  className,
  ...props
}: InplaceProps) {
  return (
    <PrimeInplace
      closable={closable}
      disabled={disabled}
      active={active}
      onToggle={onToggle}
      className={classNames('inplace-wrapper', className)}
      {...props}
    >
      <InplaceDisplay>{display}</InplaceDisplay>
      <InplaceContent>{content}</InplaceContent>
    </PrimeInplace>
  );
}

// Re-export components
export { InplaceDisplay, InplaceContent };
