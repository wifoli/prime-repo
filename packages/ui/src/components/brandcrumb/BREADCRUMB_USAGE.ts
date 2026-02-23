// ─── Adicione ao packages/ui/src/index.ts ────────────────────────────────────

// Componentes
export * from './components/BreadCrumb';   // <-- adicionar

// Hooks
export * from './hooks';                   // <-- adicionar (ou export * from './hooks/useBreadCrumb')


// ─── Adicione ao packages/ui/src/components/index.ts ─────────────────────────

export * from './BreadCrumb';   // <-- adicionar junto aos outros componentes


// =============================================================================
// EXEMPLOS DE USO NAS PÁGINAS
// =============================================================================

// ─── 1. Página simples (sem link intermediário) ───────────────────────────────
/*
import { BreadCrumb, useBreadCrumb } from '@prime-repo/ui';
import { useNavigate } from 'react-router-dom';

export function ClientesPage() {
  const navigate = useNavigate();

  const { items, homeItem } = useBreadCrumb(
    [{ label: 'Clientes' }],
    { navigate }
  );

  return (
    <div>
      <BreadCrumb items={items} home={homeItem} />
      <h1>Clientes</h1>
    </div>
  );
}
*/

// ─── 2. Página de detalhe (com link clicável no meio) ────────────────────────
/*
import { BreadCrumb, useBreadCrumb } from '@prime-repo/ui';
import { useNavigate, useParams } from 'react-router-dom';

export function ClienteDetailPage() {
  const { nome } = useParams<{ nome: string }>();
  const navigate = useNavigate();

  const { items, homeItem } = useBreadCrumb(
    [
      { label: 'Clientes', to: '/clientes' },
      { label: nome ?? 'Detalhe' },
    ],
    { navigate }
  );

  return (
    <div>
      <BreadCrumb items={items} home={homeItem} />
      <h1>{nome}</h1>
    </div>
  );
}
*/

// ─── 3. Hierarquia profunda (ex: Políticas) ───────────────────────────────────
/*
import { BreadCrumb, useBreadCrumb } from '@prime-repo/ui';
import { useNavigate } from 'react-router-dom';

export function PoliticaSubPage() {
  const navigate = useNavigate();

  const { items, homeItem } = useBreadCrumb(
    [
      { label: 'Linhas', to: '/linhas' },
      { label: 'Crédito Pessoal', to: '/linhas/1' },
      { label: 'Políticas', to: '/linhas/1/politicas' },
      { label: 'Política #42' },
    ],
    { navigate }
  );

  return <BreadCrumb items={items} home={homeItem} />;
}
*/

// ─── 4. Breadcrumb dinâmico (itens vindos de API/estado) ─────────────────────
/*
import { BreadCrumb, useBreadCrumb, BreadCrumbItem } from '@prime-repo/ui';
import { useNavigate } from 'react-router-dom';

export function DynamicPage({ path }: { path: BreadCrumbItem[] }) {
  const navigate = useNavigate();
  const { items, homeItem } = useBreadCrumb(path, { navigate });

  return <BreadCrumb items={items} home={homeItem} />;
}

// Uso:
// <DynamicPage path={[
//   { label: 'Relatórios', to: '/relatorios' },
//   { label: 'Agosto 2024' },
// ]} />
*/

// ─── 5. Home customizado ──────────────────────────────────────────────────────
/*
const { items, homeItem } = useBreadCrumb(
  [{ label: 'Configurações' }],
  {
    navigate,
    home: { label: 'Painel', to: '/dashboard', icon: 'pi pi-th-large' },
  }
);
*/

// ─── 6. Sem home ─────────────────────────────────────────────────────────────
/*
const { items, homeItem } = useBreadCrumb(
  [{ label: 'Perfil' }],
  { navigate, home: false }
);

// homeItem é undefined → passe home={false} no componente:
<BreadCrumb items={items} home={false} />
*/
