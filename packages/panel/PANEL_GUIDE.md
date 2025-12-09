# 🏢 Panel Layout Guide - @prime-repo/panel

Template/Painel base completo para aplicações com layout profissional incluindo Header, Sidebar colapsável, Footer e sistema de navegação integrado.

---

## 📦 Instalação

```json
// No seu app (apps/app1/package.json ou apps/app2/package.json)
{
  "dependencies": {
    "@prime-repo/panel": "workspace:*",
    "@prime-repo/ui": "workspace:*",
    "react-router-dom": "^6.28.0"
  }
}
```

```bash
# Instalar dependências
pnpm install
```

---

## 🎯 Setup Básico

### 1. Importações

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PanelProvider, Layout, PanelConfig } from '@prime-repo/panel';
import '@prime-repo/ui/styles.css';
import '@prime-repo/panel/styles.css';
```

### 2. Configuração

```typescript
const panelConfig: PanelConfig = {
  appName: 'My App',
  appLogo: '/logo.png',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      path: '/'
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      path: '/users'
    }
  ],
  userMenu: [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => console.log('Profile clicked')
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => console.log('Logout clicked')
    }
  ],
  showFooter: true,
  footerText: '© 2024 My App. All rights reserved.'
};
```

### 3. Aplicação

```typescript
function App() {
  return (
    <BrowserRouter>
      <PanelProvider config={panelConfig}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Layout>
      </PanelProvider>
    </BrowserRouter>
  );
}
```

---

## 🧩 Componentes

### PanelProvider

Provedor de contexto que gerencia o estado do painel.

#### Props

```typescript
interface PanelProviderProps {
  children: ReactNode;
  config: PanelConfig;
  defaultSidebarCollapsed?: boolean;  // Padrão: false
}
```

#### Exemplo

```typescript
<PanelProvider 
  config={panelConfig}
  defaultSidebarCollapsed={false}
>
  {children}
</PanelProvider>
```

---

### Layout

Componente principal que organiza Header, Sidebar, Content e Footer.

#### Props

```typescript
interface LayoutProps {
  children: ReactNode;
}
```

#### Estrutura HTML Gerada

```html
<div class="panel-container">
  <header class="panel-header">
    <!-- Header content -->
  </header>
  
  <div class="panel-main">
    <aside class="panel-sidebar">
      <!-- Sidebar content -->
    </aside>
    
    <main class="panel-content">
      <!-- Your page content here -->
    </main>
  </div>
  
  <footer class="panel-footer">
    <!-- Footer content -->
  </footer>
</div>
```

#### Exemplo

```typescript
<Layout>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</Layout>
```

---

### Header

Barra superior com logo, nome da aplicação, botão de toggle da sidebar e menu de usuário.

#### Features

- Logo da aplicação (opcional)
- Nome da aplicação
- Botão para colapsar/expandir sidebar
- Menu de usuário customizável
- Sticky (fica fixo no topo)

#### Exemplo de Configuração

```typescript
const config = {
  appName: 'Prime App',
  appLogo: '/logo.png',
  userMenu: [
    {
      label: 'My Profile',
      icon: 'pi pi-user',
      command: () => navigate('/profile')
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => navigate('/settings')
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: handleLogout
    }
  ]
};
```

#### Estrutura Interna

```tsx
<header className="panel-header">
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center gap-4">
      {/* Toggle Button */}
      <Button onClick={toggleSidebar} />
      
      {/* Logo & App Name */}
      <div className="flex items-center gap-3">
        {appLogo && <img src={appLogo} />}
        <h1>{appName}</h1>
      </div>
    </div>
    
    {/* User Menu */}
    <div className="flex items-center gap-3">
      {userMenu.map(item => (
        <Button 
          icon={item.icon}
          label={item.label}
          onClick={item.command}
        />
      ))}
    </div>
  </div>
