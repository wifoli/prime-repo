# 📐 Layout & Form Composition Guide

Sistema completo de composição de layouts e formulários com grid 12 colunas, integração com useForm e componentes auxiliares.

---

## 📦 Componentes Disponíveis

### Form Layout (Grid 12 Colunas)
- **FormLayout** - Container com grid automático
- **FormRow** - Linha com grid 12 colunas
- **FormCol** - Coluna com span responsivo
- **FormField** - Wrapper inteligente (label, erro, descrição)
- **FormSection** - Seção com título
- **FormActions** - Container para botões
- **FormGroup** - Agrupa campos relacionados

### Grid System
- **Grid** - Sistema de grid completo
- **GridItem** - Item de grid com span e posicionamento

### Flex & Helpers
- **Flex** - Sistema flex avançado
- **FlexItem** - Item flex com controle
- **Section** - Seção de conteúdo
- **Spacer** - Espaçamento flexível/fixo
- **Center** - Centralização
- **AspectRatio** - Proporção fixa

---

## 🎯 FormLayout - Grid 12 Colunas

### FormRow + FormCol

Sistema de grid baseado em 12 colunas (como Bootstrap).

```typescript
import { FormRow, FormCol, InputText } from '@prime-repo/ui';

<FormRow gap={4}>
  {/* 1 coluna inteira */}
  <FormCol span={12}>
    <InputText fullWidth placeholder="Nome completo" />
  </FormCol>

  {/* 2 colunas de 6 (50% cada) */}
  <FormCol span={6}>
    <InputText fullWidth placeholder="Email" />
  </FormCol>
  <FormCol span={6}>
    <InputText fullWidth placeholder="Telefone" />
  </FormCol>

  {/* 3 colunas (33% cada) */}
  <FormCol span={4}>
    <InputText fullWidth placeholder="Cidade" />
  </FormCol>
  <FormCol span={4}>
    <InputText fullWidth placeholder="Estado" />
  </FormCol>
  <FormCol span={4}>
    <InputText fullWidth placeholder="CEP" />
  </FormCol>

  {/* 4 colunas de 3 (25% cada) */}
  <FormCol span={3}>
    <InputText fullWidth placeholder="Q1" />
  </FormCol>
  <FormCol span={3}>
    <InputText fullWidth placeholder="Q2" />
  </FormCol>
  <FormCol span={3}>
    <InputText fullWidth placeholder="Q3" />
  </FormCol>
  <FormCol span={3}>
    <InputText fullWidth placeholder="Q4" />
  </FormCol>
</FormRow>
```

### Responsividade

Diferentes spans por breakpoint:

```typescript
<FormRow>
  {/* Mobile: 12, Tablet: 6, Desktop: 4 */}
  <FormCol span={12} spanMd={6} spanLg={4}>
    <InputText fullWidth placeholder="Campo 1" />
  </FormCol>
  <FormCol span={12} spanMd={6} spanLg={4}>
    <InputText fullWidth placeholder="Campo 2" />
  </FormCol>
  <FormCol span={12} spanMd={12} spanLg={4}>
    <InputText fullWidth placeholder="Campo 3" />
  </FormCol>
</FormRow>
```

### Offset (Espaçamento)

```typescript
<FormRow>
  {/* Inicia na coluna 4 (pula 3) */}
  <FormCol span={6} offset={3}>
    <InputText fullWidth placeholder="Centralizado" />
  </FormCol>

  {/* Alinhado à direita */}
  <FormCol span={4} offset={8}>
    <InputText fullWidth placeholder="Direita" />
  </FormCol>
</FormRow>
```

---

## 🎨 FormField - Wrapper Inteligente

Adiciona automaticamente label, erro e descrição aos inputs.

### Uso Básico

```typescript
import { FormField, InputText } from '@prime-repo/ui';

<FormField
  name="email"
  label="Email"
  description="Usaremos para enviar atualizações"
  required
>
  <InputText fullWidth placeholder="seu@email.com" />
</FormField>
```

### Integração com useForm

