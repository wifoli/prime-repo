# Quick Reference - Prime Repo

Referência rápida para desenvolvimento no Prime Repo.

## 🚀 Setup Rápido

### 1. Nova Feature

```bash
mkdir -p src/pages/MyFeature/{services,components}
cd src/pages/MyFeature
touch types.ts hooks.ts view.tsx page.tsx
touch services/myFeatureService.ts
touch components/Filters.tsx components/Form.tsx
```

### 2. Estrutura Base

```typescript
// types.ts
export interface MyEntity {
  id: number;
  name: string;
}

export interface MyFilters {
  status?: string;
}

// services/myFeatureService.ts
export async function fetchItems(params: TableQueryParams<MyFilters>) {
  const response = await fetch('/api/items', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return response.json();
}

// hooks.ts
export function useMyFeature() {
  return useTableQueryParams<MyEntity, MyFilters>({
    fetchFn: fetchItems,
    initialPageSize: 10
  });
}

// view.tsx
export function MyFeatureView() {
  const { data, isLoading, ...table } = useMyFeature();
  return <DataTable value={data} loading={isLoading} {...table} />;
}

// page.tsx
export function MyFeaturePage() {
  return <MyFeatureView />;
}
```

## 📋 Snippets Úteis

### Hook de Tabela Completo

```typescript
const {
  // Estado
  tableState,
  queryParams,
  data,
  totalRecords,
  isLoading,
  
  // Eventos DataTable
  onPage,
  onSort,
  onFilter,
  
  // Filtros customizados
  setCustomFilters,
  resetFilters,
  
  // Utilitários
  refetch,
  getCurrentPage,
  getTotalPages
} = useTableQueryParams<MyType, MyFilters>({
  fetchFn: fetchMyData,
  initialPageSize: 10,
  initialSortField: 'createdAt',
  initialSortOrder: -1,
  initialFilters: { status: 'active' },
  onError: (error) => console.error(error)
});
```

### DataTable Completo

```typescript
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
  emptyMessage="Nenhum registro encontrado"
  rowsPerPageOptions={[5, 10, 25, 50]}
  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
  currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
>
  <Column field="id" header="ID" sortable />
  <Column field="name" header="Nome" sortable />
</DataTable>
```

### Componente de Filtros

```typescript
interface FiltersProps {
  filters: MyFilters;
  onFiltersChange: (filters: Partial<MyFilters>) => void;
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
        showClear
      />
      <Button label="Limpar" onClick={onReset} outlined />
    </div>
  );
}
```

### Template de Coluna com Tag

```typescript
function StatusTemplate({ status }: { status: string }) {
  const severityMap = {
    active: 'success',
    inactive: 'warning',
    suspended: 'danger'
  };
  
  return <Tag value={status} severity={severityMap[status]} rounded />;
}

// Uso na coluna
<Column
  field="status"
  header="Status"
  body={(rowData) => <StatusTemplate status={rowData.status} />}
/>
```

### Template de Ações

```typescript
function ActionsTemplate({ 
  item, 
  onEdit, 
  onDelete 
}: { 
  item: MyType;
  onEdit: (item: MyType) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        severity="info"
        onClick={() => onEdit(item)}
      />
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        onClick={() => onDelete(item.id)}
      />
    </div>
  );
}
```

### Formulário em Dialog

```typescript
<Dialog
  visible={isOpen}
  onHide={onClose}
  header={mode === 'create' ? 'Novo' : 'Editar'}
  style={{ width: '500px' }}
  modal
>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <label htmlFor="name">Nome *</label>
      <InputText
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={classNames({ 'p-invalid': errors.name })}
      />
      {errors.name && <small className="text-red-500">{errors.name}</small>}
    </div>
    
    <div className="flex justify-end gap-2">
      <Button label="Cancelar" outlined onClick={onClose} />
      <Button label="Salvar" type="submit" loading={isSubmitting} />
    </div>
  </form>
</Dialog>
```

## 🎨 Componentes do UI Package

```typescript
// Importar do package
import { 
  DataTable,
  InputText,
  Dropdown,
  Button,
  Tag,
  Card,
  Dialog
} from '@prime-repo/ui';
```

