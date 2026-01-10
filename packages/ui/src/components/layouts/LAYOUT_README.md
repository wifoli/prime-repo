# 🎨 Layout & Form Composition - Resumo

## ✅ O que foi criado

### 📋 Form Layout Components

1. **FormRow + FormCol** - Sistema de grid 12 colunas
   - Grid baseado em 12 colunas (como Bootstrap)
   - Responsivo com breakpoints (sm, md, lg, xl)
   - Suporta offset (pular colunas)
   - Gap configurável

2. **FormField** - Wrapper inteligente para inputs
   - **Integração automática com useForm**
   - Adiciona label com indicador obrigatório (*)
   - Mostra descrição quando válido
   - Mostra erro quando touched + inválido
   - Aplica estado de erro visual no input
   - Props: name, label, description, required, form

3. **FormSection** - Seções de formulário
   - Título e descrição
   - Divider opcional
   - Agrupa campos relacionados

4. **FormActions** - Container para botões
   - Alinhamento (left, center, right, between)
   - Sticky opcional
   - Borda superior automática

5. **FormGroup** - Agrupa múltiplos campos
   - Label e description para grupo
   - Fieldset semântico

### 📐 Grid System

1. **Grid** - Sistema de grid completo
   - 1-12 colunas
   - Responsivo (cols, colsSm, colsMd, colsLg, colsXl)
   - Gap (geral, X, Y)
   - Auto rows (auto, min, max, fr)
   - Flow (row, col, dense)

2. **GridItem** - Item de grid
   - colSpan (1-12 ou 'full')
   - rowSpan (1-6 ou 'full')
   - colStart/colEnd (posicionamento)
   - rowStart/rowEnd (posicionamento)
   - Responsivo

### 💪 Flex System

1. **Flex** - Flexbox avançado
   - Direction (row, col, reverse)
   - Wrap (true, false, 'reverse')
   - Gap (0-16)
   - Align (start, center, end, stretch, baseline)
   - Justify (start, center, end, between, around, evenly)
   - Grow/Shrink
   - Inline

2. **FlexItem** - Item flex
   - Grow (boolean ou número)
   - Shrink (boolean ou número)
   - Basis (auto, full, frações)
   - Order

### 🛠️ Helper Components

1. **Section** - Seção de conteúdo
   - Título e descrição
   - Actions (botões no canto)
   - Divider opcional
   - Spacing (none, sm, md, lg)

2. **Spacer** - Espaçamento
   - Fixo (size: 0-24)
   - Flexível (cresce para preencher)
   - Eixo (horizontal, vertical, both)

3. **Center** - Centralização
   - Eixo (horizontal, vertical, both)
   - Inline ou block

4. **AspectRatio** - Proporção fixa
   - Ratios pré-definidos (1/1, 16/9, 4/3, 3/2, 21/9)
   - Custom ratio (número)

---

## 📂 Arquivos Criados

```
packages/ui/src/components/layout/
├── FormLayout.tsx       # FormRow, FormCol, FormLayout
├── FormField.tsx        # FormField, FormSection, FormActions, FormGroup
├── Grid.tsx            # Grid, GridItem
├── Helpers.tsx         # Flex, FlexItem, Section, Spacer, Center, AspectRatio
└── index.ts            # Exports
```

**Documentação:**
- `/home/claude/packages/ui/LAYOUT_GUIDE.md` - Guia completo com exemplos

**Exemplo:**
- `/home/claude/apps/app1/src/pages/FormExample/` - Formulário completo de cadastro

---

## 🎯 Como Usar

### Instalação

```typescript
import {
  // Form Layout
  FormRow,
  FormCol,
  FormField,
  FormSection,
  FormActions,
  
  // Grid
  Grid,
  GridItem,
  
  // Flex
  Flex,
  FlexItem,
  
  // Helpers
  Section,
  Spacer,
  Center,
  AspectRatio
} from '@prime-repo/ui';
```

### Exemplo Rápido - Formulário