```typescript
import { useForm } from '@prime-repo/shared/hooks';
import { required, email } from '@prime-repo/utils/validations';
import { FormField, InputText } from '@prime-repo/ui';

function MyForm() {
  const form = useForm({
    email: {
      initialValue: '',
      validators: [required, email]
    },
    name: {
      initialValue: '',
      validators: [required]
    }
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* FormField se conecta automaticamente ao form */}
      <FormField
        name="name"
        label="Nome"
        required
        form={form}
      >
        <InputText fullWidth />
      </FormField>

      <FormField
        name="email"
        label="Email"
        description="Email para contato"
        required
        form={form}
      >
        <InputText fullWidth />
      </FormField>

      {/* Mostra erro automaticamente se touched + invalid */}
    </form>
  );
}
```

**O que FormField faz automaticamente com form:**
- ✅ Conecta `value`, `onChange`, `onBlur`
- ✅ Mostra erro quando campo foi touched
- ✅ Aplica estado de erro visual no input
- ✅ Esconde description quando há erro (mostra erro)

---

## 📋 Exemplo Completo - Formulário de Cadastro

```typescript
import { useForm } from '@prime-repo/shared/hooks';
import { required, email, cpf, phone, minLength } from '@prime-repo/utils/validations';
import {
  FormRow,
  FormCol,
  FormField,
  FormSection,
  FormActions,
  InputText,
  InputMask,
  Dropdown,
  Password,
  Button
} from '@prime-repo/ui';

function RegisterForm() {
  const form = useForm({
    name: { initialValue: '', validators: [required, minLength(3)] },
    email: { initialValue: '', validators: [required, email] },
    cpf: { initialValue: '', validators: [required, cpf] },
    phone: { initialValue: '', validators: [required, phone] },
    password: { initialValue: '', validators: [required, minLength(8)] },
    city: { initialValue: '', validators: [required] },
    state: { initialValue: '', validators: [required] },
  });

  const handleSubmit = async (values) => {
    console.log('Form values:', values);
    await registerUser(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {/* Seção: Dados Pessoais */}
      <FormSection
        title="Dados Pessoais"
        description="Informações básicas do usuário"
        divider
      >
        <FormRow gap={4}>
          {/* Nome completo - linha inteira */}
          <FormCol span={12}>
            <FormField name="name" label="Nome Completo" required form={form}>
              <InputText fullWidth placeholder="Digite seu nome" />
            </FormField>
          </FormCol>

          {/* Email e CPF - 50% cada */}
          <FormCol span={12} spanMd={6}>
            <FormField
              name="email"
              label="Email"
              description="Usado para login"
              required
              form={form}
            >
              <InputText fullWidth placeholder="email@exemplo.com" />
            </FormField>
          </FormCol>

          <FormCol span={12} spanMd={6}>
            <FormField name="cpf" label="CPF" required form={form}>
              <InputMask
                fullWidth
                mask="999.999.999-99"
                placeholder="000.000.000-00"
              />
            </FormField>
          </FormCol>

          {/* Telefone e Senha */}
          <FormCol span={12} spanMd={6}>
            <FormField name="phone" label="Telefone" required form={form}>
              <InputMask
                fullWidth
                mask="(99) 99999-9999"
                placeholder="(00) 00000-0000"
              />
            </FormField>
          </FormCol>

          <FormCol span={12} spanMd={6}>
            <FormField
              name="password"
              label="Senha"
              description="Mínimo 8 caracteres"
              required
              form={form}
            >
              <Password fullWidth placeholder="Digite sua senha" />
            </FormField>
          </FormCol>
        </FormRow>
      </FormSection>

      {/* Seção: Endereço */}
      <FormSection
        title="Endereço"
        description="Onde você mora"
        divider
      >
        <FormRow gap={4}>
          {/* Cidade - 8 colunas */}
          <FormCol span={12} spanMd={8}>
            <FormField name="city" label="Cidade" required form={form}>
              <InputText fullWidth placeholder="São Paulo" />
            </FormField>
          </FormCol>

          {/* Estado - 4 colunas */}
          <FormCol span={12} spanMd={4}>
            <FormField name="state" label="Estado" required form={form}>
              <Dropdown
                fullWidth
                options={estados}
                placeholder="Selecione"
              />
            </FormField>
          </FormCol>
        </FormRow>
      </FormSection>

      {/* Ações do formulário */}
      <FormActions align="right">
        <Button
          label="Cancelar"
          variant="secondary"
          onClick={() => form.reset()}
          type="button"
        />
        <Button
          label="Cadastrar"
          variant="primary"
          type="submit"
          disabled={!form.isValid || form.isSubmitting}
          loading={form.isSubmitting}
        />
      </FormActions>
    </form>
  );
}
```