## 🔧 Utilitários Comuns

### Formatadores

```typescript
// Moeda
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

// Data
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('pt-BR');

// Data e Hora
export const formatDateTime = (date: string) =>
  new Date(date).toLocaleString('pt-BR');

// Número
export const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR').format(value);
```

### Validadores

```typescript
// Email
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// CPF
export const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  // Validação completa aqui
  return true;
};

// Telefone
export const isValidPhone = (phone: string) =>
  /^\+?[\d\s-()]+$/.test(phone);
```

### Debounce

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Uso
const searchTerm = useDebounce(inputValue, 500);
```

## 🎯 Padrões de Código

### Naming Conventions

```typescript
// Types: PascalCase
interface User {}
type UserStatus = 'active' | 'inactive';

// Interfaces de props: ComponentNameProps
interface UserFormProps {}

// Hooks: use + PascalCase
function useUsers() {}

// Components: PascalCase
function UsersList() {}

// Services: camelCase
async function fetchUsers() {}

// Constants: UPPER_SNAKE_CASE
const MAX_ITEMS = 100;
```

### Organização de Imports

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. Bibliotecas externas
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

// 3. Packages internos
import { useTableQueryParams } from '@prime-repo/hooks';

// 4. Arquivos locais - types
import type { User, UserFilters } from './types';

// 5. Arquivos locais - services
import { fetchUsers } from './services/userService';

// 6. Arquivos locais - components
import { UserFilters } from './components/Filters';

// 7. Arquivos locais - hooks
import { useUsers } from './hooks';

// 8. Estilos
import './styles.css';
```

### Error Handling

```typescript
// Service Layer
export async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw para o hook tratar
  }
}

// Hook Layer
const table = useTableQueryParams({
  fetchFn: fetchData,
  onError: (error) => {
    toast.error('Erro ao carregar dados');
    console.error(error);
  }
});

// Component Layer
const handleSubmit = async () => {
  try {
    await saveData(formData);
    toast.success('Salvo com sucesso');
  } catch (error) {
    toast.error('Erro ao salvar');
  }
};
```

## 🐛 Debug

### Verificar Estado da Tabela

```typescript
console.log('Current State:', {
  page: getCurrentPage(),
  totalPages: getTotalPages(),
  tableState,
  queryParams,
  data: data.length,
  total: totalRecords
});
```

### Ver Requisição

```typescript
useEffect(() => {
  console.log('Fetching with params:', queryParams);
}, [queryParams]);
```

## 📱 Responsive Classes (Tailwind)

```typescript
// Grid responsivo
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"

// Padding responsivo
className="p-4 md:p-6 lg:p-8"

// Texto responsivo
className="text-sm md:text-base lg:text-lg"

// Ocultar em mobile
className="hidden md:block"

// Mostrar apenas em mobile
className="block md:hidden"
```

## 🎨 Cores PrimeReact

```typescript
// Severity
severity="success"  // Verde
severity="info"     // Azul
severity="warning"  // Amarelo
severity="danger"   // Vermelho
severity="secondary"// Cinza

// Aplicável em: Tag, Button, Message, etc
```

## ⌨️ Atalhos VSCode

Adicione ao `settings.json`:

```json
{
  "editor.snippets": {
    "typescriptreact": {
      "Prime Component": {
        "prefix": "pcomp",
        "body": [
          "interface ${1:Component}Props {",
          "  $2",
          "}",
          "",
          "export function ${1:Component}({ $3 }: ${1:Component}Props) {",
          "  return (",
          "    <div>",
          "      $0",
          "    </div>",
          "  );",
          "}"
        ]
      }
    }
  }
}
```

## 🔍 Checklist de Feature

- [ ] Criar estrutura de diretórios
- [ ] Definir types
- [ ] Implementar service
- [ ] Criar hook customizado
- [ ] Criar componente de filtros
- [ ] Criar componente de formulário
- [ ] Criar view
- [ ] Criar page
- [ ] Adicionar à rota
- [ ] Testar CRUD
- [ ] Testar filtros
- [ ] Testar paginação
- [ ] Revisar responsividade
- [ ] Adicionar loading states
- [ ] Adicionar mensagens de erro
- [ ] Code review
