# 🌐 API Client Guide - @prime-repo/api

Cliente HTTP completo com Axios, gerenciamento de autenticação, loading states, resource builder e interceptors automáticos.

---

## 📦 Instalação

```json
// No seu app (apps/app1/package.json)
{
  "dependencies": {
    "@prime-repo/api": "workspace:*"
  }
}
```

```bash
pnpm install
```

---

## ⚡ Quick Start

### 1. Configurar Base URL

```typescript
// apps/app1/src/main.tsx
import { apiClient } from '@prime-repo/api';

// Configurar base URL da API
apiClient.updateBaseURL(
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
);
```

### 2. Usar Services Prontos

```typescript
import { authService, userService } from '@prime-repo/api';

// Login
const { user, tokens } = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Listar usuários
const users = await userService.list();

// Buscar usuário
const user = await userService.get('123');

// Criar usuário
const newUser = await userService.create({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret'
});
```

---

## 🏗️ Arquitetura

### Estrutura

```
packages/api/
├── src/
│   ├── client/           # Axios client e configuração
│   │   ├── axios.ts
│   │   ├── interceptors.ts
│   │   └── resource.ts
│   ├── services/         # Services prontos
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── types/            # TypeScript types
│   │   ├── api.ts
│   │   └── models.ts
│   ├── utils/            # Utilitários
│   │   ├── token.ts
│   │   ├── errors.ts
│   │   ├── loading.ts
│   │   └── cancellation.ts
│   └── index.ts
└── package.json
```

### Fluxo de Request

```
1. App faz request
   ↓
2. Request Interceptor
   - Adiciona token JWT
   - Adiciona headers customizados
   ↓
3. Request vai para API
   ↓
4. Response volta
   ↓
5. Response Interceptor
   - Trata erros
   - Handle 401 (logout automático)
   - Transforma resposta
   ↓
6. Loading state atualizado
   ↓
7. Data retorna para app
```

---

## 🔧 Cliente Axios

### axiosInstance

Instância pré-configurada do Axios.

```typescript
import { axiosInstance } from '@prime-repo/api';

// GET
const response = await axiosInstance.get('/users');

// POST
const response = await axiosInstance.post('/users', { name: 'John' });

// PUT
const response = await axiosInstance.put('/users/123', { name: 'Jane' });

// PATCH
const response = await axiosInstance.patch('/users/123', { email: 'new@email.com' });

// DELETE
await axiosInstance.delete('/users/123');
```

### apiClient

Classe para gerenciar configurações.

```typescript
import { apiClient } from '@prime-repo/api';

// Atualizar base URL
apiClient.updateBaseURL('https://api.production.com');

// Atualizar timeout
apiClient.updateTimeout(60000); // 60 segundos

// Obter instância
const axios = apiClient.getInstance();
```

### createApiClient

Criar múltiplas instâncias de API.

```typescript
import { createApiClient } from '@prime-repo/api';

// API principal
const mainApi = createApiClient({
  baseURL: 'https://api.myapp.com',
  timeout: 30000
});

// API secundária (ex: serviço externo)
const externalApi = createApiClient({
  baseURL: 'https://external-service.com',
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'value'
  }
});

// Usar
const response = await mainApi.getInstance().get('/users');
```

---

## 🔐 Autenticação

### authService

Service completo de autenticação.

#### Métodos

```typescript
// Login
const result = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
// Retorna: { user: User, tokens: { accessToken, refreshToken } }
// Armazena tokens automaticamente

// Logout
await authService.logout();
// Remove tokens do sessionStorage

// Refresh token
const result = await authService.refreshToken();
// Atualiza tokens automaticamente

// Obter usuário atual
const user = await authService.getCurrentUser();

// Verificar se está autenticado
const isAuth = authService.isAuthenticated();
```

#### Exemplo Completo

```typescript
// Login Component
import { authService } from '@prime-repo/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { user, tokens } = await authService.login({ email, password });
      console.log('Logged in:', user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

---

## 👥 User Service

Service completo de usuários com métodos REST e customizados.

### Métodos REST (Automáticos)

```typescript
import { userService } from '@prime-repo/api';

// Listar todos
const users = await userService.list();

// Listar com paginação
const result = await userService.listPaginated({
  page: 1,
  limit: 10,
  sort: 'name',
  order: 'asc'
});
// Retorna: { data: User[], pagination: { page, limit, total, totalPages } }

// Buscar por ID
const user = await userService.get('123');

// Criar
const newUser = await userService.create({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret123'
});

// Atualizar
const updated = await userService.update('123', {
  name: 'Jane Doe'
});