```typescript
import { useForm } from '@prime-repo/shared/hooks';
import { required, email } from '@prime-repo/utils/validations';
import { FormRow, FormCol, FormField, InputText, Button } from '@prime-repo/ui';

function MyForm() {
  const form = useForm({
    name: { initialValue: '', validators: [required] },
    email: { initialValue: '', validators: [required, email] }
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormRow gap={4}>
        {/* Nome - linha inteira */}
        <FormCol span={12}>
          <FormField name="name" label="Nome" required form={form}>
            <InputText fullWidth />
          </FormField>
        </FormCol>

        {/* Email - 50% */}
        <FormCol span={12} spanMd={6}>
          <FormField name="email" label="Email" required form={form}>
            <InputText fullWidth />
          </FormField>
        </FormCol>
      </FormRow>

      <FormActions>
        <Button label="Enviar" variant="primary" type="submit" />
      </FormActions>
    </form>
  );
}
```

### Exemplo Rápido - Grid Layout

```typescript
<Grid cols={3} gap={6}>
  <GridItem colSpan={2}>
    <Card>Main content - 2/3</Card>
  </GridItem>
  
  <GridItem colSpan={1}>
    <Card>Sidebar - 1/3</Card>
  </GridItem>
</Grid>
```

---

## 🌟 Features Principais

### 1. **FormField + useForm = Mágica** ✨

FormField se conecta automaticamente ao useForm:
- ✅ Conecta value, onChange, onBlur
- ✅ Mostra erro quando touched
- ✅ Aplica estado visual de erro
- ✅ Troca description por erro

### 2. **Grid 12 Colunas Responsivo** 📱

```typescript
<FormCol span={12} spanMd={6} spanLg={4}>
  {/* Mobile: 100%, Tablet: 50%, Desktop: 33% */}
</FormCol>
```

### 3. **Composição Poderosa** 🔧

Todos os componentes podem ser combinados:
```typescript
<Section title="Dados">
  <FormRow>
    <FormCol span={6}>
      <FormField form={form}>
        <InputText />
      </FormField>
    </FormCol>
  </FormRow>
</Section>
```

### 4. **TypeScript Completo** 💎

Todos os componentes têm tipos completos e autocomplete.

---

## 📊 Comparação

### Stack vs Flex
- **Stack**: Simples, direção + spacing + align
- **Flex**: Completo, wrap, grow, shrink, basis, order

### FormRow vs Grid
- **FormRow**: Para formulários, grid 12 colunas fixo
- **Grid**: Para layouts, colunas customizáveis (1-12)

### FormCol vs GridItem
- **FormCol**: Span 1-12 + offset + responsivo
- **GridItem**: Span + row/col start/end + mais controle

---

## 💡 Patterns

### Dashboard
```typescript
<Grid cols={12}>
  <GridItem colSpan={12}><Header /></GridItem>
  <GridItem colSpan={4}><Card>Métrica 1</Card></GridItem>
  <GridItem colSpan={4}><Card>Métrica 2</Card></GridItem>
  <GridItem colSpan={4}><Card>Métrica 3</Card></GridItem>
  <GridItem colSpan={8}><Card>Main</Card></GridItem>
  <GridItem colSpan={4}><Card>Sidebar</Card></GridItem>
</Grid>
```

### Formulário Multi-Step
```typescript
<FormSection title="Passo 1/3">
  <FormRow><FormCol>...</FormCol></FormRow>
</FormSection>

<FormActions align="between">
  <Button label="Voltar" />
  <Button label="Próximo" />
</FormActions>
```

### Centralizar Conteúdo
```typescript
<Center axis="both" className="h-screen">
  <Card>Login Form</Card>
</Center>
```

---

## 🚀 Build

```bash
# Build do package UI
pnpm --filter @prime-repo/ui build

# Ver exemplo rodando
docker-compose up
# http://localhost:5001
```

---

## 📚 Documentação Completa

Ver `LAYOUT_GUIDE.md` para:
- Props completas de cada componente
- Exemplos avançados
- Patterns comuns
- Integração com useForm
- Troubleshooting

---

**Sistema completo de composição de formulários e layouts criado! 🎉**
