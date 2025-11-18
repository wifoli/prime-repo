# @prime-repo/api

Pacote de API client com Axios, gerenciamento de estado de loading, interceptors e resource builder.

## Features

✅ Cliente Axios configurado com interceptors
✅ Gerenciamento automático de tokens JWT
✅ Loading states para cada requisição
✅ Resource builder com métodos REST + custom
✅ Tratamento de erros global
✅ Request cancellation
✅ TypeScript com tipos completos

## Instalação

```bash
# Já está no monorepo como workspace
pnpm install
```

## Uso Básico

### 1. Configurar API Base URL

```typescript
// No seu app (ex: apps/app1/src/main.tsx)
import { apiClient } from '@prime-repo/api';

// Configurar base URL
apiClient.updateBaseURL(import.meta.env.VITE_API_URL || 'http://localhost:3000/api');
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

// Buscar usuário por ID
const user = await userService.get('123');

// Criar usuário
const newUser = await userService.create({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret'
});

// Atualizar usuário
const updated = await userService.update('123', {
  name: 'Jane Doe'
});

// Deletar usuário
await userService.delete('123');
```

### 3. Métodos Customizados

```typescript
import { userService } from '@prime-repo/api';

// Ativar usuário (método custom)
await userService.activate('123');

// Enviar email (método custom)
await userService.sendEmail('123', {
  subject: 'Welcome!',
  body: 'Welcome to our platform!'
});

// Buscar usuários (método custom)
const results = await userService.search('john');

// Estatísticas (método custom)
const stats = await userService.getStatistics('123');
```

## Criar Seu Próprio Resource

### Opção 1: Apenas REST (simples)

```typescript
import { createResource } from '@prime-repo/api';

interface Product {
  id: string;
  name: string;
  price: number;
}

export const productService = createResource<Product>('/products');

// Uso:
const products = await productService.list();
const product = await productService.get('123');
await productService.create({ name: 'Product', price: 99.99 });
```

### Opção 2: REST + Métodos Customizados

```typescript
import { createResource, axiosInstance } from '@prime-repo/api';

interface Product {
  id: string;
  name: string;
  price: number;
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

    // Qualquer método que você precisar!
    myCustomMethod: async (param: string) => {
      // Sua lógica aqui
    }
  },
  {
    loadingKey: 'products', // Para tracking de loading
    trackLoading: true       // Ativar loading automático
  }
);

// Uso:
const electronics = await productService.findByCategory('electronics');
await productService.updateStock('123', 50);
const sales = await productService.getOnSale();
```

## Loading States

```typescript
import { loadingStateManager } from '@prime-repo/api';

// Em um componente React
function UsersList() {
  const [loadingState, setLoadingState] = useState({ isLoading: false, error: null });

  useEffect(() => {
    // Subscribe ao loading state do userService
    const unsubscribe = loadingStateManager.subscribe(
      'users:list',
      (state) => setLoadingState(state)
    );

    return unsubscribe;
  }, []);

  const loadUsers = async () => {
    await userService.list(); // Loading é trackado automaticamente
  };

  if (loadingState.isLoading) return <div>Loading...</div>;
  if (loadingState.error) return <div>Error: {loadingState.error.message}</div>;

  return <div>...</div>;
}
```

## Gerenciamento de Token

```typescript
import { tokenManager } from '@prime-repo/api';

// Verificar se tem token
const hasToken = tokenManager.hasToken();

// Obter token
const token = tokenManager.getToken();

// Definir token (feito automaticamente no login)
tokenManager.setToken('your-jwt-token');

// Limpar tokens (feito automaticamente no logout)
tokenManager.clearTokens();
```

## Request Cancellation

```typescript
import { requestCancellation } from '@prime-repo/api';

// Criar cancel token
const cancelToken = requestCancellation.createCancelToken('user-list');

// Fazer request com cancel token
axiosInstance.get('/users', { cancelToken: cancelToken.token });

// Cancelar request
requestCancellation.cancel('user-list');

// Cancelar todas as requests
requestCancellation.cancelAll();
```

## Error Handling

```typescript
import { handleApiError, getErrorMessage } from '@prime-repo/api';

try {
  await userService.create(userData);
} catch (error) {
  const apiError = handleApiError(error);
  console.error('Error:', getErrorMessage(apiError));
  
  // Verificar tipo de erro
  if (apiError.status === 401) {
    // Redirecionar para login
  } else if (apiError.status >= 500) {
    // Erro do servidor
  }
}
```

## Eventos Customizados

O package emite eventos que você pode escutar:

```typescript
// Escutar logout automático por 401
window.addEventListener('auth:unauthorized', () => {
  // Redirecionar para login
  window.location.href = '/login';
});
```

## Configuração Avançada

### Criar múltiplas instâncias de API

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
```

## Estrutura do Package

```
packages/api/
├── src/
│   ├── client/
│   │   ├── axios.ts          # Cliente axios
│   │   ├── interceptors.ts   # Request/Response interceptors
│   │   └── resource.ts       # Resource builder
│   ├── services/
│   │   ├── authService.ts    # Serviço de autenticação
│   │   └── userService.ts    # Exemplo de serviço
│   ├── types/
│   │   ├── api.ts            # Tipos da API
│   │   └── models.ts         # Modelos de dados
│   ├── utils/
│   │   ├── token.ts          # Gerenciamento de token
│   │   ├── errors.ts         # Tratamento de erros
│   │   ├── loading.ts        # Loading states
│   │   └── cancellation.ts   # Cancelamento de requests
│   └── index.ts
└── package.json
```

## Desenvolvimento

```bash
# Build
pnpm build

# Watch mode
pnpm dev

# Clean
pnpm clean
```

## Exemplos Completos

Ver `src/services/userService.ts` para exemplo completo de resource com métodos customizados.