// Deletar
await userService.delete('123');
```

### Métodos Customizados

```typescript
// Ativar usuário
await userService.activate('123');

// Desativar usuário
await userService.deactivate('123');

// Enviar email
await userService.sendEmail('123', {
  subject: 'Welcome!',
  body: 'Welcome to our platform!'
});

// Estatísticas do usuário
const stats = await userService.getStatistics('123');
// Retorna: { totalPosts: number, totalComments: number }

// Buscar usuários
const results = await userService.search('john');

// Deletar múltiplos
await userService.bulkDelete(['1', '2', '3']);
```

---

## 🏭 Resource Builder

Crie seus próprios services com REST + métodos customizados.

### Sintaxe Básica

```typescript
import { createResource } from '@prime-repo/api';

interface Product {
  id: string;
  name: string;
  price: number;
}

export const productService = createResource<Product>('/products');
```

Isso cria automaticamente:
- `list()` - GET /products
- `listPaginated()` - GET /products com params
- `get(id)` - GET /products/:id
- `create(data)` - POST /products
- `update(id, data)` - PUT /products/:id
- `delete(id)` - DELETE /products/:id

### Com Métodos Customizados

```typescript
import { createResource, axiosInstance } from '@prime-repo/api';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export const productService = createResource<Product>(
  '/products',
  {
    // Método custom: Buscar por categoria
    findByCategory: async (category: string) => {
      const response = await axiosInstance.get<Product[]>(
        `/products/category/${category}`
      );
      return response.data;
    },

    // Método custom: Atualizar estoque
    updateStock: async (id: string, quantity: number) => {
      const response = await axiosInstance.patch<Product>(
        `/products/${id}/stock`,
        { quantity }
      );
      return response.data;
    },

    // Método custom: Produtos em promoção
    getOnSale: async () => {
      const response = await axiosInstance.get<Product[]>('/products/on-sale');
      return response.data;
    },

    // Método custom: Buscar por preço
    findByPriceRange: async (min: number, max: number) => {
      const response = await axiosInstance.get<Product[]>('/products/search', {
        params: { minPrice: min, maxPrice: max }
      });
      return response.data;
    },

    // Método custom: Upload imagem
    uploadImage: async (id: string, file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axiosInstance.post(
        `/products/${id}/image`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      return response.data;
    }
  },
  {
    loadingKey: 'products',  // Key para loading states
    trackLoading: true        // Ativar tracking automático
  }
);
```

### Uso do Service

```typescript
// REST methods
const products = await productService.list();
const product = await productService.get('123');
await productService.create({ name: 'New Product', price: 99.99 });

// Custom methods
const electronics = await productService.findByCategory('electronics');
await productService.updateStock('123', 50);
const sales = await productService.getOnSale();
const affordable = await productService.findByPriceRange(10, 100);
await productService.uploadImage('123', imageFile);
```

---

## 📊 Loading States

Sistema automático de tracking de loading states.

### loadingStateManager

```typescript
import { loadingStateManager } from '@prime-repo/api';

// Obter estado atual
const state = loadingStateManager.getState('users:list');
// Retorna: { isLoading: boolean, error: ApiError | null }

// Definir estado manualmente
loadingStateManager.setState('myKey', { isLoading: true });
loadingStateManager.setState('myKey', { isLoading: false, error: null });

// Helpers
loadingStateManager.startLoading('myKey');
loadingStateManager.stopLoading('myKey');
loadingStateManager.stopLoading('myKey', error);

// Resetar
loadingStateManager.reset('myKey');
loadingStateManager.resetAll();
```

### Subscribe (React)

```typescript
import { loadingStateManager, userService } from '@prime-repo/api';
import { useState, useEffect } from 'react';

function UsersList() {
  const [loadingState, setLoadingState] = useState({ 
    isLoading: false, 
    error: null 
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Subscribe ao loading state
    const unsubscribe = loadingStateManager.subscribe(
      'users:list',
      (state) => setLoadingState(state)
    );

    loadUsers();

    return unsubscribe; // Cleanup
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.list();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users');
    }
  };

  if (loadingState.isLoading) {
    return <div>Loading users...</div>;
  }

  if (loadingState.error) {
    return <div>Error: {loadingState.error.message}</div>;
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Custom Hook

```typescript
// hooks/useApiLoading.ts
import { useState, useEffect } from 'react';
import { loadingStateManager, LoadingState } from '@prime-repo/api';

export function useApiLoading(key: string) {
  const [state, setState] = useState<LoadingState>(
    loadingStateManager.getState(key)
  );

  useEffect(() => {
    const unsubscribe = loadingStateManager.subscribe(key, setState);
    return unsubscribe;
  }, [key]);

  return state;
}

// Uso:
function MyComponent() {
  const { isLoading, error } = useApiLoading('users:list');
  
  // ...
}
```

---

## 🎫 Token Management

### tokenManager

```typescript
import { tokenManager } from '@prime-repo/api';

// Obter token
const token = tokenManager.getToken();

// Definir token
tokenManager.setToken('your-jwt-token');

// Refresh token
const refreshToken = tokenManager.getRefreshToken();
tokenManager.setRefreshToken('your-refresh-token');

// Verificar se tem token
const hasToken = tokenManager.hasToken();

// Limpar tokens (logout)
tokenManager.clearTokens();
```

### Como Funciona

- Tokens são armazenados no `sessionStorage`
- Token é adicionado automaticamente em todas as requests (via interceptor)
- Header: `Authorization: Bearer <token>`
- Tokens são limpos automaticamente em 401

---

## ❌ Error Handling

### handleApiError

```typescript
import { handleApiError } from '@prime-repo/api';

try {
  await userService.create(userData);
} catch (error) {
  const apiError = handleApiError(error);
  console.log(apiError);
  // {
  //   message: "Validation failed",
  //   code: "VALIDATION_ERROR",
  //   status: 400,
  //   errors: { email: ["Email is required"] }
  // }
}
```

### Error Helpers

```typescript
import { 
  isUnauthorizedError,
  isForbiddenError,
  isServerError,
  getErrorMessage 
} from '@prime-repo/api';

try {
  await api.request();
} catch (error) {
  const apiError = handleApiError(error);
  
  if (isUnauthorizedError(apiError)) {
    // 401 - Redirecionar para login
    navigate('/login');
  } else if (isForbiddenError(apiError)) {
    // 403 - Sem permissão
    toast.error('You do not have permission');
  } else if (isServerError(apiError)) {
    // 500+ - Erro do servidor
    toast.error('Server error, try again later');
  } else {
    // Outro erro
    toast.error(getErrorMessage(apiError));
  }
}
```

### Interceptor Automático

O interceptor trata 401 automaticamente:

```typescript
// Response Interceptor (já configurado)
// Em caso de 401:
// 1. Limpa tokens
// 2. Emite evento 'auth:unauthorized'
// 3. Retorna erro
```

Escutar evento:

```typescript
// App.tsx
useEffect(() => {
  const handleUnauthorized = () => {
    console.log('Session expired');
    navigate('/login');
  };

  window.addEventListener('auth:unauthorized', handleUnauthorized);

  return () => {
    window.removeEventListener('auth:unauthorized', handleUnauthorized);
  };
}, []);
```

---

## 🚫 Request Cancellation

### requestCancellation

```typescript
import { requestCancellation, axiosInstance } from '@prime-repo/api';

// Criar cancel token
const cancelToken = requestCancellation.createCancelToken('user-list');

// Fazer request com cancel token
axiosInstance.get('/users', { 
  cancelToken: cancelToken.token 
});

// Cancelar request específica
requestCancellation.cancel('user-list');

// Cancelar todas as requests
requestCancellation.cancelAll();

// Remover cancel token
requestCancellation.remove('user-list');

// Verificar se erro é de cancelamento
try {
  await axiosInstance.get('/users', { cancelToken: token.token });
} catch (error) {
  if (requestCancellation.isCancelled(error)) {
    console.log('Request was cancelled');
  }
}
```

### Exemplo: Cancelar Request Anterior

```typescript
import { requestCancellation, userService } from '@prime-repo/api';

function SearchUsers() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (query.length < 3) return;

    // Cancelar search anterior
    const cancelToken = requestCancellation.createCancelToken('user-search');

    const searchUsers = async () => {
      try {
        const results = await userService.search(query);
        setUsers(results);
      } catch (error) {
        if (!requestCancellation.isCancelled(error)) {
          console.error('Search failed', error);
        }
      }
    };

    searchUsers();

    return () => {
      requestCancellation.cancel('user-search');
    };
  }, [query]);

  return (
    <div>
      <input 
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search users..."
      />
      {/* Results */}
    </div>
  );
}
```

---

## 📘 TypeScript Types

### API Types

```typescript
import { 
  ApiResponse,
  ApiError,
  PaginationParams,
  PaginatedResponse,
  LoadingState,
  ApiRequestConfig
} from '@prime-repo/api';

// ApiResponse
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// ApiError
interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// PaginationParams
interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// PaginatedResponse
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// LoadingState
interface LoadingState {
  isLoading: boolean;
  error: ApiError | null;
}
```

### Model Types

```typescript
import { 
  User,
  CreateUserDto,
  UpdateUserDto,
  AuthTokens,
  LoginCredentials,
  AuthResponse
} from '@prime-repo/api';

// Ou criar seus próprios:
interface Product {
  id: string;
  name: string;
  price: number;
}

interface CreateProductDto {
  name: string;
  price: number;
}
```

---

## 🎯 Exemplos Completos

### Criar Service Completo

```typescript
// services/orderService.ts
import { createResource, axiosInstance } from '@prime-repo/api';

interface Order {
  id: string;
  customerId: string;
  products: { productId: string; quantity: number }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

interface CreateOrderDto {
  customerId: string;
  products: { productId: string; quantity: number }[];
}

export const orderService = createResource<Order>(
  '/orders',
  {
    // Buscar pedidos de um cliente
    findByCustomer: async (customerId: string) => {
      const response = await axiosInstance.get<Order[]>(
        `/orders/customer/${customerId}`
      );
      return response.data;
    },

    // Atualizar status
    updateStatus: async (
      id: string, 
      status: Order['status']
    ) => {
      const response = await axiosInstance.patch<Order>(
        `/orders/${id}/status`,
        { status }
      );
      return response.data;
    },

    // Cancelar pedido
    cancel: async (id: string) => {
      const response = await axiosInstance.post<Order>(
        `/orders/${id}/cancel`
      );
      return response.data;
    },

    // Buscar pedidos por status
    findByStatus: async (status: Order['status']) => {
      const response = await axiosInstance.get<Order[]>(
        '/orders/search',
        { params: { status } }
      );
      return response.data;
    },

    // Estatísticas
    getStatistics: async (customerId?: string) => {
      const response = await axiosInstance.get('/orders/statistics', {
        params: { customerId }
      });
      return response.data;
    }
  },
  {
    loadingKey: 'orders',
    trackLoading: true
  }
);
```

### Component com Loading e Error

```typescript
import { orderService } from './services/orderService';
import { useApiLoading } from './hooks/useApiLoading';
import { useState, useEffect } from 'react';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const { isLoading, error } = useApiLoading('orders:list');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.list();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders');
    }
  };

  const handleCancelOrder = async (id: string) => {
    try {
      await orderService.cancel(id);
      loadOrders(); // Recarregar lista
    } catch (err) {
      console.error('Failed to cancel order');
    }
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Orders</h1>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order #{order.id}</p>
          <p>Status: {order.status}</p>
          <button onClick={() => handleCancelOrder(order.id)}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔧 Configuração Avançada

### Custom Interceptor

```typescript
import { axiosInstance } from '@prime-repo/api';

// Request interceptor customizado
axiosInstance.interceptors.request.use(
  (config) => {
    // Adicionar header customizado
    config.headers['X-Custom-Header'] = 'value';
    
    // Log
    console.log('Request:', config.method, config.url);
    
    return config;
  }
);

// Response interceptor customizado
axiosInstance.interceptors.response.use(
  (response) => {
    // Log
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    // Custom error handling
    console.error('Error:', error);
    return Promise.reject(error);
  }
);
```

### Environment Variables

```env
# .env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
```

```typescript
// main.tsx
import { apiClient } from '@prime-repo/api';

apiClient.updateBaseURL(import.meta.env.VITE_API_URL);
apiClient.updateTimeout(Number(import.meta.env.VITE_API_TIMEOUT));
```

---

## 🚀 Performance

### Dicas

1. **Use Resource Builder**: Evita repetição de código
2. **Cancel Requests**: Cancele requests anteriores em searches
3. **Loading States**: Evite re-renders desnecessários
4. **Error Boundaries**: Capture erros globalmente
5. **Retry Logic**: Implemente retry para requests que falharam

### Retry Example

```typescript
async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
}

// Uso:
const users = await retryRequest(() => userService.list(), 3);
```

---

## 💡 Dicas

1. Configure base URL no início da aplicação
2. Use o Resource Builder para criar services
3. Sempre trate erros com try-catch
4. Use loading states para feedback visual
5. Tokens são gerenciados automaticamente
6. 401 limpa tokens e emite evento
7. Cancel requests em cleanup do useEffect
8. Type seus models corretamente
9. Use os helpers de erro (isUnauthorizedError, etc)
10. Loading states são automáticos quando usar Resource Builder

---

**Versão:** 0.0.1  
**Última atualização:** Novembro 2024
