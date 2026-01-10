# 📊 Table Components Guide - @prime-repo/ui

Sistema completo de tabelas com integração Django DRF para ordenação via URL.

---

## 🎯 Componentes Disponíveis

### 1. **ServerSideDataTable** ⭐
DataTable com integração automática `useTableQueryParams`.
- ✅ Paginação via URL
- ✅ Ordenação Django DRF (`ordering=column1,-column2`)
- ✅ Filtros via query params
- ✅ Lazy loading automático

### 2. **DataTable**
DataTable base com controle manual.
- ✅ Paginação externa
- ✅ Ordenação customizada
- ✅ Client-side ou server-side

### 3. **TreeTable**
Tabela para dados hierárquicos.
- ✅ Expansão de nós
- ✅ Paginação
- ✅ Ordenação

### 4. **VirtualScrollerTable**
Para grandes volumes (10.000+ registros).
- ✅ Renderiza apenas itens visíveis
- ✅ Performance otimizada
- ✅ Scroll infinito

### 5. **TableHelpers**
- `TableHeaderGroup` - Cabeçalho agrupado
- `TableFooter` - Rodapé com totais

---

## 🚀 Quick Start

### ServerSideDataTable (Recomendado)

```typescript
import { ServerSideDataTable, DataTableColumn } from '@prime-repo/ui';

const columns: DataTableColumn[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Nome', sortable: true },
  { field: 'email', header: 'Email', sortable: true },
];

const fetchUsers = async ({ page, pageSize, ordering, filters }) => {
  // Chamada API Django DRF
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
    ...(ordering && { ordering }), // ordering=name,-created_at
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
  fetchData={fetchUsers}
  columns={columns}
  defaultPageSize={10}
/>
```

**URL atualiza automaticamente:**
- `/users?page=2&pageSize=25`
- `/users?page=1&ordering=name,-created_at`
- `/users?page=1&ordering=-email&status=active`

---

## 📐 useTableQueryParams Hook

Hook que gerencia paginação, ordenação e filtros via URL.

### Retorno

```typescript
interface UseTableQueryParamsResult {
  // Current values
  page: number;
  pageSize: number;
  ordering?: string; // "column1,-column2"
  sortFields: SortField[]; // [{ field: 'column1', order: 'asc' }]
  filters: Record<string, any>;
  
  // Pagination
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  
  // Sorting (Django DRF)
  setOrdering: (ordering: string) => void;
  addSort: (field: string, order: 'asc' | 'desc') => void;
  removeSort: (field: string) => void;
  toggleSort: (field: string) => void; // null → asc → desc → null
  clearSort: () => void;
  getSortOrder: (field: string) => 'asc' | 'desc' | null;
  
  // Filters
  setFilter: (key: string, value: any) => void;
  setFilters: (filters: Record<string, any>) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  
  // Utils
  reset: () => void;
  toQueryString: () => string;
  toObject: () => TableQueryParams;
}
```

### Uso Manual

```typescript
import { useTableQueryParams } from '@prime-repo/shared/hooks';

function MyTable() {
  const table = useTableQueryParams(1, 10);
  
  // Ordenação
  table.toggleSort('name');        // URL: ?ordering=name
  table.toggleSort('name');        // URL: ?ordering=-name
  table.toggleSort('name');        // URL: (remove)
  
  table.addSort('email', 'desc'); // URL: ?ordering=-email
  table.addSort('name', 'asc');   // URL: ?ordering=-email,name
  
  // Paginação
  table.setPage(2);               // URL: ?page=2
  table.setPageSize(25);          // URL: ?pageSize=25&page=1
  
  // Filtros
  table.setFilter('status', 'active'); // URL: ?status=active
  table.setFilter('role', 'admin');    // URL: ?status=active&role=admin
  
  // Verificar ordenação atual
  const nameOrder = table.getSortOrder('name'); // 'asc' | 'desc' | null
  
  return (
    <div>
      <button onClick={() => table.toggleSort('name')}>
        Sort Name {nameOrder === 'asc' ? '↑' : nameOrder === 'desc' ? '↓' : ''}
      </button>
    </div>
  );
}
```

---

## 📋 DataTable Props

### DataTableColumn

```typescript
interface DataTableColumn {
  field: string;           // Campo do objeto
  header: string;          // Título da coluna
  sortable?: boolean;      // Permite ordenação
  body?: (data: any) => ReactNode;  // Template customizado
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  filter?: boolean;        // Habilita filtro
  filterElement?: ReactNode;
}
```

### DataTable

