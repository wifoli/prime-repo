import { useCallback, useMemo } from 'react';
import type { MenuItem } from 'primereact/menuitem';

// ─── Tipos públicos ───────────────────────────────────────────────────────────

/** Item simplificado aceito pelo hook. */
export interface BreadCrumbItem {
  /** Texto exibido no breadcrumb. */
  label: string;
  /**
   * Rota para navegação.
   * - Se fornecida, o item vira um link clicável.
   * - O último item (folha) geralmente não tem `to`.
   */
  to?: string;
  /** Ícone PrimeIcons (ex: 'pi pi-users'). Opcional. */
  icon?: string;
}

/** Opções do hook. */
export interface UseBreadCrumbOptions {
  /**
   * Função de navegação do seu router.
   * Passe `useNavigate()` do React Router ou equivalente.
   * Se omitida, os itens usarão `url` nativo (link href).
   */
  navigate?: (to: string) => void;
  /**
   * Item home customizado.
   * - `false` → remove o home
   * - omitido → usa pi-home com navigate('/') ou url='/'
   */
  home?: BreadCrumbItem | false;
}

/** Retorno do hook. */
export interface UseBreadCrumbReturn {
  /** Array de MenuItem prontos para passar ao componente BreadCrumb. */
  items: MenuItem[];
  /**
   * Item home resolvido para passar ao componente BreadCrumb.
   * Já é `undefined` quando `home === false`.
   */
  homeItem: MenuItem | undefined;
  /**
   * Cria um único MenuItem a partir de um BreadCrumbItem.
   * Útil para compor listas dinamicamente.
   */
  makeItem: (item: BreadCrumbItem) => MenuItem;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useBreadCrumb — Hook para gerenciar breadcrumbs de forma simples e consistente.
 *
 * Converte uma lista de `BreadCrumbItem` em `MenuItem[]` do PrimeReact,
 * aplicando navegação via React Router quando disponível.
 *
 * @example
 * // Página estática
 * function ClientesPage() {
 *   const navigate = useNavigate();
 *   const { items, homeItem } = useBreadCrumb(
 *     [{ label: 'Clientes' }],
 *     { navigate }
 *   );
 *   return (
 *     <>
 *       <BreadCrumb items={items} home={homeItem} />
 *       ...
 *     </>
 *   );
 * }
 *
 * @example
 * // Página de detalhe com link intermediário
 * function ClienteDetailPage({ nome }: { nome: string }) {
 *   const navigate = useNavigate();
 *   const { items, homeItem } = useBreadCrumb(
 *     [
 *       { label: 'Clientes', to: '/clientes' },
 *       { label: nome },
 *     ],
 *     { navigate }
 *   );
 *   return <BreadCrumb items={items} home={homeItem} />;
 * }
 *
 * @example
 * // Sem React Router (usa links href nativos)
 * const { items, homeItem } = useBreadCrumb([
 *   { label: 'Relatórios', to: '/relatorios' },
 *   { label: 'Mensal' },
 * ]);
 *
 * @example
 * // Home customizado
 * const { items, homeItem } = useBreadCrumb(
 *   [{ label: 'Config' }],
 *   {
 *     navigate,
 *     home: { label: 'Início', to: '/dashboard', icon: 'pi pi-th-large' },
 *   }
 * );
 *
 * @example
 * // Sem home
 * const { items, homeItem } = useBreadCrumb(
 *   [{ label: 'Perfil' }],
 *   { navigate, home: false }
 * );
 * // homeItem === undefined → passe home={false} no componente
 */
export function useBreadCrumb(
  breadcrumbs: BreadCrumbItem[],
  options: UseBreadCrumbOptions = {}
): UseBreadCrumbReturn {
  const { navigate, home } = options;

  // Converte BreadCrumbItem → MenuItem do PrimeReact
  const makeItem = useCallback(
    ({ label, to, icon }: BreadCrumbItem): MenuItem => {
      const item: MenuItem = { label, icon };

      if (to) {
        if (navigate) {
          // Navegação via React Router (sem reload de página)
          item.command = () => navigate(to);
        } else {
          // Fallback: link href nativo
          item.url = to;
        }
      }

      return item;
    },
    [navigate]
  );

  // Converte a lista de breadcrumbs
  const items = useMemo(
    () => breadcrumbs.map(makeItem),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [breadcrumbs, makeItem]
  );

  // Resolve o item home
  const homeItem = useMemo<MenuItem | undefined>(() => {
    if (home === false) return undefined;

    if (home) return makeItem(home);

    // Padrão: ícone de casa apontando para '/'
    const defaultHome: BreadCrumbItem = { label: 'Home', to: '/', icon: 'pi pi-home' };
    return makeItem(defaultHome);
  }, [home, makeItem]);

  return { items, homeItem, makeItem };
}
