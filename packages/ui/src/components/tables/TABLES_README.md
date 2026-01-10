# 📊 Tables - Quick Reference

## Componentes Criados

### 1. **ServerSideDataTable** ⭐ (Recomendado)
Tabela com integração automática useTableQueryParams - paginação, ordenação e filtros via URL.

### 2. **DataTable**
Tabela base com controle manual de paginação e ordenação.

### 3. **TreeTable**
Tabela hierárquica para dados em árvore.

### 4. **VirtualScrollerTable**
Tabela otimizada para grandes volumes (10.000+ registros).

### 5. **TableHelpers**
- `TableHeaderGroup` - Cabeçalho agrupado
- `TableFooter` - Rodapé com totais

### 6. **useTableQueryParams Hook**
Hook para gerenciar paginação, ordenação (Django DRF) e filtros via URL.

---

## 🚀 Uso Rápido

```typescript
import { ServerSideDataTable, DataTableColumn } from '@prime-repo/ui';

const columns: DataTableColumn[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Nome', sortable: true },
  { field: 'email', header: 'Email', sortable: true },
];

const fetchData = async ({ page, pageSize, ordering, filters }) => {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
    ...(ordering && { ordering }), // Django DRF: ordering=name,-created_at
    ...filters
  });
  
  const response = await fetch(`/api/users?${params}`);
  const json = await response.json();
  
  return {
    data: json.results,
    total: json.count
  };
};

<ServerSideDataTable
  fetchData={fetchData}
  columns={columns}
/>
```

**URL atualiza automaticamente:**
- `/users?page=2&pageSize=25`
- `/users?ordering=name,-created_at`
- `/users?ordering=-email&status=active`

---

## 🎯 Ordenação Django DRF

### Padrão URL

```
# Ascendente
?ordering=name

# Descendente  
?ordering=-name

# Múltiplos campos
?ordering=name,-created_at,email
```

### Hook Manual

```typescript
import { useTableQueryParams } from '@prime-repo/shared/hooks';

const table = useTableQueryParams();

// Alternar ordenação: null → asc → desc → null
table.toggleSort('name');

// Adicionar ordenação
table.addSort('email', 'desc');  // ?ordering=-email
table.addSort('name', 'asc');    // ?ordering=-email,name

// Verificar ordenação atual
const order = table.getSortOrder('name'); // 'asc' | 'desc' | null
```

---

## 📋 Props Principais

### DataTableColumn

```typescript
{
  field: 'name',
  header: 'Nome',
  sortable: true,
  body: (data) => <CustomTemplate />,
  bodyStyle: { width: '200px' },
}
```

### Custom Body Templates

```typescript
// Badge
{ 
  field: 'status', 
  header: 'Status',
  body: (user) => (
    <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
      {user.status}
    </Badge>
  )
}

// Avatar + Nome
{
  field: 'name',
  header: 'Nome',
  body: (user) => (
    <div className="flex items-center gap-2">
      <Avatar name={user.name} size="sm" />
      <span>{user.name}</span>
    </div>
  )
}

// Ações
{
  field: 'actions',
  header: 'Ações',
  body: (item) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" size="small" />
      <Button icon="pi pi-trash" size="small" variant="danger" />
    </div>
  )
}
```

---

## 🌳 TreeTable

```typescript
import { TreeTable, TreeNode } from '@prime-repo/ui';

const data: TreeNode[] = [
  {
    key: '0',
    data: { name: 'Pasta 1', size: '100kb' },
    children: [
      { key: '0-0', data: { name: 'Arquivo 1.txt', size: '50kb' } },
    ],
  },
];

<TreeTable
  data={data}
  columns={[
    { field: 'name', header: 'Nome', expander: true },
    { field: 'size', header: 'Tamanho' },
  ]}
/>
```

---

## 📜 Virtual Scroller

```typescript
import { VirtualScrollerTable } from '@prime-repo/ui';

<VirtualScrollerTable
  data={largeArray} // 10.000+ items
  columns={columns}
  itemSize={50}
  scrollHeight="400px"
/>
```

---

## 🎨 Header/Footer Agrupados

```typescript
import { TableHeaderGroup, TableFooter } from '@prime-repo/ui';

<DataTable
  data={data}
  columns={columns}
  headerColumnGroup={
    <TableHeaderGroup rows={[
      {
        columns: [
          { header: 'Grupo 1', colSpan: 2 },
          { header: 'Grupo 2', colSpan: 3 },
        ]
      },
      {
        columns: [
          { header: 'Col 1' },
          { header: 'Col 2' },
          { header: 'Col 3' },
          { header: 'Col 4' },
          { header: 'Col 5' },
        ]
      }
    ]} />
  }
  footerColumnGroup={
    <TableFooter columns={[
      { content: 'Total:', colSpan: 3, align: 'right' },
      { content: 'R$ 1.234,56', align: 'right' },
    ]} />
  }
/>
```

---

## 🎯 Seleção

```typescript
const [selected, setSelected] = useState<Item[]>([]);

<DataTable
  data={items}
  columns={columns}
  selection={selected}
  onSelectionChange={(e) => setSelected(e.value)}
  selectionMode="checkbox"  // single, multiple, checkbox, radiobutton
  dataKey="id"
/>
```

---

## 📂 Arquivos

```
packages/ui/src/components/tables/
├── DataTable.tsx               # Tabela base
├── TreeTable.tsx               # Tabela hierárquica
├── VirtualScrollerTable.tsx    # Virtual scroll
├── ServerSideDataTable.tsx     # Com useTableQueryParams integrado
├── TableHelpers.tsx            # Header/Footer agrupados
└── index.ts

packages/shared/src/hooks/
└── useTableQueryParams.ts      # Hook de ordenação/paginação/filtros

apps/app1/src/pages/
└── TableExamples/              # Exemplos completos
```

---

## 📚 Documentação Completa

Ver `TABLES_GUIDE.md` para:
- Todos os props
- Exemplos completos
- Integração com backend Django
- Customizações avançadas
- Filtros e busca
- Ações em lote

---

## ✅ Features

- [x] 4 tipos de tabelas
- [x] Ordenação Django DRF via URL
- [x] Paginação via URL
- [x] Filtros via URL
- [x] Virtual scroll
- [x] TreeTable
- [x] Header/Footer agrupados
- [x] Seleção (single/multiple/checkbox)
- [x] Loading states
- [x] Empty states
- [x] Custom templates
- [x] TypeScript completo
- [x] Documentação completa

---

**Build:**

```bash
pnpm --filter @prime-repo/ui build
pnpm --filter @prime-repo/shared build
```

**Import:**

```typescript
import {
  ServerSideDataTable,
  DataTable,
  TreeTable,
  VirtualScrollerTable,
  TableHeaderGroup,
  TableFooter,
} from '@prime-repo/ui';

import { useTableQueryParams } from '@prime-repo/shared/hooks';
```
