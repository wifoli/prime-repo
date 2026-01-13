# Guia de Migração

Este guia ajuda a migrar código existente para os novos padrões do Prime Repo.

## 🔄 Migrando Tabelas Existentes

### Antes (Código Antigo)

```typescript
function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    loadUsers();
  }, [first, rows]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users?page=${first}&size=${rows}`);
      const data = await response.json();
      setUsers(data.items);
      setTotalRecords(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <DataTable
      value={users}
      lazy
      paginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      onPage={onPage}
      loading={loading}
    >
      {/* columns */}
    </DataTable>
  );
}
```

### Depois (Novo Padrão)

```typescript
function UsersPage() {
  const {
    data,
    tableState,
    totalRecords,
    isLoading,
    onPage
  } = useTableQueryParams<User>({
    fetchFn: fetchUsers,
    initialPageSize: 10
  });

  return (
    <DataTable
      value={data}
      lazy
      paginator
      first={tableState.first}
      rows={tableState.rows}
      totalRecords={totalRecords}
      onPage={onPage}
      loading={isLoading}
    >
      {/* columns */}
    </DataTable>
  );
}
```

### Benefícios

✅ **90% menos código**
✅ **Tipagem automática**
✅ **Gerenciamento de estado simplificado**
✅ **Filtros e ordenação incluídos**

## 📝 Reestruturando Arquivos

### Estrutura Antiga

```
pages/
└── Users.tsx  (500+ linhas)
```

### Nova Estrutura

```
pages/
└── Users/
    ├── types.ts           # ~50 linhas
    ├── services/
    │   └── userService.ts # ~100 linhas
    ├── hooks.ts           # ~80 linhas
    ├── components/
    │   ├── Filters.tsx    # ~100 linhas
    │   └── Form.tsx       # ~120 linhas
    ├── view.tsx           # ~150 linhas
    └── page.tsx           # ~10 linhas
```

### Benefícios

✅ **Código organizado e fácil de encontrar**
✅ **Componentes reutilizáveis**
✅ **Testes mais simples**
✅ **Manutenção facilitada**

## 🎯 Passo a Passo da Migração

### 1. Criar Estrutura de Diretórios

```bash
mkdir -p src/pages/Users/{services,components}
```

### 2. Extrair Types

Mova todas as interfaces para `types.ts`:

```typescript
// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserFilters {
  status?: string;
  searchTerm?: string;
}
```

### 3. Criar Service Layer

Mova chamadas de API para `services/userService.ts`:

```typescript
// services/userService.ts
import type { PaginatedResponse, TableQueryParams } from '@/hooks/useTableQueryParams';
import type { User, UserFilters } from '../types';

export async function fetchUsers(
  params: TableQueryParams<UserFilters>
): Promise<PaginatedResponse<User>> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  
  return response.json();
}
```

### 4. Criar Custom Hook

Mova lógica de estado para `hooks.ts`:

```typescript
// hooks.ts
import { useTableQueryParams } from '@/hooks/useTableQueryParams';
import { fetchUsers } from './services/userService';
import type { User, UserFilters } from './types';

export function useUsers() {
  return useTableQueryParams<User, UserFilters>({
    fetchFn: fetchUsers,
    initialPageSize: 10
  });
}
```

### 5. Extrair Componentes

Crie componentes reutilizáveis:

```typescript
// components/Filters.tsx
export function UserFilters({ filters, onChange, onReset }) {
  return (
    <div>
      <InputText
        value={filters.searchTerm}
        onChange={(e) => onChange({ searchTerm: e.target.value })}
      />
      <Button onClick={onReset}>Limpar</Button>
    </div>
  );
}
```

### 6. Criar View

```typescript
// view.tsx
import { useUsers } from './hooks';
import { UserFilters } from './components/Filters';

export function UsersView() {
  const {
    data,
    tableState,
    totalRecords,
    isLoading,
    onPage,
    setCustomFilters,
    resetFilters
  } = useUsers();

  return (
    <div>
      <UserFilters
        filters={tableState.customFilters}
        onChange={setCustomFilters}
        onReset={resetFilters}
      />
      
      <DataTable
        value={data}
        lazy
        paginator
        first={tableState.first}
        rows={tableState.rows}
        totalRecords={totalRecords}
        onPage={onPage}
        loading={isLoading}
      >
        <Column field="name" header="Nome" />
        <Column field="email" header="Email" />
      </DataTable>
    </div>
  );
}
```

### 7. Criar Page

```typescript
// page.tsx
import { UsersView } from './view';

