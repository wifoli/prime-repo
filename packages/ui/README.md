# @prime-repo/ui

Componentes UI baseados em PrimeReact + componentes customizados.

## 📦 Componentes

### 🎨 Typography

Sistema completo de tipografia com variantes.

```typescript
import { Typography, Heading1, Body, Caption } from '@prime-repo/ui';

// Com variant
<Typography variant="h1">Título Principal</Typography>
<Typography variant="body1" color="muted">Texto normal</Typography>
<Typography variant="caption" align="center">Legenda</Typography>

// Com prop "as"
<Typography variant="h1" as="span">Span com estilo H1</Typography>
<Typography variant="body1" as="div">Div com estilo body</Typography>

// Props disponíveis
<Typography
  variant="h1" // h1-h6, body1, body2, caption, overline
  as="span" // qualquer elemento HTML
  weight="bold" // normal, medium, semibold, bold
  color="primary" // primary, secondary, muted, error, success, warning
  align="center" // left, center, right, justify
  transform="uppercase" // none, uppercase, lowercase, capitalize
  truncate // trunca texto com ...
  gutterBottom // adiciona margin-bottom
>
  Texto
</Typography>

// Componentes de conveniência
<Heading1>Título H1</Heading1>
<Heading2>Título H2</Heading2>
<Heading3>Título H3</Heading3>
<Heading4>Título H4</Heading4>
<Body>Texto body</Body>
<Caption>Legenda</Caption>
<Overline>TEXTO OVERLINE</Overline>
```

---

### 📦 Stack & Container

Layouts com espaçamento automático.

```typescript
import { Stack, HStack, VStack, Container } from '@prime-repo/ui';

// Stack vertical
<VStack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</VStack>

// Stack horizontal
<HStack spacing={2} align="center" justify="between">
  <span>Left</span>
  <span>Right</span>
</HStack>

// Stack customizado
<Stack
  direction="row" // row ou column
  spacing={6} // 0-12
  align="center" // start, center, end, stretch, baseline
  justify="between" // start, center, end, between, around, evenly
  wrap // flex-wrap
>
  {items}
</Stack>

// Container com max-width
<Container maxWidth="lg" padding centered>
  <Content />
</Container>
```

---

### 🔖 Badge

Badges para status e indicadores.

```typescript
import { Badge } from '@prime-repo/ui';

<Badge variant="success">Ativo</Badge>
<Badge variant="danger" size="sm">Erro</Badge>
<Badge variant="warning" rounded>Pendente</Badge>

// Badge com ponto (dot)
<Badge variant="success" dot>
  Online
</Badge>
```

---

### 👤 Avatar

Avatares de usuário com fallback de iniciais.

```typescript
import { Avatar } from '@prime-repo/ui';

// Com imagem
<Avatar src="/user.jpg" alt="User" size="md" />

// Com iniciais (fallback)
<Avatar name="John Doe" size="lg" />

// Variantes
<Avatar name="JD" variant="circle" /> // padrão
<Avatar name="JD" variant="rounded" />
<Avatar name="JD" variant="square" />

// Tamanhos
<Avatar name="JD" size="xs" /> // xs, sm, md, lg, xl
```

---

### 💀 Skeleton

Placeholders de loading.

```typescript
import { Skeleton, SkeletonText } from '@prime-repo/ui';

// Skeleton simples
<Skeleton variant="text" width="100%" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" height={100} />

// Múltiplas linhas
<SkeletonText lines={3} />

// Sem animação
<Skeleton animation="none" />
```

---

### 📭 EmptyState

Estado vazio para listas/tabelas.

```typescript
import { EmptyState } from '@prime-repo/ui';

<EmptyState
  icon="pi pi-inbox"
  title="Nenhum item encontrado"
  description="Não há itens para exibir no momento."
  action={{
    label: 'Criar Novo',
    icon: 'pi pi-plus',
    onClick: handleCreate
  }}
/>
```

---

### ⚠️ Alert

Alertas para mensagens importantes.

```typescript
import { Alert } from '@prime-repo/ui';

<Alert severity="info">
  Esta é uma mensagem informativa.
</Alert>

<Alert
  severity="error"
  variant="filled" // filled, outlined, soft
  title="Erro"
  onClose={handleClose}
>
  Ocorreu um erro ao salvar.
</Alert>

// Sem ícone
<Alert severity="warning" icon={false}>
  Aviso sem ícone
</Alert>

// Ícone customizado
<Alert severity="info" icon="pi pi-star">
  Ícone customizado
</Alert>
```

---

### ➗ Divider

Divisores visuais.

```typescript
import { Divider } from '@prime-repo/ui';

// Horizontal (padrão)
<Divider spacing="md" />

// Vertical
<HStack>
  <div>Left</div>
  <Divider orientation="vertical" />
  <div>Right</div>
</HStack>

// Variantes
<Divider variant="dashed" />
<Divider variant="dotted" />
```

---

### 🎯 Componentes PrimeReact Extendidos

```typescript
import { Button, Card, Input } from '@prime-repo/ui';

// Button com variantes
<Button variant="primary" size="medium" label="Salvar" />

// Card com elevação
<Card title="Título" elevated />

// Input com estado de erro
<Input
  fullWidth
  error={hasError}
  helperText="Mensagem de erro"
/>
```

---

## 🚀 Uso

```bash
pnpm --filter @prime-repo/ui build
```

```typescript
// Importar componentes
import {
  Typography,
  Heading1,
  Body,
  VStack,
  HStack,
  Container,
  Badge,
  Avatar,
  Skeleton,
  EmptyState,
  Alert,
  Divider,
  Button,
  Card,
  Input
} from '@prime-repo/ui';
```

---

## 💡 Exemplo Completo

```typescript
import {
  Container,
  VStack,
  Heading1,
  Body,
  HStack,
  Badge,
  Avatar,
  Divider,
  Button,
  EmptyState,
  Alert,
} from '@prime-repo/ui';

function UserProfile() {
  return (
    <Container maxWidth="lg">
      <VStack spacing={6}>
        {/* Header */}
        <HStack spacing={4} align="center">
          <Avatar src="/user.jpg" name="John Doe" size="xl" />
          <VStack spacing={1} align="start">
            <Heading1>John Doe</Heading1>
            <Body color="muted">john@example.com</Body>
          </VStack>
          <Badge variant="success">Ativo</Badge>
        </HStack>

        <Divider />

        {/* Alert */}
        <Alert severity="info" title="Bem-vindo!">
          Complete seu perfil para aproveitar todos os recursos.
        </Alert>

        {/* Empty State */}
        <EmptyState
          title="Nenhuma atividade recente"
          description="Você ainda não tem atividades registradas."
          action={{
            label: 'Começar',
            icon: 'pi pi-plus',
            onClick: () => {}
          }}
        />

        {/* Actions */}
        <HStack justify="end">
          <Button label="Cancelar" variant="secondary" />
          <Button label="Salvar" variant="primary" />
        </HStack>
      </VStack>
    </Container>
  );
}
```
