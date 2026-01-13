# Arquitetura Visual - Prime Repo

## 📐 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                          PAGE COMPONENT                         │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                       page.tsx                            │ │
│  │  - Wrapper final                                          │ │
│  │  - Providers de contexto                                 │ │
│  │  - Verificações de permissão                             │ │
│  │  - Layout específico                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         VIEW COMPONENT                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                       view.tsx                            │ │
│  │  - Composição visual                                      │ │
│  │  - Usa hooks customizados                                 │ │
│  │  - Renderiza componentes                                  │ │
│  │  - Gerencia UI state                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
          ↓                    ↓                    ↓
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   COMPONENTS     │  │   CUSTOM HOOKS   │  │      TYPES       │
│                  │  │                  │  │                  │
│ components/      │  │    hooks.ts      │  │    types.ts      │
│  ├─ Filters.tsx │  │                  │  │                  │
│  └─ Form.tsx    │  │  Uses:           │  │  Defines:        │
│                  │  │  ↓               │  │  - Interfaces    │
│  - Reutilizáveis │  │  useTableQuery   │  │  - Types         │
│  - Isolados      │  │  Params          │  │  - Enums         │
│  - Testáveis     │  │  ↓               │  │                  │
│                  │  │  Calls:          │  │                  │
│                  │  │  Services        │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │    SERVICES      │
                    │                  │
                    │  services/       │
                    │  └─ service.ts   │
                    │                  │
                    │  - API calls     │
                    │  - Data fetch    │
                    │  - CRUD ops      │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │   BACKEND API    │
                    │                  │
                    │  /api/users      │
                    │  /api/products   │
                    │  ...             │
                    └──────────────────┘
```

## 🔄 Ciclo de Vida de uma Requisição

```
1. USER ACTION
   │
   ├─ Click em botão
   ├─ Mudança de filtro
   └─ Paginação
   
2. VIEW COMPONENT
   │
   └─ Chama função do hook
   
3. CUSTOM HOOK
   │
   ├─ useTableQueryParams
   │  │
   │  ├─ Atualiza state
   │  └─ Calcula queryParams
   │
   └─ Chama fetchFn
   
4. SERVICE
   │
   ├─ Formata requisição
   ├─ Chama API
   └─ Retorna dados tipados
   
5. HOOK ATUALIZA STATE
   │
   ├─ data
   ├─ totalRecords
   ├─ isLoading
   └─ tableState
   
6. VIEW RE-RENDERIZA
   │
   └─ Mostra novos dados
```

## 🏗️ Estrutura de Arquivo Detalhada

```
feature-name/
│
├── types.ts                    # 📋 TIPOS
│   ├── Entity interfaces
│   ├── Filter interfaces
│   ├── Form data interfaces
│   └── Enums
│
├── services/                   # 🔌 CAMADA DE API
│   └── featureService.ts
│       ├── fetchItems()       → PaginatedResponse<T>
│       ├── createItem()       → T
│       ├── updateItem()       → T
│       └── deleteItem()       → void
│
├── hooks.ts                    # 🎣 LÓGICA DE NEGÓCIO
│   └── useFeature()
│       ├── useTableQueryParams<T, F>()
│       ├── Modal state
│       ├── CRUD handlers
│       └── Custom logic
│
├── components/                 # 🧩 UI COMPONENTS
│   ├── Filters.tsx
│   │   ├── Props: filters, onChange, onReset
│   │   └── Renders: InputText, Dropdown, etc
│   │
│   └── Form.tsx
│       ├── Props: visible, mode, data, onSubmit
│       └── Renders: Dialog, InputText, etc
│
├── view.tsx                    # 👁️ COMPOSIÇÃO VISUAL
│   └── FeatureView()
│       ├── const { ... } = useFeature()
│       ├── Renders: Cards, Filters, DataTable, Form
│       └── Handles: UI events
│
└── page.tsx                    # 📄 WRAPPER
    └── FeaturePage()
        ├── Providers
        ├── Layout
        └── <FeatureView />
```

## 🎯 Hook useTableQueryParams - Internals

```
┌──────────────────────────────────────────────────────┐
│           useTableQueryParams<TData, TFilters>       │
├──────────────────────────────────────────────────────┤
│                                                      │
│  INPUT (Config):                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │ fetchFn: (params) => Promise<PaginatedResp>   │ │
│  │ initialPageSize: 10                            │ │
│  │ initialSortField?: string                      │ │
│  │ initialFilters?: TFilters                      │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  INTERNAL STATE:                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │ tableState: {                                  │ │
│  │   first: 0                                     │ │
│  │   rows: 10                                     │ │
│  │   sortField?: string                           │ │
│  │   sortOrder?: -1 | 0 | 1                       │ │
│  │   customFilters?: TFilters                     │ │
│  │ }                                              │ │
│  │                                                │ │
│  │ data: TData[]                                  │ │
│  │ totalRecords: number                           │ │
│  │ isLoading: boolean                             │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  COMPUTED:                                           │
│  ┌────────────────────────────────────────────────┐ │
│  │ queryParams: {                                 │ │
│  │   page: Math.floor(first / rows) + 1          │ │
│  │   pageSize: rows                               │ │
│  │   sortField: tableState.sortField              │ │
│  │   sortOrder: tableState.sortOrder              │ │
│  │   filters: tableState.customFilters            │ │
│  │ }                                              │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  OUTPUT (Actions):                                   │
│  ┌────────────────────────────────────────────────┐ │
│  │ onPage(event)        → Update first/rows       │ │
│  │ onSort(event)        → Update sort, reset page │ │
│  │ setCustomFilters()   → Update filters, reset   │ │
│  │ resetFilters()       → Clear all filters       │ │
│  │ refetch()            → Manual refresh          │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## 🔀 Fluxo de Mudança de Filtro