export function UsersPage() {
  return <UsersView />;
}

export default UsersPage;
```

## 🔧 Migrando Filtros

### Antes

```typescript
const [filters, setFilters] = useState({
  status: undefined,
  searchTerm: ''
});

useEffect(() => {
  loadData();
}, [filters]);

const handleFilterChange = (key, value) => {
  setFilters(prev => ({ ...prev, [key]: value }));
};
```

### Depois

```typescript
const { setCustomFilters } = useTableQueryParams<User, UserFilters>({
  fetchFn: fetchUsers,
  initialFilters: { status: 'active' }
});

// Atualizar filtros
setCustomFilters({ status: 'inactive' });

// Limpar filtros
resetFilters();
```

## 📊 Migrando Ordenação

### Antes

```typescript
const [sortField, setSortField] = useState('name');
const [sortOrder, setSortOrder] = useState(1);

const onSort = (event) => {
  setSortField(event.sortField);
  setSortOrder(event.sortOrder);
  loadData();
};
```

### Depois

```typescript
const { onSort, tableState } = useTableQueryParams<User>({
  fetchFn: fetchUsers,
  initialSortField: 'name',
  initialSortOrder: 1
});

// onSort já está pronto para usar
// tableState.sortField e tableState.sortOrder disponíveis
```

## 🎨 Migrando Componentes de Formulário

### Antes

```typescript
function UserForm({ user, onSave }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    // validação manual
  };
  
  const handleSubmit = async () => {
    if (validate()) {
      await onSave(formData);
    }
  };
  
  // 100+ linhas de formulário
}
```

### Depois

Separe em componente próprio:

```typescript
// components/UserForm.tsx
interface UserFormProps {
  visible: boolean;
  mode: 'create' | 'edit';
  user?: User;
  onHide: () => void;
  onSubmit: (data: CreateUserData) => Promise<void>;
}

export function UserForm({ visible, mode, user, onHide, onSubmit }: UserFormProps) {
  // Formulário isolado e reutilizável
}
```

## 🚀 Checklist de Migração

- [ ] Criar estrutura de diretórios
- [ ] Extrair types para `types.ts`
- [ ] Mover APIs para `services/`
- [ ] Criar custom hook em `hooks.ts`
- [ ] Extrair componentes reutilizáveis
- [ ] Criar `view.tsx` com composição
- [ ] Criar `page.tsx` como wrapper
- [ ] Adicionar tratamento de erros
- [ ] Testar paginação
- [ ] Testar filtros
- [ ] Testar ordenação
- [ ] Revisar tipos TypeScript
- [ ] Remover código antigo

## 💡 Dicas de Migração

### 1. Migre Gradualmente

Não tente migrar tudo de uma vez. Comece por uma página simples.

### 2. Mantenha Compatibilidade

Durante a migração, você pode ter código antigo e novo coexistindo.

### 3. Use TypeScript

Aproveite a migração para adicionar tipagem forte.

### 4. Teste Incrementalmente

Teste cada parte migrada antes de continuar.

### 5. Documente Mudanças

Mantenha um log do que foi migrado e como.

## 🐛 Problemas Comuns

### Build Error: Cannot find module

**Problema**: Imports quebrados após reestruturação

**Solução**: Use path aliases no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Hook re-renderiza infinitamente

**Problema**: fetchFn recriada a cada render

**Solução**: Use useCallback:

```typescript
const fetchFn = useCallback(
  (params) => fetchUsers(params),
  []
);

const table = useTableQueryParams({ fetchFn });
```

### Filtros não persistem

**Problema**: Estado perdido ao navegar

**Solução**: Use query params ou localStorage se necessário

## 📈 Resultados Esperados

Após a migração, você terá:

- ✅ **50-70% menos código**
- ✅ **Melhor organização**
- ✅ **Mais fácil de manter**
- ✅ **Reutilização de componentes**
- ✅ **Tipagem forte**
- ✅ **Testes mais simples**

## 🎓 Exemplo Completo

Veja `users-example/` para um exemplo completo de migração com:

- CRUD completo
- Filtros avançados
- Formulários
- Validação
- Loading states
- Error handling

## 📞 Ajuda

Se encontrar problemas:

1. Revise este guia
2. Consulte o [GUIDE.md](./GUIDE.md)
3. Veja os exemplos práticos
4. Verifique a documentação do PrimeReact
