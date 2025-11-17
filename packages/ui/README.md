# @prime-repo/ui

Biblioteca de componentes UI baseada em PrimeReact com Tailwind CSS v4.

## Componentes Disponíveis

### Button
Botão customizado com variantes e tamanhos.

```tsx
import { Button } from '@prime-repo/ui';

<Button 
  variant="primary" 
  size="medium"
  label="Click me"
  onClick={() => console.log('clicked')}
/>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
- `size`: 'small' | 'medium' | 'large'
- Todas as props do PrimeReact Button

### Card
Card com elevação e bordas customizáveis.

```tsx
import { Card } from '@prime-repo/ui';

<Card 
  title="Card Title"
  elevated={true}
  bordered={false}
>
  Card content here
</Card>
```

**Props:**
- `elevated`: boolean - Adiciona sombra
- `bordered`: boolean - Adiciona borda
- Todas as props do PrimeReact Card

### Input
Input de texto com suporte a erro e helper text.

```tsx
import { Input } from '@prime-repo/ui';

<Input 
  fullWidth={true}
  error={false}
  helperText="Helper text"
  placeholder="Enter text"
/>
```

**Props:**
- `fullWidth`: boolean - Ocupa toda largura
- `error`: boolean - Estado de erro
- `helperText`: string - Texto auxiliar
- Todas as props do PrimeReact InputText

## Estilos

Para usar os estilos globais, importe no seu app:

```tsx
import '@prime-repo/ui/styles';
```

## Desenvolvimento

```bash
# Build
pnpm build

# Watch mode
pnpm dev

# Lint
pnpm lint
```