</header>
```

---

### Sidebar

Menu lateral de navegação com itens configuráveis e estado colapsável.

#### Features

- Colapsável (mostra apenas ícones)
- Navegação integrada com React Router
- Destaque do item ativo
- Transição suave
- Tooltip quando colapsado

#### Estados

**Expandido (w-64):**
```
┌─────────────────┐
│ 🏠 Dashboard    │
│ 👤 Users        │
│ ⚙️  Settings    │
└─────────────────┘
```

**Colapsado (w-16):**
```
┌────┐
│ 🏠 │
│ 👤 │
│ ⚙️  │
└────┘
```

#### Exemplo de Menu Items

```typescript
menuItems: [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    path: '/'
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    path: '/users'
  },
  {
    label: 'Products',
    icon: 'pi pi-box',
    path: '/products'
  },
  {
    label: 'Orders',
    icon: 'pi pi-shopping-cart',
    path: '/orders'
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-line',
    path: '/reports'
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    path: '/settings'
  }
]
```

#### Classes CSS

```css
/* Menu Item */
.menu-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg;
  @apply hover:bg-gray-100 cursor-pointer;
  @apply transition-colors duration-200;
}

/* Menu Item Ativo */
.menu-item.active {
  @apply bg-blue-50 text-blue-600;
}

/* Ícone */
.menu-item-icon {
  @apply text-xl;
}

/* Texto */
.menu-item-text {
  @apply text-sm font-medium;
}
```

---

### Footer

Rodapé opcional com texto customizável.

#### Features

- Opcional (controlado por `showFooter`)
- Texto customizável
- Ano atual automático
- Centralizado

#### Configuração

```typescript
const config = {
  showFooter: true,
  footerText: '© 2024 My Company. All rights reserved.'
};

// Sem footerText customizado:
// Mostra: "© 2024 My App. All rights reserved."
```

#### Estrutura Interna

```tsx
<footer className="panel-footer">
  <div className="px-6 py-4">
    <p className="text-sm text-gray-600 text-center">
      {footerText}
    </p>
  </div>
</footer>
```

---

## 🎨 Configuração (PanelConfig)

### Interface Completa

```typescript
interface PanelConfig {
  appName: string;              // Nome da aplicação (obrigatório)
  appLogo?: string;             // URL do logo (opcional)
  menuItems: MenuItem[];        // Itens do menu principal (obrigatório)
  userMenu?: MenuItem[];        // Itens do menu de usuário (opcional)
  showFooter?: boolean;         // Mostrar footer (opcional, padrão: false)
  footerText?: string;          // Texto customizado do footer (opcional)
}

interface MenuItem {
  label: string;                // Label do item (obrigatório)
  icon?: string;                // Ícone PrimeIcons (opcional)
  path?: string;                // Caminho de navegação (opcional)
  command?: () => void;         // Função ao clicar (opcional)
  items?: MenuItem[];           // Sub-items (futuro, opcional)
}
```

### Exemplos de Configuração

#### Mínima

```typescript
const config: PanelConfig = {
  appName: 'My App',
  menuItems: [
    { label: 'Home', path: '/' }
  ]
};
```

#### Completa

```typescript
const config: PanelConfig = {
  appName: 'Prime Business',
  appLogo: '/assets/logo.png',
  
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      path: '/'
    },
    {
      label: 'Customers',
      icon: 'pi pi-users',
      path: '/customers'
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      path: '/products'
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      path: '/orders'
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      path: '/analytics'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      path: '/settings'
    }
  ],
  
  userMenu: [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => navigate('/profile')
    },
    {
      label: 'Preferences',
      icon: 'pi pi-sliders-h',
      command: () => navigate('/preferences')
    },
    {
      label: 'Help',
      icon: 'pi pi-question-circle',
      command: () => window.open('/help', '_blank')
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: handleLogout
    }
  ],
  
  showFooter: true,
  footerText: '© 2024 Prime Business. All rights reserved.'
};
```

#### Com Actions

```typescript
const config: PanelConfig = {
  appName: 'Admin Panel',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      path: '/'
    },
    {
      label: 'New User',
      icon: 'pi pi-user-plus',
      command: () => setShowUserDialog(true)  // Abre modal
    },
    {
      label: 'Export Data',
      icon: 'pi pi-download',
      command: handleExport  // Executa função
    }
  ]
};
```

---

## 🎣 Hook: usePanelContext

Hook para acessar e controlar o estado do painel.

### Interface

```typescript
interface PanelContextType {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  config: PanelConfig;
}
```

### Exemplo de Uso

```typescript
import { usePanelContext } from '@prime-repo/panel';

