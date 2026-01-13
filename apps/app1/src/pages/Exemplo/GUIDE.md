# Guia de Exemplos - Prime Repo

Este guia demonstra como utilizar os recursos do Prime Repo através de exemplos práticos e bem estruturados.

## 📁 Estrutura de Arquivos Padronizada

Cada recurso/página do sistema segue a seguinte estrutura:

```
feature-name/
├── types.ts              # Interfaces e tipos TypeScript
├── hooks.ts              # Custom hooks com lógica de negócio
├── services/             # Serviços de API
│   └── featureService.ts
├── components/           # Componentes específicos da feature
│   ├── Filters.tsx
│   └── Form.tsx
├── view.tsx             # Componente visual principal
└── page.tsx             # Wrapper da view (providers, layouts, etc)
```

### Responsabilidades

- **types.ts**: Define todas as interfaces, tipos e enums
- **services/**: Contém lógica de comunicação com API
- **hooks.ts**: Agrupa state management e lógica de negócio
- **components/**: Componentes visuais reutilizáveis
- **view.tsx**: Componente visual que usa hooks e componentes
- **page.tsx**: Wrapper final que pode adicionar providers, permissões, etc

## 🎯 Hook useTableQueryParams

Hook genérico para gerenciar tabelas com paginação server-side.

### Características

- ✅ **Tipagem com Generics**: Suporte completo a TypeScript
- ✅ **Paginação Server-Side**: Gerencia first, rows, page
- ✅ **Ordenação**: Integração com sortField e sortOrder
- ✅ **Filtros Customizados**: Filtros tipados específicos da entidade
- ✅ **Loading State**: Indicador de carregamento
- ✅ **Refetch Manual**: Atualização sob demanda

### Uso Básico

```typescript
import { useTableQueryParams } from './hooks/useTableQueryParams';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserFilters {
  status?: 'active' | 'inactive';
  role?: string;
}

function UsersView() {
  const {
    tableState,
    data,
    totalRecords,
    isLoading,
    onPage,
    onSort,
    setCustomFilters,
    resetFilters,
    refetch
  } = useTableQueryParams<User, UserFilters>({
    fetchFn: fetchUsers,
    initialPageSize: 10,
    initialSortField: 'createdAt',
    initialSortOrder: -1
  });

  return (
    <DataTable
      value={data}
      lazy
      paginator
      rows={tableState.rows}
      first={tableState.first}
      totalRecords={totalRecords}
      onPage={onPage}
      onSort={onSort}
      sortField={tableState.sortField}
      sortOrder={tableState.sortOrder}
      loading={isLoading}
    >
      {/* Columns */}
    </DataTable>
  );
}
```

### API Completa

```typescript
interface UseTableQueryParamsReturn<TData, TFilters> {
  // Estado
  tableState: TableState<TFilters>;
  queryParams: TableQueryParams<TFilters>;
  isLoading: boolean;
  data: TData[];
  totalRecords: number;
  
  // Ações
  onPage: (event: any) => void;
  onSort: (event: any) => void;
  onFilter: (event: any) => void;
  setCustomFilters: (filters: Partial<TFilters>) => void;
  resetFilters: () => void;
  refetch: () => void;
  
  // Helpers
  getCurrentPage: () => number;
  getTotalPages: () => number;
}
```

## 📋 Exemplo Completo: Gerenciamento de Usuários

### 1. Definição de Types

```typescript
// types.ts
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type UserRole = 'admin' | 'user' | 'manager';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface UserFilters {
  status?: UserStatus;
  role?: UserRole;
  searchTerm?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
}
```

### 2. Service Layer

```typescript
// services/userService.ts
import type { PaginatedResponse, TableQueryParams } from '@/hooks/useTableQueryParams';

export async function fetchUsers(
  params: TableQueryParams<UserFilters>
): Promise<PaginatedResponse<User>> {
  // Implementação real de API
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return response.json();
}

export async function createUser(data: CreateUserData): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
}
```

### 3. Custom Hook

```typescript
// hooks.ts
import { useTableQueryParams } from '@/hooks/useTableQueryParams';
import { fetchUsers, createUser, updateUser, deleteUser } from './services/userService';

export function useUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const table = useTableQueryParams<User, UserFilters>({
    fetchFn: fetchUsers,
    initialPageSize: 10,
  });

  const handleCreate = async (data: CreateUserData) => {
    await createUser(data);
    table.refetch();
    setIsModalOpen(false);
  };

  const handleUpdate = async (id: number, data: UpdateUserData) => {
    await updateUser(id, data);
    table.refetch();
    setIsModalOpen(false);
  };

  return {
    ...table,
    isModalOpen,
    selectedUser,
    setIsModalOpen,
    setSelectedUser,
    handleCreate,
    handleUpdate,
  };
}
```

### 4. Componentes de Filtro

```typescript
// components/Filters.tsx
interface FiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
  onReset: () => void;
}

