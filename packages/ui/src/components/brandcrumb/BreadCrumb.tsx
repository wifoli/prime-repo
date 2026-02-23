import { BreadCrumb as PrimeBreadCrumb, BreadCrumbProps as PrimeBreadCrumbProps } from 'primereact/breadcrumb';
import { classNames } from 'primereact/utils';
import type { MenuItem } from 'primereact/menuitem';

export interface BreadCrumbProps extends Omit<PrimeBreadCrumbProps, 'model'> {
  /**
   * Lista de itens do breadcrumb.
   * Cada item pode ter `label`, `url` ou `command` para navegação.
   */
  items: MenuItem[];
  /**
   * Item home (ícone de casa). Padrão: pi-home apontando para '/'.
   * Passe `false` para remover o home.
   */
  home?: MenuItem | false;
  /**
   * Remove a borda e o fundo para uso inline em páginas.
   * @default true
   */
  unstyled?: boolean;
  className?: string;
}

/**
 * BreadCrumb — Navegação hierárquica
 * Wrapper do PrimeReact BreadCrumb com home padrão e visual limpo.
 *
 * @example
 * // Uso básico com itens fixos
 * <BreadCrumb
 *   items={[
 *     { label: 'Clientes' },
 *     { label: 'João Silva' }
 *   ]}
 * />
 *
 * @example
 * // Com navegação via React Router (use command em vez de url)
 * const navigate = useNavigate();
 * <BreadCrumb
 *   items={[
 *     { label: 'Clientes', command: () => navigate('/clientes') },
 *     { label: 'João Silva' }
 *   ]}
 * />
 *
 * @example
 * // Sem ícone home
 * <BreadCrumb items={[{ label: 'Config' }]} home={false} />
 */
export function BreadCrumb({
  items,
  home,
  unstyled = true,
  className,
  ...props
}: BreadCrumbProps) {
  const resolvedHome: MenuItem | undefined =
    home === false
      ? undefined
      : home ?? { icon: 'pi pi-home', url: '/' };

  return (
    <PrimeBreadCrumb
      model={items}
      home={resolvedHome}
      className={classNames(
        unstyled && 'border-none bg-transparent p-0',
        className
      )}
      {...props}
    />
  );
}