function MyComponent() {
  const { 
    sidebarCollapsed, 
    toggleSidebar,
    setSidebarCollapsed,
    config 
  } = usePanelContext();

  return (
    <div>
      <p>App: {config.appName}</p>
      <p>Sidebar: {sidebarCollapsed ? 'Collapsed' : 'Expanded'}</p>
      
      <button onClick={toggleSidebar}>
        Toggle
      </button>
      
      <button onClick={() => setSidebarCollapsed(true)}>
        Collapse
      </button>
      
      <button onClick={() => setSidebarCollapsed(false)}>
        Expand
      </button>
    </div>
  );
}
```

### Casos de Uso

#### Botão Customizado para Toggle

```typescript
function CustomToggle() {
  const { sidebarCollapsed, toggleSidebar } = usePanelContext();
  
  return (
    <button onClick={toggleSidebar}>
      <i className={sidebarCollapsed ? 'pi pi-bars' : 'pi pi-times'} />
    </button>
  );
}
```

#### Salvar Preferência do Usuário

```typescript
function App() {
  const { sidebarCollapsed } = usePanelContext();
  
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);
  
  return <Layout>...</Layout>;
}
```

#### Controle Programático

```typescript
function Dashboard() {
  const { setSidebarCollapsed } = usePanelContext();
  
  // Colapsar sidebar em telas pequenas
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  }, []);
  
  return <div>Dashboard content</div>;
}
```

---

## 🎨 Estilos CSS

### Classes Disponíveis

```css
/* Container Principal */
.panel-container {
  @apply min-h-screen flex flex-col;
}

/* Main (Header + Sidebar + Content) */
.panel-main {
  @apply flex flex-1;
}

/* Sidebar */
.panel-sidebar {
  @apply transition-all duration-300 ease-in-out;
  @apply bg-white border-r border-gray-200;
}

.panel-sidebar.collapsed {
  @apply w-16;
}

.panel-sidebar.expanded {
  @apply w-64;
}

/* Content */
.panel-content {
  @apply flex-1 p-6 overflow-auto bg-gray-50;
}

/* Header */
.panel-header {
  @apply sticky top-0 z-50 bg-white shadow-sm;
}

/* Footer */
.panel-footer {
  @apply bg-white border-t border-gray-200;
}

/* Menu Item */
.menu-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg;
  @apply transition-colors duration-200;
  @apply hover:bg-gray-100 cursor-pointer;
}

.menu-item.active {
  @apply bg-blue-50 text-blue-600;
}

.menu-item-icon {
  @apply text-xl;
}

.menu-item-text {
  @apply text-sm font-medium;
}
```

### Customização

#### Mudar Cores

```css
/* No seu styles.css */
.panel-sidebar {
  @apply bg-gray-900 border-gray-800;
}

.menu-item {
  @apply text-gray-300 hover:bg-gray-800;
}

.menu-item.active {
  @apply bg-blue-600 text-white;
}
```

#### Mudar Larguras

```css
.panel-sidebar.expanded {
  @apply w-80;  /* ao invés de w-64 */
}

.panel-sidebar.collapsed {
  @apply w-20;  /* ao invés de w-16 */
}
```

#### Content Background

```css
.panel-content {
  @apply bg-white;  /* ao invés de bg-gray-50 */
}
```

---

## 📱 Responsividade

O painel funciona bem em todas as telas, mas você pode adicionar comportamento customizado:

### Colapsar Automaticamente em Mobile

```typescript
function App() {
  const isMobile = window.innerWidth < 768;
  
  return (
    <BrowserRouter>
      <PanelProvider 
        config={panelConfig}
        defaultSidebarCollapsed={isMobile}
      >
        <Layout>
          <Routes>...</Routes>
        </Layout>
      </PanelProvider>
    </BrowserRouter>
  );
}
```

### Listener de Resize

```typescript
function ResponsivePanel({ children }: { children: ReactNode }) {
  const { setSidebarCollapsed } = usePanelContext();
  
  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Check inicial
    
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarCollapsed]);
  
  return <>{children}</>;
}
```

### Media Queries Customizadas

```css
/* Esconder footer em mobile */
@media (max-width: 640px) {
  .panel-footer {
    @apply hidden;
  }
}

/* Sidebar sempre colapsada em tablets */
@media (max-width: 1024px) {
  .panel-sidebar.expanded {
    @apply w-16;
  }
  
  .menu-item-text {
    @apply hidden;
  }
}
```

---

## 🎯 Exemplos Completos

### App Básico

```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PanelProvider, Layout, PanelConfig } from '@prime-repo/panel';
import { Dashboard, Users, Settings } from './pages';
import '@prime-repo/ui/styles.css';
import '@prime-repo/panel/styles.css';