```typescript
interface DataTableProps {
  data: T[];
  columns: DataTableColumn[];
  
  // Paginação externa
  pagination?: {
    page: number;
    pageSize: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    rowsPerPageOptions?: number[];
  };
  
  // Ordenação Django DRF
  sorting?: {
    ordering?: string;
    onSort: (field: string) => void;
    getSortOrder: (field: string) => 'asc' | 'desc' | null;
  };
  
  loading?: boolean;
  emptyMessage?: string | ReactNode;
  
  // Seleção
  selection?: T | T[];
  onSelectionChange?: (e: { value: T | T[] }) => void;
  selectionMode?: 'single' | 'multiple' | 'checkbox' | 'radiobutton';
  
  striped?: boolean;
  gridlines?: boolean;
  showHeader?: boolean;
  lazy?: boolean;
}
```

---

## 🌳 TreeTable

Para dados hierárquicos.

```typescript
import { TreeTable, TreeTableColumn, TreeNode } from '@prime-repo/ui';

const data: TreeNode[] = [
  {
    key: '0',
    data: { name: 'Documents', size: '75kb', type: 'Folder' },
    children: [
      {
        key: '0-0',
        data: { name: 'Work', size: '55kb', type: 'Folder' },
        children: [
          { key: '0-0-0', data: { name: 'Resume.doc', size: '25kb', type: 'Document' } },
        ],
      },
    ],
  },
];

const columns: TreeTableColumn[] = [
  { field: 'name', header: 'Name', expander: true, sortable: true },
  { field: 'size', header: 'Size', sortable: true },
  { field: 'type', header: 'Type', sortable: true },
];

<TreeTable
  data={data}
  columns={columns}
  expandedKeys={expandedKeys}
  onToggle={(e) => setExpandedKeys(e.value)}
/>
```

---

## 📜 VirtualScrollerTable

Para grandes volumes de dados.

```typescript
import { VirtualScrollerTable } from '@prime-repo/ui';

const data = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: Math.random() * 1000,
}));

<VirtualScrollerTable
  data={data}
  columns={[
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'value', header: 'Value', sortable: true },
  ]}
  itemSize={50}          // Altura de cada linha
  scrollHeight="400px"   // Altura da área de scroll
/>
```

---

## 🎨 Customização de Colunas

### Body Template

```typescript
{
  field: 'status',
  header: 'Status',
  body: (user: User) => (
    <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
      {user.status}
    </Badge>
  )
}
```

### Avatar + Nome

```typescript
{
  field: 'name',
  header: 'Nome',
  body: (user: User) => (
    <div className="flex items-center gap-2">
      <Avatar name={user.name} size="sm" />
      <span>{user.name}</span>
    </div>
  )
}
```

### Ações

```typescript
{
  field: 'actions',
  header: 'Ações',
  body: (user: User) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" size="small" variant="info" rounded text />
      <Button icon="pi pi-trash" size="small" variant="danger" rounded text />
    </div>
  ),
  bodyStyle: { width: '120px', textAlign: 'center' }
}
```

### Formatação de Valores

```typescript
{
  field: 'price',
  header: 'Preço',
  body: (product: Product) => `R$ ${product.price.toFixed(2)}`
}

{
  field: 'createdAt',
  header: 'Data',
  body: (item: Item) => new Date(item.createdAt).toLocaleDateString('pt-BR')
}
```

---

## 📊 Header e Footer Agrupados

### Header com Múltiplas Linhas

```typescript
import { TableHeaderGroup } from '@prime-repo/ui';

<DataTable
  data={data}
  columns={columns}
  headerColumnGroup={
    <TableHeaderGroup
      rows={[
        {
          columns: [
            { header: 'Informações Pessoais', colSpan: 3 },
            { header: 'Endereço', colSpan: 2 },
          ],
        },
        {
          columns: [
            { header: 'Nome' },
            { header: 'Email' },
            { header: 'Telefone' },
            { header: 'Cidade' },
            { header: 'Estado' },
          ],
        },
      ]}
    />
  }
/>
```

### Footer com Totais

```typescript
import { TableFooter } from '@prime-repo/ui';

<DataTable
  data={products}
  columns={columns}
  footerColumnGroup={
    <TableFooter
      columns={[
        { content: 'Total:', colSpan: 3, align: 'right' },
        { content: `R$ ${total.toFixed(2)}`, align: 'right' },
        { content: sumQuantity, align: 'right' },
      ]}
    />
  }
/>
```

---

## 🎯 Seleção

### Checkbox (Múltipla)

```typescript
const [selectedItems, setSelectedItems] = useState<Product[]>([]);

<DataTable
  data={products}
  columns={columns}
  selection={selectedItems}
  onSelectionChange={(e) => setSelectedItems(e.value as Product[])}
  selectionMode="checkbox"
  dataKey="id"
/>
```

### Single

```typescript
const [selected, setSelected] = useState<Product | null>(null);

<DataTable
  data={products}
  columns={columns}
  selection={selected}
  onSelectionChange={(e) => setSelected(e.value as Product)}
  selectionMode="single"
  dataKey="id"
/>
```