---

## 🎯 Grid - Sistema de Grid Completo

Mais poderoso que FormRow/FormCol, com controle total.

```typescript
import { Grid, GridItem } from '@prime-repo/ui';

// Grid básico - 3 colunas
<Grid cols={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Grid responsivo
<Grid
  cols={1}        // Mobile: 1 col
  colsMd={2}      // Tablet: 2 cols
  colsLg={3}      // Desktop: 3 cols
  colsXl={4}      // Large: 4 cols
  gap={6}
>
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</Grid>

// GridItem com span
<Grid cols={12} gap={4}>
  <GridItem colSpan={12}>
    <div>Header - linha inteira</div>
  </GridItem>

  <GridItem colSpan={8}>
    <div>Main content - 8 colunas</div>
  </GridItem>

  <GridItem colSpan={4}>
    <div>Sidebar - 4 colunas</div>
  </GridItem>

  <GridItem colSpan={12}>
    <div>Footer - linha inteira</div>
  </GridItem>
</Grid>

// Posicionamento manual
<Grid cols={12}>
  <GridItem colStart={3} colEnd={11}>
    <div>Centralizado com offset</div>
  </GridItem>

  <GridItem rowSpan={2}>
    <div>2 linhas de altura</div>
  </GridItem>
</Grid>
```

---

## 💪 Flex - Sistema Flex Avançado

```typescript
import { Flex, FlexItem } from '@prime-repo/ui';

// Flex básico
<Flex direction="row" gap={4} align="center" justify="between">
  <div>Esquerda</div>
  <div>Direita</div>
</Flex>

// Com wrap
<Flex wrap gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Flex>

// FlexItem com grow
<Flex gap={4}>
  <FlexItem shrink={false}>
    <div>Fixo</div>
  </FlexItem>
  
  <FlexItem grow>
    <div>Cresce para preencher</div>
  </FlexItem>
  
  <FlexItem shrink={false}>
    <div>Fixo</div>
  </FlexItem>
</Flex>

// Basis
<Flex>
  <FlexItem basis="1/3">
    <div>33%</div>
  </FlexItem>
  <FlexItem basis="2/3">
    <div>66%</div>
  </FlexItem>
</Flex>
```

---

## 📐 Helpers

### Section

```typescript
import { Section, Button } from '@prime-repo/ui';

<Section
  title="Configurações"
  description="Gerencie suas preferências"
  actions={
    <>
      <Button label="Salvar" variant="primary" size="small" />
      <Button label="Cancelar" variant="secondary" size="small" />
    </>
  }
  divider
>
  {/* Conteúdo da seção */}
</Section>
```

### Spacer

```typescript
import { Spacer, VStack } from '@prime-repo/ui';

<VStack>
  <div>Item 1</div>
  <Spacer size={8} /> {/* Espaço fixo */}
  <div>Item 2</div>
  <Spacer flexible /> {/* Espaço flexível - preenche disponível */}
  <div>Item 3</div>
</VStack>
```

### Center

```typescript
import { Center } from '@prime-repo/ui';

// Centraliza nos dois eixos
<Center axis="both" className="h-screen">
  <div>Conteúdo centralizado</div>
</Center>

// Apenas horizontal
<Center axis="horizontal">
  <Button label="Centralizado" />
</Center>
```

### AspectRatio

```typescript
import { AspectRatio } from '@prime-repo/ui';

<AspectRatio ratio="16/9">
  <img src="/image.jpg" className="w-full h-full object-cover" />
</AspectRatio>

<AspectRatio ratio="1/1">
  <div className="bg-blue-500 w-full h-full">
    Quadrado
  </div>
</AspectRatio>
```

---

## 🎯 Patterns Comuns

### Dashboard Layout