const config: PanelConfig = {
  appName: 'My App',
  menuItems: [
    { label: 'Dashboard', icon: 'pi pi-home', path: '/' },
    { label: 'Users', icon: 'pi pi-users', path: '/users' },
    { label: 'Settings', icon: 'pi pi-cog', path: '/settings' }
  ]
};

function App() {
  return (
    <BrowserRouter>
      <PanelProvider config={config}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </PanelProvider>
    </BrowserRouter>
  );
}

export default App;
```

### Com Autenticação

```typescript
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PanelProvider, Layout } from '@prime-repo/panel';
import { Login, Dashboard, Users } from './pages';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated, user, logout } = useAuth();
  
  const config = {
    appName: 'Admin Panel',
    menuItems: [
      { label: 'Dashboard', icon: 'pi pi-home', path: '/' },
      { label: 'Users', icon: 'pi pi-users', path: '/users' }
    ],
    userMenu: [
      { label: user?.name || 'Profile', icon: 'pi pi-user', path: '/profile' },
      { label: 'Logout', icon: 'pi pi-sign-out', command: logout }
    ],
    showFooter: true
  };

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <PanelProvider config={config}>
        <Layout>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </PanelProvider>
    </BrowserRouter>
  );
}
```

### Com Breadcrumbs

```typescript
// Components/Breadcrumbs.tsx
import { usePanelContext } from '@prime-repo/panel';
import { useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const { config } = usePanelContext();
  const location = useLocation();
  
  const currentItem = config.menuItems.find(
    item => item.path === location.pathname
  );
  
  return (
    <div className="flex items-center gap-2 mb-4">
      <i className="pi pi-home text-gray-500" />
      <i className="pi pi-angle-right text-gray-400" />
      <span className="text-gray-700">{currentItem?.label}</span>
    </div>
  );
}

// Em qualquer página:
function Dashboard() {
  return (
    <div>
      <Breadcrumbs />
      <h1>Dashboard</h1>
      {/* ... */}
    </div>
  );
}
```

### Com Permissões

```typescript
const config: PanelConfig = {
  appName: 'Admin',
  menuItems: [
    { label: 'Dashboard', icon: 'pi pi-home', path: '/' },
    
    // Apenas para admins
    ...(user.role === 'admin' ? [
      { label: 'Users', icon: 'pi pi-users', path: '/users' },
      { label: 'Settings', icon: 'pi pi-cog', path: '/settings' }
    ] : []),
    
    // Para todos
    { label: 'Profile', icon: 'pi pi-user', path: '/profile' }
  ]
};
```

---

## 🏗️ Estrutura Interna

```
packages/panel/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── context/
│   │   ├── Panelcontext.tsx
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── panel.css
│   └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

---

## 🔧 Desenvolvimento

### Build

```bash
cd packages/panel
pnpm build

# Ou da raiz
pnpm --filter @prime-repo/panel build
```

### Watch Mode

```bash
cd packages/panel
pnpm dev
```

### Lint

```bash
cd packages/panel
pnpm lint
```

---

## 📦 Exports

```typescript
// Componentes
import { Layout, Header, Sidebar, Footer } from '@prime-repo/panel';

// Context
import { PanelProvider, usePanelContext } from '@prime-repo/panel';

// Types
import { PanelConfig, MenuItem } from '@prime-repo/panel';

// Estilos
import '@prime-repo/panel/styles.css';
```

---

## 💡 Dicas

1. **Sempre use PanelProvider**: Necessário para o Layout funcionar
2. **Importe os estilos**: `import '@prime-repo/panel/styles.css'`
3. **Use React Router**: O painel é integrado com react-router-dom
4. **MenuItem pode ter path OU command**: Não use ambos
5. **Footer é opcional**: Configure `showFooter: false` se não quiser
6. **Sidebar persiste**: Use localStorage para salvar o estado
7. **Mobile first**: Configure `defaultSidebarCollapsed` baseado na tela
8. **Customize via CSS**: Sobrescreva as classes para mudar aparência

---

**Versão:** 0.0.1  
**Última atualização:** Novembro 2024
