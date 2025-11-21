# @prime-repo/shared

Componentes React, hooks e contexts compartilhados.

## 📦 Estrutura

```
@prime-repo/shared
├── /permissions  - Sistema de permissões
├── /hooks        - Custom React hooks
├── /components   - Componentes compartilhados
└── /contexts     - React contexts
```

---

## 🔐 Permissions

Sistema completo de permissões e roles.

### Setup

```typescript
import { PermissionProvider, AuthProvider } from '@prime-repo/shared';

function App() {
  const user = {
    id: '1',
    roles: ['admin'],
    permissions: ['users:create', 'users:edit']
  };

  return (
    <AuthProvider initialUser={user}>
      <PermissionProvider user={user}>
        <YourApp />
      </PermissionProvider>
    </AuthProvider>
  );
}
```

### PermissionGuard Component

```typescript
import { PermissionGuard } from '@prime-repo/shared/permissions';

<PermissionGuard
  roles={['admin']}
  fallback={<div>Sem permissão</div>}
>
  <AdminPanel />
</PermissionGuard>

<PermissionGuard
  permissions={['users:create']}
  requireAll
>
  <CreateUserButton />
</PermissionGuard>
```

### usePermission Hook

```typescript
import { usePermission, useHasRole } from '@prime-repo/shared/permissions';

function MyComponent() {
  const canEdit = usePermission({
    permissions: ['users:edit'],
    roles: ['admin', 'editor'],
  });

  const isAdmin = useHasRole('admin');

  return canEdit ? <EditButton /> : null;
}
```

### Utils (can be used outside React)

```typescript
import { checkPermission, hasRole, hasPermission } from '@prime-repo/shared/permissions';

const user = { roles: ['admin'], permissions: ['users:edit'] };

checkPermission(user, { roles: ['admin'] }); // true
hasRole(user, 'admin', 'editor'); // true (any)
hasPermission(user, 'users:edit'); // true
```

---

## 🪝 Hooks

### useLocalStorage

```typescript
import { useLocalStorage } from '@prime-repo/shared/hooks';

const [name, setName, removeName] = useLocalStorage('name', 'John');
```

### useDebounce / useThrottle

```typescript
import { useDebounce, useThrottle } from '@prime-repo/shared/hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);
const throttledSearch = useThrottle(search, 500);
```

### useMediaQuery

```typescript
import { useMediaQuery, useIsMobile, useIsDesktop } from '@prime-repo/shared/hooks';

const isMobile = useIsMobile();
const isLargeScreen = useMediaQuery('(min-width: 1280px)');
```

### useOnClickOutside

```typescript
import { useOnClickOutside } from '@prime-repo/shared/hooks';

const ref = useRef(null);
useOnClickOutside(ref, () => {
  setIsOpen(false);
});

<div ref={ref}>Content</div>
```

### useToggle

```typescript
import { useToggle } from '@prime-repo/shared/hooks';

const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
```

### usePrevious

```typescript
import { usePrevious } from '@prime-repo/shared/hooks';

const [count, setCount] = useState(0);
const prevCount = usePrevious(count);
```

### useAsync

```typescript
import { useAsync } from '@prime-repo/shared/hooks';

const { data, loading, error, execute } = useAsync(
  async () => fetch('/api/data'),
  true // immediate execution
);
```

---

## 🎨 Components

### ErrorBoundary

```typescript
import { ErrorBoundary } from '@prime-repo/shared/components';

<ErrorBoundary
  fallback={<CustomErrorPage />}
  onError={(error, info) => console.log(error)}
>
  <YourApp />
</ErrorBoundary>
```

### LoadingSpinner

```typescript
import { LoadingSpinner } from '@prime-repo/shared/components';

<LoadingSpinner size="medium" message="Carregando..." />
<LoadingSpinner fullScreen />
```

### ConfirmDialog

```typescript
import { ConfirmDialog } from '@prime-repo/shared/components';
import { useToggle } from '@prime-repo/shared/hooks';

const [visible, toggle] = useToggle(false);

<ConfirmDialog
  visible={visible}
  onHide={toggle}
  onConfirm={handleDelete}
  title="Confirmar exclusão"
  message="Deseja realmente excluir este item?"
  severity="danger"
/>
```

### Toast Notifications

```typescript
import { ToastProvider, useToast } from '@prime-repo/shared/components';

// Wrap app
<ToastProvider>
  <App />
</ToastProvider>

// Use in component
function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSave = () => {
    showSuccess('Item salvo com sucesso!');
  };

  return <button onClick={handleSave}>Salvar</button>;
}
```

---

## 🌐 Contexts

### AuthContext

```typescript
import { AuthProvider, useAuth } from '@prime-repo/shared/contexts';

// Wrap app
<AuthProvider initialUser={user}>
  <App />
</AuthProvider>

// Use in component
function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login(userData)}>Login</button>
      )}
    </div>
  );
}
```

### ThemeContext

```typescript
import { ThemeProvider, useTheme } from '@prime-repo/shared/contexts';

// Wrap app
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>

// Use in component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

### NotificationContext

```typescript
// Same as ToastProvider
import { NotificationProvider, useNotification } from '@prime-repo/shared/contexts';
```

---

## 💡 Exemplo Completo

```typescript
import {
  AuthProvider,
  ThemeProvider,
  ToastProvider,
  PermissionProvider,
  ErrorBoundary,
} from '@prime-repo/shared';

function App() {
  const user = {
    id: '1',
    name: 'John',
    email: 'john@example.com',
    roles: ['admin'],
    permissions: ['users:create', 'users:edit'],
  };

  return (
    <ErrorBoundary>
      <AuthProvider initialUser={user}>
        <ThemeProvider>
          <ToastProvider>
            <PermissionProvider user={user}>
              <YourApp />
            </PermissionProvider>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
```

---

## 🚀 Como Usar

### Build

```bash
pnpm --filter @prime-repo/shared build
```

### Import

```typescript
// Modular (recomendado)
import { usePermission, PermissionGuard } from '@prime-repo/shared/permissions';
import { useDebounce, useLocalStorage } from '@prime-repo/shared/hooks';
import { ErrorBoundary, LoadingSpinner } from '@prime-repo/shared/components';
import { useAuth, useTheme } from '@prime-repo/shared/contexts';

// Ou do root
import { usePermission, useDebounce, ErrorBoundary, useAuth } from '@prime-repo/shared';
```