export function Filters({ filters, onFiltersChange, onReset }: FiltersProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <InputText
        value={filters.searchTerm || ''}
        onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
        placeholder="Buscar..."
      />
      
      <Dropdown
        value={filters.status}
        onChange={(e) => onFiltersChange({ status: e.value })}
        options={statusOptions}
        placeholder="Status"
      />
      
      <Button label="Limpar" onClick={onReset} />
    </div>
  );
}
```

### 5. View Component

```typescript
// view.tsx
export function UsersView() {
  const {
    tableState,
    data,
    totalRecords,
    isLoading,
    onPage,
    onSort,
    setCustomFilters,
    resetFilters,
    isModalOpen,
    handleCreate,
  } = useUsers();

  return (
    <div>
      <Filters
        filters={tableState.customFilters || {}}
        onFiltersChange={setCustomFilters}
        onReset={resetFilters}
      />

      <DataTable
        value={data}
        lazy
        paginator
        rows={tableState.rows}
        first={tableState.first}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        loading={isLoading}
      >
        <Column field="name" header="Nome" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="status" header="Status" sortable />
      </DataTable>

      <UserForm
        visible={isModalOpen}
        onSubmit={handleCreate}
      />
    </div>
  );
}
```

### 6. Page Component

```typescript
// page.tsx
export function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UsersView />
    </div>
  );
}
```

## 🎨 Padrões de Design

### 1. Separação de Responsabilidades

```
types.ts      → Define estrutura de dados
services/     → Comunica com backend
hooks.ts      → Gerencia estado e lógica
components/   → UI reutilizável
view.tsx      → Composição visual
page.tsx      → Wrapper final
```

### 2. Composição de Hooks

```typescript
// Hook de tabela base
const table = useTableQueryParams<User, UserFilters>({...});

// Hook customizado que estende
export function useUsers() {
  const table = useTableQueryParams<User, UserFilters>({...});
  const [modalState, setModalState] = useState(...);
  
  return {
    ...table,
    // + estado adicional
    // + operações CRUD
  };
}
```

### 3. Tipagem Forte

```typescript
// ✅ Correto - Tipagem completa
const table = useTableQueryParams<User, UserFilters>({
  fetchFn: fetchUsers, // fetchFn já está tipado
  initialPageSize: 10
});

// ❌ Errado - Sem generics
const table = useTableQueryParams({
  fetchFn: fetchUsers // perde tipagem
});
```

## 🔧 Utilitários Comuns

### Formatadores

```typescript
// utils/formatters.ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR');
}
```

### Validadores

```typescript
// utils/validators.ts
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateCPF(cpf: string): boolean {
  // Lógica de validação de CPF
}
```

## 🚀 Exemplos Práticos

### Exemplo 1: Tabela Simples

```typescript
function SimpleTable() {
  const { data, isLoading, ...tableProps } = useTableQueryParams<Product>({
    fetchFn: fetchProducts,
    initialPageSize: 10
  });

  return (
    <DataTable value={data} loading={isLoading} {...tableProps}>
      <Column field="name" header="Nome" />
      <Column field="price" header="Preço" />
    </DataTable>
  );
}
```

### Exemplo 2: Tabela com Filtros

```typescript
function TableWithFilters() {
  const {
    data,
    tableState,
    setCustomFilters,
    resetFilters,
    ...tableProps
  } = useTableQueryParams<Product, ProductFilters>({
    fetchFn: fetchProducts
  });

  return (
    <>
      <Filters
        filters={tableState.customFilters}
        onChange={setCustomFilters}
        onReset={resetFilters}
      />
      <DataTable value={data} {...tableProps}>
        {/* Columns */}
      </DataTable>
    </>
  );
}
```

### Exemplo 3: CRUD Completo

Ver exemplo completo em `users-example/`

## 📦 Estrutura de Pacotes

```
packages/
├── ui/                    # Componentes base
│   ├── DataTable/
│   ├── InputText/
│   └── ...
├── panel/                 # Layout/Template
└── api/                   # Cliente HTTP (futuro)
```

## 🎯 Boas Práticas

1. **Sempre use generics** no `useTableQueryParams`
2. **Separe concerns** (types, services, hooks, components)
3. **Valide no cliente** antes de enviar ao servidor
4. **Trate erros** adequadamente
5. **Mantenha componentes pequenos** e focados
6. **Use TypeScript strict mode**
7. **Documente interfaces públicas**

## 📚 Recursos Adicionais

- PrimeReact: https://primereact.org
- TypeScript Generics: https://www.typescriptlang.org/docs/handbook/2/generics.html
- React Hooks: https://react.dev/reference/react
