# 🪝 Novos Hooks Adicionados

## ✅ 4 Hooks Novos

### 1. **useQueryParams** - Sincroniza estado com URL

```typescript
import { useQueryParams } from '@prime-repo/shared/hooks';

function ProductList() {
  const [filters, setFilters, clearFilters] = useQueryParams({
    search: '',
    category: '',
    page: 1,
    pageSize: 10
  });

  // URL: /products?search=phone&category=electronics&page=2

  return (
    <div>
      <input
        value={filters.search}
        onChange={e => setFilters({ search: e.target.value })}
      />
      
      <select
        value={filters.category}
        onChange={e => setFilters({ category: e.target.value })}
      >
        <option value="">Todas</option>
        <option value="electronics">Eletrônicos</option>
      </select>

      <button onClick={clearFilters}>Limpar Filtros</button>

      {/* Filtros sincronizados com URL automaticamente */}
    </div>
  );
}
```

---

### 2. **usePagination** - Paginação padronizada

```typescript
import { usePagination } from '@prime-repo/shared/hooks';

function DataTable() {
  const {
    page,
    pageSize,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    setTotalItems
  } = usePagination({
    initialPage: 1,
    initialPageSize: 10,
    totalItems: 0
  });

  useEffect(() => {
    // Buscar dados
    fetchData(page, pageSize).then(data => {
      setTotalItems(data.total);
    });
  }, [page, pageSize]);

  return (
    <div>
      {/* Tabela */}
      <table>...</table>

      {/* Controles de paginação */}
      <div>
        <button onClick={prevPage} disabled={!hasPrevPage}>
          Anterior
        </button>
        
        <span>Página {page} de {totalPages}</span>
        
        <button onClick={nextPage} disabled={!hasNextPage}>
          Próximo
        </button>

        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
```

---

### 3. **useKeyboardShortcuts** - Atalhos de teclado

```typescript
import { useKeyboardShortcuts, commonShortcuts } from '@prime-repo/shared/hooks';

function Editor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useKeyboardShortcuts({
    // Salvar
    'ctrl+s': (e) => {
      handleSave();
    },
    
    // Fechar modal
    'esc': () => {
      setIsModalOpen(false);
    },
    
    // Focar busca
    '/': (e) => {
      document.getElementById('search')?.focus();
    },
    
    // Ctrl+K para command palette
    'ctrl+k': () => {
      openCommandPalette();
    },

    // Cmd+S no Mac
    'cmd+s': () => {
      handleSave();
    }
  });

  return <div>...</div>;
}
```

**Combos suportados:**
- `ctrl+s`, `cmd+s` (Ctrl/Cmd + S)
- `esc`, `escape`
- `/`, `space`
- `ctrl+shift+k` (múltiplos modificadores)
- `alt+enter`

---

### 4. **useForm** - Formulários com validação integrada

```typescript
import { useForm } from '@prime-repo/shared/hooks';
import { required, email, minLength } from '@prime-repo/utils/validations';

function RegisterForm() {
  const form = useForm({
    name: {
      initialValue: '',
      validators: [required, minLength(3)]
    },
    email: {
      initialValue: '',
      validators: [required, email]
    },
    password: {
      initialValue: '',
      validators: [required, minLength(8)]
    }
  });

  const onSubmit = async (values) => {
    await registerUser(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <input
          value={form.values.name}
          onChange={form.handleChange('name')}
          onBlur={form.handleBlur('name')}
        />
        {form.touched.name && form.errors.name && (
          <span className="error">{form.errors.name}</span>
        )}
      </div>

      <div>
        <input
          type="email"
          value={form.values.email}
          onChange={form.handleChange('email')}
          onBlur={form.handleBlur('email')}
        />
        {form.touched.email && form.errors.email && (
          <span className="error">{form.errors.email}</span>
        )}
      </div>

      <div>
        <input
          type="password"
          value={form.values.password}
          onChange={form.handleChange('password')}
          onBlur={form.handleBlur('password')}
        />
        {form.touched.password && form.errors.password && (
          <span className="error">{form.errors.password}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={!form.isValid || form.isSubmitting}
      >
        {form.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>

      <button type="button" onClick={form.reset}>
        Limpar
      </button>
    </form>
  );
}
```

**Features do useForm:**
- ✅ Validação integrada com `@prime-repo/utils/validations`
- ✅ Validação on blur e on change
- ✅ Touched state
- ✅ isValid e isSubmitting
- ✅ Reset form
- ✅ Set valores programaticamente

---

## 📊 Total de Hooks

**12 hooks no total:**

**Já existiam (8):**
1. useLocalStorage
2. useDebounce
3. useThrottle
4. useMediaQuery
5. useOnClickOutside
6. useToggle
7. usePrevious
8. useAsync

**Novos (4):**
9. useQueryParams ⭐
10. usePagination ⭐
11. useKeyboardShortcuts ⭐
12. useForm ⭐

---

## 💡 Exemplo Completo - Tabela com Filtros

```typescript
import {
  useQueryParams,
  usePagination,
  useKeyboardShortcuts,
  useDebounce
} from '@prime-repo/shared/hooks';

function UserTable() {
  // Query params (sincroniza com URL)
  const [filters, setFilters] = useQueryParams({
    search: '',
    role: '',
    status: 'active'
  });

  // Debounce da busca
  const debouncedSearch = useDebounce(filters.search, 500);

  // Paginação
  const pagination = usePagination({
    initialPage: Number(filters.page) || 1,
    initialPageSize: 10
  });

  // Atalhos
  useKeyboardShortcuts({
    '/': () => document.getElementById('search')?.focus(),
    'ctrl+k': () => setFilters({ search: '' })
  });

  // Fetch data
  useEffect(() => {
    fetchUsers({
      search: debouncedSearch,
      role: filters.role,
      page: pagination.page,
      pageSize: pagination.pageSize
    }).then(data => {
      pagination.setTotalItems(data.total);
    });
  }, [debouncedSearch, filters.role, pagination.page, pagination.pageSize]);

  return (
    <div>
      <input
        id="search"
        value={filters.search}
        onChange={e => setFilters({ search: e.target.value })}
        placeholder="Buscar... (pressione /)"
      />

      {/* Table */}
      <table>...</table>

      {/* Pagination */}
      <Pagination {...pagination} />
    </div>
  );
}
```
