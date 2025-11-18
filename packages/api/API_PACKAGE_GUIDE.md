# 🚀 API Package - Guia Rápido

## O que foi criado

**Package:** `@prime-repo/api`

**Funcionalidades:**
✅ Cliente Axios configurado
✅ Interceptors (auth token automático + error handling)
✅ Resource builder (REST + métodos customizados)
✅ Loading states automáticos
✅ Gerenciamento de token JWT
✅ Request cancellation
✅ TypeScript completo

## Estrutura

```
packages/api/
├── src/
│   ├── client/
│   │   ├── axios.ts          # Cliente configurado
│   │   ├── interceptors.ts   # Auto-adiciona token
│   │   └── resource.ts       # Builder mágico
│   ├── services/
│   │   ├── authService.ts    # Login/logout
│   │   └── userService.ts    # Exemplo completo
│   ├── types/                # Tipos TypeScript
│   └── utils/                # Token, errors, loading
└── README.md                 # Documentação completa
```

## Uso no App

### 1. Instalar no app

```json
// apps/app1/package.json
{
  "dependencies": {
    "@prime-repo/api": "workspace:*"
  }
}
```

### 2. Configurar base URL

```typescript
// apps/app1/src/main.tsx
import { apiClient } from '@prime-repo/api';

apiClient.updateBaseURL('http://localhost:3000/api');
```

### 3. Usar services

```typescript
import { userService } from '@prime-repo/api';

// REST automático
const users = await userService.list();
const user = await userService.get('123');
await userService.create({ name: 'John', email: 'john@email.com', password: '123' });

// Métodos customizados
await userService.activate('123');
await userService.sendEmail('123', { subject: 'Hi', body: 'Hello' });
const results = await userService.search('john');
```

## Criar seu próprio service

```typescript
// apps/app1/src/services/productService.ts
import { createResource, axiosInstance } from '@prime-repo/api';

interface Product {
  id: string;
  name: string;
  price: number;
}

export const productService = createResource<Product>(
  '/products',
  {
    // ✨ Seus métodos customizados aqui!
    findByCategory: async (category: string) => {
      const res = await axiosInstance.get(`/products/category/${category}`);
      return res.data;
    },
    
    updateStock: async (id: string, quantity: number) => {
      const res = await axiosInstance.patch(`/products/${id}/stock`, { quantity });
      return res.data;
    },
    
    myCustomMethod: async () => {
      // Qualquer coisa que você precisar!
    }
  }
);

// Uso:
const products = await productService.list();           // REST
const electronics = await productService.findByCategory('electronics'); // Custom
```

## Loading States

```typescript
import { loadingStateManager } from '@prime-repo/api';

function MyComponent() {
  const [state, setState] = useState({ isLoading: false, error: null });

  useEffect(() => {
    // Subscribe ao loading
    const unsubscribe = loadingStateManager.subscribe(
      'users:list',
      (newState) => setState(newState)
    );
    
    return unsubscribe;
  }, []);

  const load = async () => {
    await userService.list(); // Loading trackado automaticamente!
  };

  if (state.isLoading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error.message}</div>;
  
  return <div>...</div>;
}
```

## Exemplo Completo

```typescript
// services/productService.ts
import { createResource, axiosInstance } from '@prime-repo/api';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const productService = createResource<Product>(
  '/products',
  {
    findByCategory: async (category: string) => {
      const response = await axiosInstance.get<Product[]>(
        `/products/category/${category}`
      );
      return response.data;
    },
    
    getOnSale: async () => {
      const response = await axiosInstance.get<Product[]>('/products/on-sale');
      return response.data;
    }
  },
  {
    loadingKey: 'products',
    trackLoading: true
  }
);

// Uso no componente
function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // Método REST padrão
      const data = await productService.list();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  };

  const loadElectronics = async () => {
    // Método customizado!
    const data = await productService.findByCategory('electronics');
    setProducts(data);
  };

  return (
    <div>
      <button onClick={loadProducts}>All Products</button>
      <button onClick={loadElectronics}>Electronics</button>
      {/* ... */}
    </div>
  );
}
```

## Build

```bash
# O Dockerfile já faz isso automaticamente
docker-compose up --build

# Ou manualmente:
pnpm --filter @prime-repo/api build
```

## Documentação Completa

Ver `packages/api/README.md` para:
- Todos os métodos disponíveis
- Configuração avançada
- Error handling
- Token management
- Request cancellation
- Exemplos completos

---

**Pronto para usar!** 🎉