```typescript
<Grid cols={12} gap={6}>
  {/* Header */}
  <GridItem colSpan={12}>
    <Section title="Dashboard" actions={<Button label="Refresh" />}>
      Overview
    </Section>
  </GridItem>

  {/* Métricas - 3 cards */}
  <GridItem colSpan={12} colSpanMd={4}>
    <Card>Métrica 1</Card>
  </GridItem>
  <GridItem colSpan={12} colSpanMd={4}>
    <Card>Métrica 2</Card>
  </GridItem>
  <GridItem colSpan={12} colSpanMd={4}>
    <Card>Métrica 3</Card>
  </GridItem>

  {/* Main + Sidebar */}
  <GridItem colSpan={12} colSpanLg={8}>
    <Card>Main Content</Card>
  </GridItem>
  <GridItem colSpan={12} colSpanLg={4}>
    <Card>Sidebar</Card>
  </GridItem>
</Grid>
```

### Formulário Multi-Step

```typescript
<FormSection title="Passo 1/3" description="Dados pessoais">
  <FormRow gap={4}>
    <FormCol span={12}>
      <FormField name="name" label="Nome" required form={form}>
        <InputText fullWidth />
      </FormField>
    </FormCol>
  </FormRow>
</FormSection>

<FormSection title="Passo 2/3" description="Endereço">
  {/* ... */}
</FormSection>

<FormActions align="between">
  <Button label="Voltar" variant="secondary" />
  <Button label="Próximo" variant="primary" />
</FormActions>
```

### Filtros + Tabela

```typescript
<Section title="Usuários" description="Gerenciar usuários do sistema">
  {/* Filtros */}
  <FormRow gap={4} align="end">
    <FormCol span={12} spanMd={4}>
      <FormField name="search" label="Buscar">
        <InputText fullWidth placeholder="Nome, email..." />
      </FormField>
    </FormCol>

    <FormCol span={12} spanMd={3}>
      <FormField name="status" label="Status">
        <Dropdown fullWidth options={statusOptions} />
      </FormField>
    </FormCol>

    <FormCol span={12} spanMd={3}>
      <FormField name="role" label="Função">
        <Dropdown fullWidth options={roleOptions} />
      </FormField>
    </FormCol>

    <FormCol span={12} spanMd={2}>
      <Button label="Filtrar" variant="primary" className="w-full" />
    </FormCol>
  </FormRow>

  {/* Tabela */}
  <DataTable value={users} />
</Section>
```

---

## 📚 Props Reference

### FormRow
```typescript
gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
align?: 'start' | 'center' | 'end' | 'stretch'
```

### FormCol
```typescript
span?: 1-12           // Padrão
spanSm?: 1-12         // ≥640px
spanMd?: 1-12         // ≥768px
spanLg?: 1-12         // ≥1024px
spanXl?: 1-12         // ≥1280px
offset?: 0-11         // Pular colunas
```

### FormField
```typescript
name: string          // Nome do campo (obrigatório)
label?: string        // Label do campo
description?: string  // Texto auxiliar
required?: boolean    // Mostra * no label
form?: UseFormResult  // Integração automática com useForm
showError?: boolean   // Exibir erros (padrão: true)
```

### Grid
```typescript
cols?: 1-12           // Colunas
colsSm/Md/Lg/Xl?: 1-12 // Responsivo
gap?: 0-16            // Espaçamento
gapX/gapY?: 0-16      // Espaçamento eixo
autoRows?: 'auto' | 'min' | 'max' | 'fr'
flow?: 'row' | 'col' | 'dense'
```

### GridItem
```typescript
colSpan?: 1-12 | 'full'
rowSpan?: 1-6 | 'full'
colStart/End?: 1-13 | 'auto'
rowStart/End?: 1-7 | 'auto'
```

### Flex
```typescript
direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
wrap?: boolean | 'reverse'
gap?: 0-16
align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
grow?: boolean
shrink?: boolean
inline?: boolean
```

---

## 💡 Dicas

1. **FormField + useForm** = Menos código, validação automática
2. **FormRow/FormCol** para formulários, **Grid** para layouts gerais
3. **Sempre use fullWidth nos inputs** dentro de FormCol/GridItem
4. **Combine span responsivo** para mobile-first
5. **FormSection + FormActions** criam estrutura clara
6. **Spacer flexible** para empurrar elementos
7. **Center** para centralizar modais/mensagens
8. **AspectRatio** para imagens/vídeos

---

**Pronto para criar formulários e layouts profissionais! 🎉**
