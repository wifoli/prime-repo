# 🎨 UI Components Guide - @prime-repo/ui

Biblioteca de componentes UI baseada em PrimeReact com Tailwind CSS v3.

---

## 📦 Instalação

```json
// No seu app (apps/app1/package.json ou apps/app2/package.json)
{
  "dependencies": {
    "@prime-repo/ui": "workspace:*"
  }
}
```

```bash
# Instalar dependências
pnpm install
```

---

## 🎯 Importação

### Componentes

```typescript
import { Button, Card, Input } from '@prime-repo/ui';
```

### Estilos Globais

```typescript
// No seu main.tsx ou App.tsx
import '@prime-repo/ui/styles.css';
```

Este import inclui:
- PrimeReact Theme (Lara Light Blue)
- PrimeReact Core CSS
- PrimeIcons
- Tailwind CSS (base, components, utilities)
- Custom CSS variables

---

## 🧩 Componentes Disponíveis

### Button

Botão customizado com variantes de cores e tamanhos.

#### Props

```typescript
interface ButtonProps extends Omit<PrimeButtonProps, 'size'> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  // + todas as props do PrimeReact Button
}
```

#### Variantes

- `primary` - Azul (bg-blue-500)
- `secondary` - Cinza (bg-gray-500)
- `success` - Verde (bg-green-500)
- `danger` - Vermelho (bg-red-500)
- `warning` - Amarelo (bg-yellow-500)
- `info` - Ciano (bg-cyan-500)

#### Tamanhos

- `small` - text-sm, px-3, py-1.5
- `medium` - text-base, px-4, py-2 (padrão)
- `large` - text-lg, px-5, py-3

#### Exemplos

```typescript
// Botão básico
<Button 
  label="Click me"
  variant="primary"
  onClick={() => console.log('clicked')}
/>

// Botão com ícone
<Button 
  label="Save"
  icon="pi pi-save"
  variant="success"
  size="small"
/>

// Botão apenas com ícone
<Button 
  icon="pi pi-trash"
  variant="danger"
  onClick={handleDelete}
/>

// Botão com ícone à direita
<Button 
  label="Next"
  icon="pi pi-arrow-right"
  iconPos="right"
  variant="primary"
/>

// Botão desabilitado
<Button 
  label="Submit"
  disabled
  variant="primary"
/>

// Botão loading
<Button 
  label="Loading"
  loading
  variant="primary"
/>

// Botão text (sem background)
<Button 
  label="Cancel"
  text
  variant="secondary"
/>

// Botão outlined
<Button 
  label="Outlined"
  outlined
  variant="primary"
/>

// Botão rounded
<Button 
  icon="pi pi-plus"
  rounded
  variant="success"
/>

// Botão full width
<Button 
  label="Full Width"
  className="w-full"
  variant="primary"
/>
```

#### Classes Aplicadas

O componente automaticamente aplica:
- `transition-colors duration-200` - Transição suave
- `font-medium` - Peso da fonte
- `rounded-md` - Bordas arredondadas
- Cores específicas da variante
- Padding e tamanho da fonte baseado no size

---

### Card

Card com elevação e bordas customizáveis.

#### Props

```typescript
interface CardProps extends PrimeCardProps {
  elevated?: boolean;  // Adiciona sombra (padrão: true)
  bordered?: boolean;  // Adiciona borda (padrão: false)
  // + todas as props do PrimeReact Card
}
```

#### Exemplos

```typescript
// Card básico com elevação
<Card title="Card Title">
  Card content here
</Card>

// Card com subtitle
<Card 
  title="Dashboard"
  subTitle="Your overview"
  elevated
>
  Dashboard content
</Card>

// Card sem elevação, com borda
<Card 
  title="Info"
  elevated={false}
  bordered
>
  Information content
</Card>

// Card com header customizado
<Card
  header={
    <img 
      alt="Card" 
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  }
  title="Card Title"
>
  Card content
</Card>

// Card com footer
<Card
  title="Card"
  footer={
    <div className="flex gap-2">
      <Button label="Save" icon="pi pi-check" />
      <Button label="Cancel" icon="pi pi-times" />
    </div>
  }
>
  Card content
</Card>

// Card com padding customizado
<Card 
  title="Custom Padding"
  className="!p-6"
>
  Content with custom padding
</Card>

// Card em grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <Card title="Card 1" elevated>Content 1</Card>
  <Card title="Card 2" elevated>Content 2</Card>
  <Card title="Card 3" elevated>Content 3</Card>
</div>
```

