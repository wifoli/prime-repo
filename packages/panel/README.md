# @prime-repo/panel

Template/Painel base para aplicações com layout completo incluindo Header, Sidebar, Footer e navegação.

## Características

- ✅ Layout responsivo com sidebar colapsável
- ✅ Sistema de navegação integrado com React Router
- ✅ Header customizável com logo e menu de usuário
- ✅ Sidebar com menu de navegação
- ✅ Footer opcional
- ✅ Context API para gerenciar estado do painel
- ✅ Totalmente tipado com TypeScript

## Uso Básico

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PanelProvider, Layout } from '@prime-repo/panel';
import '@prime-repo/panel/styles';

const panelConfig = {
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

function App() {
  return (
    <BrowserRouter>
      <PanelProvider config={panelConfig}>
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
```

## API

### PanelProvider Props

- `config`: Configuração do painel (obrigatório)
- `defaultSidebarCollapsed`: Estado inicial da sidebar (opcional, padrão: false)

### PanelConfig

```typescript
interface PanelConfig {
  appName: string;              // Nome da aplicação
  appLogo?: string;             // URL do logo
  menuItems: MenuItem[];        // Itens do menu principal
  userMenu?: MenuItem[];        // Itens do menu de usuário
  showFooter?: boolean;         // Mostrar footer
  footerText?: string;          // Texto customizado do footer
}
```

### MenuItem

```typescript
interface MenuItem {
  label: string;                // Label do item
  icon?: string;                // Ícone PrimeIcons
  path?: string;                // Caminho de navegação
  command?: () => void;         // Função ao clicar
  items?: MenuItem[];           // Sub-items (futuro)
}
```

### Hook: usePanelContext

```tsx
import { usePanelContext } from '@prime-repo/panel';

function MyComponent() {
  const { 
    sidebarCollapsed, 
    toggleSidebar,
    setSidebarCollapsed,
    config 
  } = usePanelContext();

  return (
    <button onClick={toggleSidebar}>
      Toggle Sidebar
    </button>
  );
}
```

## Componentes

### Layout
Componente principal que organiza Header, Sidebar, Content e Footer.

### Header
Barra superior com logo, nome da app e menu de usuário.

### Sidebar
Menu lateral de navegação com itens configuráveis.

### Footer
Rodapé opcional com texto customizável.

## Desenvolvimento

```bash
# Build
pnpm build

# Watch mode
pnpm dev

# Lint
pnpm lint
```