---

## 🔄 Ordenação Django DRF

### Padrão Django REST Framework

```
# Ascendente
?ordering=name

# Descendente
?ordering=-name

# Múltiplos campos
?ordering=name,-created_at,email

# Significa:
# 1. name (ascendente)
# 2. created_at (descendente)
# 3. email (ascendente)
```

### Como Funciona

1. **Usuário clica** na coluna "Nome"
2. **URL atualiza** para `?ordering=name`
3. **Hook detecta** mudança na URL
4. **Fetch automático** com novo parâmetro
5. **Backend recebe** `ordering=name`
6. **Ordena** resultados
7. **Retorna** dados ordenados

### Implementação Backend (Django)

```python
# views.py
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['name', 'email', 'created_at']  # Campos permitidos
    ordering = ['name']  # Default
```

---

## 💡 Exemplos Completos

### 1. Tabela Completa com Filtros

```typescript
import { ServerSideDataTable, useTableQueryParams } from '@prime-repo/ui';
import { Input, Dropdown } from '@prime-repo/ui';
import { useDebounce } from '@prime-repo/shared/hooks';

function UsersTable() {
  const table = useTableQueryParams();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // Atualizar filtro quando search mudar
  useEffect(() => {
    if (debouncedSearch) {
      table.setFilter('search', debouncedSearch);
    } else {
      table.removeFilter('search');
    }
  }, [debouncedSearch]);

  const fetchUsers = async ({ page, pageSize, ordering, filters }) => {
    const params = new URLSearchParams({
      page: String(page),
      page_size: String(pageSize),
      ...(ordering && { ordering }),
      ...filters,
    });

    const response = await fetch(`/api/users?${params}`);
    const json = await response.json();

    return {
      data: json.results,
      total: json.count,
    };
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="flex-1"
        />
        
        <Dropdown
          value={table.filters.role}
          onChange={(e) => table.setFilter('role', e.value)}
          options={[
            { label: 'Todos', value: '' },
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]}
          placeholder="Filtrar por função"
        />
        
        <Button
          label="Limpar Filtros"
          onClick={() => {
            setSearch('');
            table.clearFilters();
          }}
        />
      </div>

      {/* Tabela */}
      <ServerSideDataTable
        fetchData={fetchUsers}
        columns={[
          { field: 'name', header: 'Nome', sortable: true },
          { field: 'email', header: 'Email', sortable: true },
          { field: 'role', header: 'Função', sortable: true },
        ]}
      />
    </div>
  );
}
```

### 2. Tabela com Ações em Lote

```typescript
function ProductsTable() {
  const [selected, setSelected] = useState<Product[]>([]);

  const handleBulkDelete = async () => {
    if (confirm(`Deletar ${selected.length} produtos?`)) {
      await bulkDelete(selected.map(p => p.id));
      setSelected([]);
      // Recarregar tabela
    }
  };

  return (
    <div>
      {selected.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded flex items-center justify-between">
          <span>{selected.length} produto(s) selecionado(s)</span>
          <div className="flex gap-2">
            <Button label="Exportar" icon="pi pi-download" />
            <Button label="Deletar" icon="pi pi-trash" variant="danger" onClick={handleBulkDelete} />
          </div>
        </div>
      )}

      <DataTable
        data={products}
        columns={columns}
        selection={selected}
        onSelectionChange={(e) => setSelected(e.value)}
        selectionMode="checkbox"
      />
    </div>
  );
}
```

---

## 🎨 Estilos

### Classes Disponíveis

```css
.datatable-wrapper { }
.treetable-wrapper { }
.virtual-scroller-table-wrapper { }
```

### Customização

```typescript
<DataTable
  data={data}
  columns={columns}
  striped={true}           // Linhas zebradas
  gridlines={false}        // Linhas de grade
  showHeader={true}        // Mostrar cabeçalho
  className="custom-table"
/>
```

---

## 📚 Recursos

- [PrimeReact DataTable Docs](https://primereact.org/datatable/)
- [PrimeReact TreeTable Docs](https://primereact.org/treetable/)
- [Django REST Framework Ordering](https://www.django-rest-framework.org/api-guide/filtering/#orderingfilter)

---

## ✅ Checklist de Implementação

- [x] DataTable base
- [x] TreeTable
- [x] VirtualScrollerTable
- [x] ServerSideDataTable
- [x] useTableQueryParams hook
- [x] Ordenação Django DRF
- [x] Paginação via URL
- [x] Filtros via URL
- [x] TableHeaderGroup
- [x] TableFooter
- [x] Seleção (single/multiple/checkbox)
- [x] Loading states
- [x] Empty states
- [x] TypeScript completo
- [x] Documentação
- [x] Exemplos

---

**Versão:** 0.0.1  
**Última atualização:** Janeiro 2025