#### Classes Aplicadas

O componente automaticamente aplica:
- `bg-white` - Background branco
- `rounded-lg` - Bordas arredondadas
- `transition-shadow duration-200` - Transição suave
- `card-shadow hover:shadow-lg` (se elevated=true) - Sombra e hover
- `border border-gray-200` (se bordered=true) - Borda cinza

---

### Input

Input de texto com suporte a erro e helper text.

#### Props

```typescript
interface CustomInputProps extends InputTextProps {
  fullWidth?: boolean;    // Ocupa toda largura (padrão: false)
  error?: boolean;        // Estado de erro (padrão: false)
  helperText?: string;    // Texto auxiliar/erro
  // + todas as props do PrimeReact InputText
}
```

#### Exemplos

```typescript
// Input básico
<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter text"
/>

// Input full width
<Input 
  fullWidth
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter your name"
/>

// Input com label
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email
  </label>
  <Input 
    fullWidth
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="email@example.com"
  />
</div>

// Input com erro
<Input 
  fullWidth
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValidEmail}
  helperText={!isValidEmail ? 'Please enter a valid email' : ''}
/>

// Input com helper text
<Input 
  fullWidth
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  type="password"
  helperText="Must be at least 8 characters"
/>

// Input desabilitado
<Input 
  fullWidth
  value={value}
  disabled
  placeholder="Disabled input"
/>

// Input com ícone (usando PrimeReact IconField)
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

<IconField iconPosition="left">
  <InputIcon className="pi pi-search" />
  <Input 
    fullWidth
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search"
  />
</IconField>

// Form completo
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Name
      </label>
      <Input 
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
        helperText={nameError ? 'Name is required' : ''}
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email
      </label>
      <Input 
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        helperText={emailError ? 'Invalid email' : ''}
      />
    </div>
    
    <Button 
      label="Submit"
      type="submit"
      variant="primary"
      disabled={nameError || emailError}
    />
  </div>
</form>
```

#### Classes Aplicadas

O componente automaticamente aplica:
- `px-3 py-2` - Padding
- `border rounded-md` - Borda e arredondamento
- `transition-colors duration-200` - Transição suave
- `focus:outline-none focus:ring-2 focus:ring-blue-500` - Focus style
- `border-red-500 focus:ring-red-500` (se error=true) - Estilo de erro
- `border-gray-300 hover:border-gray-400` (se error=false) - Estilo normal
- `w-full` (se fullWidth=true) - Largura total

Helper text:
- `text-sm` - Tamanho pequeno
- `text-red-500` (se error=true) - Cor vermelha
- `text-gray-600` (se error=false) - Cor cinza

---

## 🎨 CSS Variables Customizadas

```css
:root {
  --primary-color: #3B82F6;
  --primary-color-text: #ffffff;
  --surface-ground: #f8f9fa;
  --surface-card: #ffffff;
}
```

Você pode sobrescrever essas variáveis no seu app:

```css
/* No seu styles.css */
:root {
  --primary-color: #10B981; /* Green */
  --primary-color-text: #ffffff;
}
```

---

## 🛠️ Custom Utilities

### card-shadow

Aplicada automaticamente nos Cards com `elevated={true}`:

```css
.card-shadow {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}
```

Uso manual:

```typescript
<div className="card-shadow">
  Custom shadowed element
</div>
```

---

## 🎯 Usando com PrimeReact

Todos os componentes estendem os componentes do PrimeReact, então você pode usar todas as props nativas:

```typescript
// Button aceita todas as props do PrimeReact Button
<Button 
  label="Save"
  loading={isLoading}
  loadingIcon="pi pi-spin pi-spinner"
  tooltip="Click to save"
  tooltipOptions={{ position: 'bottom' }}
  badge="3"
  badgeClassName="bg-red-500"
/>

// Card aceita todas as props do PrimeReact Card
<Card
  title="Title"
  subTitle="Subtitle"
  style={{ width: '25rem' }}
  className="!p-6"
>
  Content
</Card>

// Input aceita todas as props do PrimeReact InputText
<Input
  type="email"
  placeholder="Email"
  autoComplete="email"
  autoFocus
  maxLength={50}
  keyfilter="email"
/>
```

---

## 📱 Responsividade

Os componentes funcionam perfeitamente com classes responsive do Tailwind:

