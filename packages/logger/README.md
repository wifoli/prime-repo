# @prime-repo/logger

Sistema de logging inteligente com suporte para Grafana (Loki, Tempo, Mimir/Prometheus).

## 🎯 Features

✅ **Logs** → Grafana Loki  
✅ **Traces** → Grafana Tempo  
✅ **Métricas** → Grafana Mimir / Prometheus  
✅ **Console** → Development  
✅ **ErrorBoundary** → Integração React automática  
✅ **Batching** → Logs em lote para performance  
✅ **Context** → Contexto persistente por logger  

---

## 🚀 Setup

```typescript
import { logger, ConsoleTransport, LokiTransport } from '@prime-repo/logger';

// Development
logger.addTransport(new ConsoleTransport());

// Production - Grafana Loki
logger.addTransport(new LokiTransport({
  endpoint: 'https://loki.example.com',
  labels: { app: 'my-app', env: 'production' }
}));

// Add global context
logger.addContext({
  userId: user.id,
  environment: 'production'
});
```

---

## 📝 Logging

```typescript
import { logger } from '@prime-repo/logger';

// Basic logging
logger.info('User logged in', { userId: '123' });
logger.warn('API response slow', { duration: 5000 });
logger.error('Failed to save', error, { userId: '123' });
logger.debug('Debug info', { data: {...} });

// With context
logger.info('Order created', {
  orderId: '456',
  userId: '123',
  amount: 100
});
```

---

## 🔍 Tracing (Grafana Tempo)

```typescript
import { TempoTransport } from '@prime-repo/logger';

const tempo = new TempoTransport({
  endpoint: 'https://tempo.example.com'
});

// Start span
const span = tempo.startSpan('api.getUser');

try {
  const user = await fetchUser();
  tempo.endSpan(span.spanId, { userId: user.id, success: true });
} catch (error) {
  tempo.endSpan(span.spanId, { error: true });
}
```

---

## 📊 Métricas (Prometheus/Mimir)

```typescript
import { PrometheusTransport } from '@prime-repo/logger';

const metrics = new PrometheusTransport({
  endpoint: 'https://prometheus.example.com',
  jobName: 'my-app'
});

// Counter
metrics.counter('http_requests_total', 1, {
  method: 'GET',
  status: '200'
});

// Gauge
metrics.gauge('active_users', 150);

// Histogram
metrics.histogram('request_duration_ms', 245, {
  endpoint: '/api/users'
});

// Push metrics (call periodically)
setInterval(() => metrics.push(), 10000);
```

---

## ⚛️ React Integration

### ErrorBoundary com Logging Automático

```typescript
import { ErrorBoundaryLogger } from '@prime-repo/logger/react';

<ErrorBoundaryLogger
  fallback={<ErrorPage />}
  onError={(error, info) => {
    // Custom handling (já loga automaticamente)
  }}
>
  <App />
</ErrorBoundaryLogger>
```

### Hook useLogger

```typescript
import { useLogger } from '@prime-repo/logger/react';

function MyComponent() {
  const { logError, logInfo, logger } = useLogger();

  const handleSave = async () => {
    try {
      await saveData();
      logInfo('Data saved successfully');
    } catch (error) {
      logError('Failed to save data', error, { userId: '123' });
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

---

## 🔧 Advanced

### Child Logger (contexto isolado)

```typescript
const userLogger = logger.child({ userId: '123' });

userLogger.info('User action'); // Automaticamente inclui userId
```

### Trace Context

```typescript
logger.setTraceContext('trace-123', 'span-456');
logger.info('Operation'); // Inclui traceId e spanId
logger.clearTraceContext();
```

### Custom Transport

```typescript
import { Transport, LogEntry } from '@prime-repo/logger';

class MyTransport implements Transport {
  name = 'my-transport';

  log(entry: LogEntry): void {
    // Custom logic
    sendToMyService(entry);
  }
}

logger.addTransport(new MyTransport());
```

---

## 📦 Configuração Completa

```typescript
import {
  logger,
  ConsoleTransport,
  LokiTransport,
  TempoTransport,
  PrometheusTransport
} from '@prime-repo/logger';

// Setup transports
if (process.env.NODE_ENV === 'development') {
  logger.addTransport(new ConsoleTransport({ colors: true }));
} else {
  logger.addTransport(new LokiTransport({
    endpoint: process.env.LOKI_ENDPOINT,
    labels: {
      app: 'my-app',
      env: process.env.NODE_ENV,
      version: process.env.APP_VERSION
    }
  }));
}

// Setup tracing
export const tempo = new TempoTransport({
  endpoint: process.env.TEMPO_ENDPOINT
});

// Setup metrics
export const metrics = new PrometheusTransport({
  endpoint: process.env.PROMETHEUS_ENDPOINT,
  jobName: 'my-app'
});

// Push metrics every 10s
setInterval(() => metrics.push(), 10000);

// Add global context
logger.addContext({
  app: 'my-app',
  version: process.env.APP_VERSION
});
```

---

## 🎯 Exemplo Prático

```typescript
import { logger, tempo, metrics } from './logger-setup';

async function getUser(userId: string) {
  // Start trace
  const span = tempo.startSpan('getUser', undefined, undefined);
  logger.setTraceContext(span.traceId, span.spanId);

  // Count request
  metrics.counter('user_requests_total', 1, { operation: 'get' });

  const start = Date.now();

  try {
    logger.info('Fetching user', { userId });
    
    const user = await fetchUserFromDB(userId);
    
    // Record duration
    const duration = Date.now() - start;
    metrics.histogram('user_request_duration_ms', duration);
    
    logger.info('User fetched successfully', { userId, duration });
    tempo.endSpan(span.spanId, { userId, success: true });
    
    return user;
  } catch (error) {
    logger.error('Failed to fetch user', error, { userId });
    tempo.endSpan(span.spanId, { userId, error: true });
    metrics.counter('user_errors_total', 1, { operation: 'get' });
    throw error;
  } finally {
    logger.clearTraceContext();
  }
}
```