```
USER
  │
  └─> Altera valor no componente Filters
         │
         └─> onChange({ status: 'active' })
                │
                └─> setCustomFilters({ status: 'active' })
                       │
                       ├─> Atualiza tableState.customFilters
                       ├─> Reset tableState.first = 0
                       └─> Recalcula queryParams
                              │
                              └─> useEffect detecta mudança
                                     │
                                     └─> fetchData()
                                            │
                                            ├─> setIsLoading(true)
                                            ├─> await fetchFn(queryParams)
                                            ├─> setData(response.data)
                                            ├─> setTotalRecords(response.total)
                                            └─> setIsLoading(false)
                                                   │
                                                   └─> DataTable re-renderiza
```

## 📊 Exemplo de Estado Completo

```typescript
// Estado interno do hook após interações do usuário
{
  // TableState
  tableState: {
    first: 20,              // Página 3 (20 = 10 * 2)
    rows: 10,               // 10 itens por página
    sortField: 'createdAt', // Ordenando por data
    sortOrder: -1,          // Descendente
    customFilters: {        // Filtros aplicados
      status: 'active',
      role: 'admin',
      searchTerm: 'john'
    }
  },
  
  // Query Params (calculado)
  queryParams: {
    page: 3,                // Página atual
    pageSize: 10,
    sortField: 'createdAt',
    sortOrder: -1,
    filters: {
      status: 'active',
      role: 'admin',
      searchTerm: 'john'
    }
  },
  
  // Data State
  data: [...],              // 10 usuários da página 3
  totalRecords: 156,        // Total de registros no backend
  isLoading: false
}
```

## 🎨 Padrão de Composição

```
Page
 │
 └─ View
     │
     ├─ Stats Cards
     │   └─ Card (x4)
     │
     ├─ Filters Component
     │   ├─ InputText (search)
     │   ├─ Dropdown (status)
     │   ├─ Dropdown (role)
     │   └─ Button (reset)
     │
     ├─ DataTable
     │   ├─ Column (id)
     │   ├─ Column (name)
     │   ├─ Column (email)
     │   ├─ Column (status) → StatusTemplate
     │   └─ Column (actions) → ActionsTemplate
     │
     └─ Form Modal
         ├─ InputText (name)
         ├─ InputText (email)
         ├─ Dropdown (role)
         └─ Buttons (cancel, submit)
```

## 🧪 Testing Strategy

```
types.ts
 └─ No tests needed (just types)

services/
 └─ Unit tests
     ├─ Mock fetch
     ├─ Test params formatting
     └─ Test response parsing

hooks.ts
 └─ Integration tests
     ├─ Test state updates
     ├─ Test CRUD operations
     └─ Test refetch

components/
 └─ Component tests
     ├─ Test rendering
     ├─ Test user interactions
     └─ Test prop changes

view.tsx
 └─ Integration tests
     ├─ Test full flow
     └─ Test composition

page.tsx
 └─ E2E tests
     └─ Test real usage
```

## 🚀 Performance Optimization

```
┌─────────────────────────────────────────┐
│         OPTIMIZATION POINTS             │
├─────────────────────────────────────────┤
│                                         │
│ 1. useCallback nos handlers             │
│    → Evita re-criação de funções        │
│                                         │
│ 2. useMemo no queryParams               │
│    → Só recalcula quando necessário     │
│                                         │
│ 3. Debounce em filtros de busca         │
│    → Reduz requisições                  │
│                                         │
│ 4. Lazy loading de componentes          │
│    → Code splitting                     │
│                                         │
│ 5. Virtualização da tabela              │
│    → Para muitos registros              │
│                                         │
└─────────────────────────────────────────┘
```

## 📱 Responsividade

```
Desktop (> 1024px)
├─ Grid: 4 columns (stats)
├─ Filters: 6 columns
└─ Table: Full width

Tablet (768px - 1024px)
├─ Grid: 2 columns (stats)
├─ Filters: 3 columns
└─ Table: Scrollable

Mobile (< 768px)
├─ Grid: 1 column (stats)
├─ Filters: 1 column
└─ Table: Card view
```