```typescript
// Button responsivo
<Button 
  label="Click me"
  className="w-full md:w-auto"
  size="small"
/>

// Grid responsivo de Cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card title="Card 1">Content</Card>
  <Card title="Card 2">Content</Card>
  <Card title="Card 3">Content</Card>
</div>

// Input responsivo em form
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input fullWidth placeholder="First Name" />
  <Input fullWidth placeholder="Last Name" />
</div>
```

---

## 🎨 Temas e Customização

### Mudando o tema do PrimeReact

Edite o arquivo `packages/ui/src/styles/globals.css`:

```css
/* Trocar de Lara Light para Lara Dark */
@import "primereact/resources/themes/lara-dark-blue/theme.css";

/* Ou outro tema */
@import "primereact/resources/themes/md-light-indigo/theme.css";
```

### Customizando componentes

Você pode estender os componentes no seu app:

```typescript
// apps/app1/src/components/CustomButton.tsx
import { Button, ButtonProps } from '@prime-repo/ui';

interface CustomButtonProps extends ButtonProps {
  gradient?: boolean;
}

export const CustomButton = ({ gradient, className, ...props }: CustomButtonProps) => {
  return (
    <Button
      {...props}
      className={`
        ${gradient ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
        ${className}
      `}
    />
  );
};
```

---

## 🏗️ Estrutura Interna

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button.tsx      # Componente Button
│   │   ├── Card.tsx        # Componente Card
│   │   ├── Input.tsx       # Componente Input
│   │   └── index.ts        # Exports de componentes
│   ├── styles/
│   │   └── globals.css     # Estilos globais
│   └── index.ts            # Entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🔧 Desenvolvimento

### Build

```bash
# No package ui
cd packages/ui
pnpm build

# Ou da raiz com turbo
pnpm --filter @prime-repo/ui build
```

### Watch Mode

```bash
cd packages/ui
pnpm dev
```

### Lint

```bash
cd packages/ui
pnpm lint
```

### Clean

```bash
cd packages/ui
pnpm clean
```

---

## 📦 Exports

O package exporta de forma modular:

```typescript
// Componentes (todos de uma vez)
import { Button, Card, Input } from '@prime-repo/ui';

// Estilos
import '@prime-repo/ui/styles.css';
```

Configuração no `package.json`:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./src/styles/globals.css"
  }
}
```

---

## 🎯 Exemplos Completos

### Dashboard Card

```typescript
<Card
  title="Total Users"
  subTitle="Active users in the system"
  elevated
  className="!p-6"
>
  <div className="text-4xl font-bold text-blue-600 my-4">1,234</div>
  <Button
    label="View Details"
    icon="pi pi-arrow-right"
    variant="primary"
    size="small"
    iconPos="right"
  />
</Card>
```

### Form com Validação

```typescript
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState(false);

const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setEmail(value);
  setEmailError(value.length > 0 && !value.includes('@'));
};

return (
  <Card title="Login" elevated className="!p-6">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <Input
          fullWidth
          value={email}
          onChange={handleEmailChange}
          placeholder="email@example.com"
          error={emailError}
          helperText={emailError ? 'Please enter a valid email' : ''}
        />
      </div>
      
      <Button
        label="Login"
        variant="primary"
        disabled={emailError || !email}
        className="w-full"
      />
    </div>
  </Card>
);
```

### Grid de Actions

```typescript
<Card title="Quick Actions" elevated className="!p-6">
  <div className="flex flex-wrap gap-3">
    <Button label="New User" icon="pi pi-user-plus" variant="primary" />
    <Button label="Generate Report" icon="pi pi-file" variant="secondary" />
    <Button label="Settings" icon="pi pi-cog" variant="info" />
    <Button label="Help" icon="pi pi-question-circle" variant="secondary" />
  </div>
</Card>
```

---

## 🚀 Performance

Os componentes são otimizados para:
- Tree-shaking (apenas o que você usa é incluído)
- TypeScript types completos
- Minimal re-renders
- CSS-in-JS evitado (usa Tailwind)

---

## 📚 Recursos Adicionais

- [PrimeReact Documentation](https://primereact.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [PrimeIcons](https://primereact.org/icons/)

---

## 💡 Dicas

1. **Sempre importe os estilos**: `import '@prime-repo/ui/styles.css'`
2. **Use fullWidth quando necessário**: Cards e Inputs funcionam melhor com fullWidth em forms
3. **Combine com Tailwind**: Os componentes trabalham perfeitamente com classes Tailwind
4. **TypeScript**: Todos os componentes são totalmente tipados
5. **Extend quando necessário**: Crie wrappers customizados estendendo os componentes base

---

**Versão:** 0.0.1  
**Última atualização:** Novembro 2024
