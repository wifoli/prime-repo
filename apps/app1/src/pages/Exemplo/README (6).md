# Prime Repo - Exemplos de Uso

Este diretório contém exemplos práticos e bem estruturados de como utilizar os recursos do Prime Repo.

## 📚 Conteúdo

### 1. Hook de Tabela (`useTableQueryParams.ts`)
Hook genérico com suporte a:
- Paginação server-side
- Ordenação
- Filtros customizados tipados
- Loading states
- Refetch manual

### 2. Exemplo de Usuários (`users-example/`)
Exemplo completo de CRUD com:
- Listagem com paginação
- Filtros avançados
- Formulário de criação/edição
- Estatísticas em cards
- Ações de editar/excluir

### 3. Exemplo de Produtos (`products-example/`)
Exemplo simplificado mostrando:
- Types básicos
- Service layer
- Estrutura de arquivos

## 🚀 Quick Start

### 1. Copie o Hook

```bash
# Copie para seu projeto
cp useTableQueryParams.ts /seu-projeto/src/hooks/
```

### 2. Use no Componente

```typescript
import { useTableQueryParams } from '@/hooks/useTableQueryParams';

interface User {
  id: number;
  name: string;
}

interface UserFilters {
  status?: string;
}

function UsersPage() {
  const {
    data,
    totalRecords,
    isLoading,
    onPage,
    onSort
  } = useTableQueryParams<User, UserFilters>({
    fetchFn: fetchUsers,
    initialPageSize: 10
  });

  return (
    <DataTable
      value={data}
      lazy
      paginator
      totalRecords={totalRecords}
      loading={isLoading}
      onPage={onPage}
      onSort={onSort}
    >
      {/* Columns */}
    </DataTable>
  );
}
```

## 📋 Estrutura Recomendada

```
feature/
├── types.ts              # Tipos e interfaces
├── services/
│   └── featureService.ts # API calls
├── hooks.ts              # Lógica de negócio
├── components/
│   ├── Filters.tsx       # Filtros
│   └── Form.tsx          # Formulário
├── view.tsx              # UI principal
└── page.tsx              # Wrapper
```

## 🎯 Exemplos por Caso de Uso

### Tabela Básica
```typescript
const { data, isLoading } = useTableQueryParams<Product>({
  fetchFn: fetchProducts
});
```

### Tabela com Filtros
```typescript
const {
  data,
  setCustomFilters
} = useTableQueryParams<Product, ProductFilters>({
  fetchFn: fetchProducts,
  initialFilters: { category: 'electronics' }
});

// Atualizar filtros
setCustomFilters({ category: 'books' });
```

### CRUD Completo
Ver `users-example/` para exemplo completo com:
- Create, Read, Update, Delete
- Modal de formulário
- Validação
- Estados de loading

## 📖 Documentação

- **[GUIDE.md](./GUIDE.md)**: Guia completo com todos os padrões
- **[MIGRATION.md](./MIGRATION.md)**: Como migrar código existente

## 🔧 Recursos

### useTableQueryParams API

```typescript
interface UseTableQueryParamsConfig<TData, TFilters> {
  fetchFn: (params: TableQueryParams<TFilters>) => Promise<PaginatedResponse<TData>>;
  initialPageSize?: number;
  initialSortField?: string;
  initialSortOrder?: SortOrder;
  initialFilters?: TFilters;
  onError?: (error: Error) => void;
}
```

### Retorno

```typescript
{
  // Estado
  tableState: TableState<TFilters>;
  queryParams: TableQueryParams<TFilters>;
  data: TData[];
  totalRecords: number;
  isLoading: boolean;
  
  // Eventos DataTable
  onPage: (event) => void;
  onSort: (event) => void;
  onFilter: (event) => void;
  
  // Filtros customizados
  setCustomFilters: (filters: Partial<TFilters>) => void;
  resetFilters: () => void;
  
  // Utilitários
  refetch: () => void;
  getCurrentPage: () => number;
  getTotalPages: () => number;
}
```

## 💡 Dicas

1. **Sempre tipifique** o hook com generics
2. **Separe responsabilidades** em arquivos diferentes
3. **Reutilize componentes** de filtros e forms
4. **Trate erros** com callbacks
5. **Use TypeScript** em modo strict

## 🐛 Problemas Comuns

### Hook não está tipado
```typescript
// ❌ Errado
const table = useTableQueryParams({ fetchFn });

// ✅ Correto
const table = useTableQueryParams<User, UserFilters>({ fetchFn });
```

### Filtros não funcionam
```typescript
// Use setCustomFilters para filtros customizados
setCustomFilters({ status: 'active' });

// onFilter é para filtros do DataTable
```

### Paginação não reseta
```typescript
// O hook já reseta automaticamente ao:
// - Mudar ordenação (onSort)
// - Mudar filtros (setCustomFilters)
// - Resetar filtros (resetFilters)
```

## 📦 Integração

### Com Aplicação App1/App2

```typescript
// apps/app1/src/pages/Users/index.tsx
import { UsersPage } from './page';

export default UsersPage;
```

### Com Package UI

```typescript
// Usar componentes do @prime-repo/ui
import { DataTable } from '@prime-repo/ui';
```

## 🔄 Próximos Passos

1. Copie os exemplos para seu app
2. Adapte os types para sua API
3. Implemente os services reais
4. Customize os componentes
5. Adicione validações específicas

## 📞 Suporte

Para dúvidas:
1. Leia o [GUIDE.md](./GUIDE.md)
2. Veja os exemplos em `users-example/`
3. Consulte a documentação do PrimeReact
