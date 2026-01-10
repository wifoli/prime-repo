# 📝 Input Components Guide - @prime-repo/ui

Biblioteca completa de componentes de input baseada em PrimeReact com Tailwind CSS.

---

## 📦 Componentes Disponíveis

### Inputs de Texto (5)
✅ **InputText** - Input de texto básico  
✅ **InputNumber** - Input numérico com formatação  
✅ **InputMask** - Input com máscara (CPF, CNPJ, etc.)  
✅ **InputTextarea** - Área de texto multilinha  
✅ **Password** - Input de senha com toggle de visibilidade

### Inputs de Seleção (6)
✅ **Dropdown** - Select simples com busca opcional  
✅ **MultiSelect** - Seleção múltipla  
✅ **AutoComplete** - Autocomplete com busca local e API  
✅ **Checkbox** - Checkbox individual  
✅ **RadioButton** + **RadioGroup** - Radio buttons  
✅ **InputSwitch** - Toggle switch

### Data e Hora (1)
✅ **Calendar** - Seletor de data/hora com ranges

### Inputs Especiais (4)
✅ **Slider** - Range slider  
✅ **Rating** - Avaliação por estrelas  
✅ **ColorPicker** - Seletor de cores  
✅ **FileUpload** - Upload de arquivos

### Composição (4)
✅ **InputGroup** - Agrupa inputs com addons  
✅ **InputGroupAddon** - Addon para InputGroup  
✅ **InputWithIcon** - Helper para input + ícone  
✅ **InputWithButton** - Helper para input + botão

**Total:** 20+ componentes prontos para uso!

---

## 🎯 Props Comuns

Todos os inputs compartilham estas props:

```typescript
interface CommonInputProps {
  fullWidth?: boolean;    // Largura total
  error?: boolean;        // Estado de erro (borda vermelha)
  helperText?: string;    // Texto auxiliar/mensagem de erro
  label?: string;         // Label acima do campo
  required?: boolean;     // Asterisco vermelho (*)
  className?: string;     // Classes adicionais
  disabled?: boolean;     // Desabilitar input
}
```

---

## 📝 Inputs de Texto

### InputText

Input de texto básico com suporte completo a addons e validação.

#### Props
```typescript
interface InputTextProps extends PrimeInputTextProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  startAddon?: ReactNode;  // Addon no início
  endAddon?: ReactNode;    // Addon no final
}
```

#### Exemplos

```typescript
import { InputText } from '@prime-repo/ui';

// Básico
<InputText
  label="Nome"
  placeholder="Digite seu nome"
  value={name}
  onChange={(e) => setName(e.target.value)}
  fullWidth
  required
/>

// Com erro
<InputText
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValid}
  helperText="Email inválido"
  fullWidth
/>

// Com addons inline
<InputText
  label="Website"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  startAddon={<span className="text-gray-500">https://</span>}
  endAddon={<span className="text-gray-500">.com</span>}
  fullWidth
/>

// Desabilitado
<InputText
  label="Código"
  value="ABC123"
  disabled
  fullWidth
/>
```

---

### InputNumber

Input numérico com formatação de moeda, porcentagem e casas decimais.

#### Props
```typescript
interface InputNumberProps extends PrimeInputNumberProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  onChange?: (value: number | null) => void;
  // Props do PrimeReact
  mode?: 'decimal' | 'currency';
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  prefix?: string;
  suffix?: string;
  showButtons?: boolean;
  step?: number;
}
```

#### Exemplos

```typescript
import { InputNumber } from '@prime-repo/ui';

// Quantidade simples
<InputNumber
  label="Quantidade"
  value={quantity}
  onChange={(value) => setQuantity(value)}
  min={1}
  max={100}
  showButtons
  fullWidth
/>

// Moeda (BRL)
<InputNumber
  label="Preço"
  value={price}
  onChange={(value) => setPrice(value)}
  mode="currency"
  currency="BRL"
  locale="pt-BR"
  fullWidth
/>

// Porcentagem
<InputNumber
  label="Desconto"
  value={discount}
  onChange={(value) => setDiscount(value)}
  suffix="%"
  min={0}
  max={100}
  minFractionDigits={2}
  maxFractionDigits={2}
  fullWidth
/>

// Com botões +/-
<InputNumber
  label="Pessoas"
  value={people}
  onChange={(value) => setPeople(value)}
  showButtons
  buttonLayout="horizontal"
  decrementButtonIcon="pi pi-minus"
  incrementButtonIcon="pi pi-plus"
  min={1}
  step={1}
  fullWidth
/>
```

---

### InputMask

Input com máscaras pré-definidas ou customizadas.

#### Props
```typescript
interface InputMaskProps extends PrimeInputMaskProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  mask: string;  // Máscara (use MaskPresets)
  onChange?: (value: string) => void;
}
```

#### MaskPresets Disponíveis

```typescript
import { MaskPresets } from '@prime-repo/ui';

MaskPresets.CPF          // 999.999.999-99
MaskPresets.CNPJ         // 99.999.999/9999-99
MaskPresets.PHONE        // (99) 99999-9999
MaskPresets.PHONE_FIXED  // (99) 9999-9999
MaskPresets.CEP          // 99999-999
MaskPresets.DATE         // 99/99/9999
MaskPresets.TIME         // 99:99
MaskPresets.CREDIT_CARD  // 9999 9999 9999 9999
MaskPresets.CVV          // 999
MaskPresets.CPF_CNPJ     // 999.999.999-99||99.999.999/9999-99
```

#### Caracteres de Máscara
- `9` - Número (0-9)
- `a` - Letra (a-z, A-Z)
- `*` - Alfanumérico

#### Exemplos

```typescript
import { InputMask, MaskPresets } from '@prime-repo/ui';

// CPF
<InputMask
  label="CPF"
  mask={MaskPresets.CPF}
  value={cpf}
  onChange={(value) => setCpf(value)}
  placeholder="000.000.000-00"
  required
  fullWidth
/>

// Telefone
<InputMask
  label="Telefone"
  mask={MaskPresets.PHONE}
  value={phone}
  onChange={(value) => setPhone(value)}
  fullWidth
/>

// CEP
<InputMask
  label="CEP"
  mask={MaskPresets.CEP}
  value={cep}
  onChange={(value) => setCep(value)}
  fullWidth
/>

// Data
<InputMask
  label="Data de Nascimento"
  mask={MaskPresets.DATE}
  value={date}
  onChange={(value) => setDate(value)}
  placeholder="00/00/0000"
  fullWidth
/>

// Cartão de Crédito
<InputMask
  label="Número do Cartão"
  mask={MaskPresets.CREDIT_CARD}
  value={card}
  onChange={(value) => setCard(value)}
  fullWidth
/>

// Máscara customizada
<InputMask
  label="Código"
  mask="aaa-999"
  value={code}
  onChange={(value) => setCode(value)}
  placeholder="ABC-123"
  fullWidth
/>
```

---

### InputTextarea

Área de texto multilinha com contador de caracteres.

#### Props
```typescript
interface InputTextareaProps extends PrimeInputTextareaProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxLength?: number;
  showCharCount?: boolean;  // Mostra contador
}
```

#### Exemplos

```typescript
import { InputTextarea } from '@prime-repo/ui';

// Básico
<InputTextarea
  label="Descrição"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={5}
  placeholder="Digite uma descrição..."
  fullWidth
/>

// Com contador de caracteres
<InputTextarea
  label="Comentário"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  maxLength={500}
  showCharCount
  rows={4}
  fullWidth
/>

// Auto resize
<InputTextarea
  label="Mensagem"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  autoResize
  placeholder="Digite sua mensagem..."
  fullWidth
/>
```

---

### Password

Input de senha com medidor de força e toggle de visibilidade.

#### Props
```typescript
interface PasswordProps extends PrimePasswordProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  feedback?: boolean;     // Medidor de força
  toggleMask?: boolean;   // Botão mostrar/ocultar
}
```

#### Exemplos

```typescript
import { Password } from '@prime-repo/ui';

// Simples (sem medidor)
<Password
  label="Senha"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  feedback={false}
  toggleMask
  fullWidth
/>

// Com medidor de força
<Password
  label="Nova Senha"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  promptLabel="Digite uma senha"
  weakLabel="Fraca"
  mediumLabel="Média"
  strongLabel="Forte"
  toggleMask
  fullWidth
/>

// Com validação customizada
<Password
  label="Senha"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  mediumRegex="^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  strongRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  toggleMask
  fullWidth
/>
```

---

## 🎛️ Inputs de Seleção

### Dropdown

Select simples com busca opcional e agrupamento.

#### Props
```typescript
interface DropdownProps extends PrimeDropdownProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  options: any[];
  onChange?: (value: any) => void;
  searchable?: boolean;      // Habilita busca
  emptyMessage?: string;     // Mensagem quando vazio
}
```

#### Exemplos

```typescript
import { Dropdown } from '@prime-repo/ui';

const options = [
  { label: 'Brasil', value: 'BR' },
  { label: 'Estados Unidos', value: 'US' },
  { label: 'Canadá', value: 'CA' }
];

// Básico
<Dropdown
  label="País"
  options={options}
  value={country}
  onChange={(value) => setCountry(value)}
  placeholder="Selecione um país"
  fullWidth
/>

// Com busca
<Dropdown
  label="Estado"
  options={states}
  value={state}
  onChange={(value) => setState(value)}
  searchable
  placeholder="Selecione um estado"
  emptyMessage="Nenhum estado encontrado"
  fullWidth
/>

// Com grupos
const groupedOptions = [
  {
    label: 'América do Norte',
    items: [
      { label: 'EUA', value: 'US' },
      { label: 'Canadá', value: 'CA' }
    ]
  },
  {
    label: 'América do Sul',
    items: [
      { label: 'Brasil', value: 'BR' },
      { label: 'Argentina', value: 'AR' }
    ]
  }
];

<Dropdown
  label="País"
  options={groupedOptions}
  value={country}
  onChange={(value) => setCountry(value)}
  optionGroupLabel="label"
  optionGroupChildren="items"
  fullWidth
/>
```

---

### MultiSelect

Seleção múltipla com busca e "select all".

#### Props
```typescript
interface MultiSelectProps extends PrimeMultiSelectProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  options: any[];
  onChange?: (value: any[]) => void;
  searchable?: boolean;         // Habilita busca
  selectAll?: boolean;          // Botão "Selecionar todos"
  maxSelectedLabels?: number;   // Máx de labels exibidos
}
```

#### Exemplos

```typescript
import { MultiSelect } from '@prime-repo/ui';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' }
];

// Básico
<MultiSelect
  label="Tecnologias"
  options={options}
  value={technologies}
  onChange={(value) => setTechnologies(value)}
  placeholder="Selecione tecnologias"
  fullWidth
/>

// Com busca e select all
<MultiSelect
  label="Skills"
  options={skills}
  value={selectedSkills}
  onChange={(value) => setSelectedSkills(value)}
  searchable
  selectAll
  maxSelectedLabels={3}
  placeholder="Selecione suas skills"
  fullWidth
/>

// Com limite de exibição
<MultiSelect
  label="Categorias"
  options={categories}
  value={selected}
  onChange={(value) => setSelected(value)}
  maxSelectedLabels={2}
  selectedItemsLabel="{0} categorias selecionadas"
  fullWidth
/>
```

---

### AutoComplete

Autocomplete com busca local ou em API.

#### Props
```typescript
interface AutoCompleteProps extends PrimeAutoCompleteProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  onChange?: (value: any) => void;
  // Busca local
  options?: AutoCompleteOption[];
  // Busca em API
  onSearch?: (query: string) => Promise<AutoCompleteOption[]>;
  minSearchLength?: number;
  searchDelay?: number;
}

interface AutoCompleteOption {
  label: string;
  value: any;
}
```

#### Exemplos

```typescript
import { AutoComplete } from '@prime-repo/ui';

// Busca Local
const options = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'py' }
];

<AutoComplete
  label="Linguagem"
  options={options}
  value={language}
  onChange={(value) => setLanguage(value)}
  placeholder="Digite para buscar..."
  minSearchLength={2}
  fullWidth
/>

// Busca em API
<AutoComplete
  label="Cidade"
  value={city}
  onChange={(value) => setCity(value)}
  onSearch={async (query) => {
    const response = await fetch(`/api/cities?q=${query}`);
    const data = await response.json();
    return data.map(city => ({
      label: city.name,
      value: city.id
    }));
  }}
  minSearchLength={3}
  searchDelay={300}
  placeholder="Digite o nome da cidade..."
  fullWidth
/>

// Seleção múltipla
<AutoComplete
  label="Tags"
  value={tags}
  onChange={(value) => setTags(value)}
  options={tagOptions}
  multiple
  placeholder="Adicione tags..."
  fullWidth
/>
```

---

### Checkbox

Checkbox individual com label e helper text.

#### Props
```typescript
interface CheckboxProps extends PrimeCheckboxProps {
  label?: string;
  helperText?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
```

#### Exemplos

```typescript
import { Checkbox } from '@prime-repo/ui';

// Básico
<Checkbox
  label="Aceito os termos e condições"
  checked={accepted}
  onChange={(checked) => setAccepted(checked)}
  required
/>

// Com helper text
<Checkbox
  label="Receber notificações"
  helperText="Você receberá emails sobre atualizações"
  checked={notifications}
  onChange={(checked) => setNotifications(checked)}
/>

// Desabilitado
<Checkbox
  label="Opção desabilitada"
  checked={false}
  disabled
/>

// Grupo de checkboxes
<VStack spacing={2}>
  <Checkbox
    label="JavaScript"
    checked={skills.includes('js')}
    onChange={(checked) => handleSkillChange('js', checked)}
  />
  <Checkbox
    label="TypeScript"
    checked={skills.includes('ts')}
    onChange={(checked) => handleSkillChange('ts', checked)}
  />
  <Checkbox
    label="React"
    checked={skills.includes('react')}
    onChange={(checked) => handleSkillChange('react', checked)}
  />
</VStack>
```

---

### RadioButton & RadioGroup

Radio button com helper RadioGroup para facilitar uso.

#### Props
```typescript
// RadioButton individual
interface RadioButtonProps extends PrimeRadioButtonProps {
  label?: string;
  value: any;
  checked?: boolean;
  onChange?: (value: any) => void;
}

// RadioGroup (recomendado)
interface RadioGroupProps {
  label?: string;
  options: { label: string; value: any }[];
  value?: any;
  onChange?: (value: any) => void;
  layout?: 'vertical' | 'horizontal';
  required?: boolean;
}
```

#### Exemplos

```typescript
import { RadioButton, RadioGroup } from '@prime-repo/ui';

const options = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' },
  { label: 'Outro', value: 'O' }
];

// Com RadioGroup (recomendado)
<RadioGroup
  label="Gênero"
  options={options}
  value={gender}
  onChange={(value) => setGender(value)}
  layout="horizontal"
  required
/>

// Layout vertical
<RadioGroup
  label="Forma de Pagamento"
  options={paymentOptions}
  value={payment}
  onChange={(value) => setPayment(value)}
  layout="vertical"
/>

// Radio buttons individuais
<VStack spacing={2}>
  <RadioButton
    label="Opção 1"
    value="1"
    checked={selected === '1'}
    onChange={(value) => setSelected(value)}
  />
  <RadioButton
    label="Opção 2"
    value="2"
    checked={selected === '2'}
    onChange={(value) => setSelected(value)}
  />
  <RadioButton
    label="Opção 3"
    value="3"
    checked={selected === '3'}
    onChange={(value) => setSelected(value)}
  />
</VStack>
```

---

### InputSwitch

Toggle switch com label.

#### Props
```typescript
interface InputSwitchProps extends PrimeInputSwitchProps {
  label?: string;
  labelPosition?: 'left' | 'right';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
```

#### Exemplos

```typescript
import { InputSwitch } from '@prime-repo/ui';

// Label à esquerda (padrão)
<InputSwitch
  label="Ativar notificações"
  checked={enabled}
  onChange={(checked) => setEnabled(checked)}
/>

// Label à direita
<InputSwitch
  label="Dark Mode"
  labelPosition="right"
  checked={darkMode}
  onChange={(checked) => setDarkMode(checked)}
/>

// Desabilitado
<InputSwitch
  label="Feature em desenvolvimento"
  checked={false}
  disabled
/>
```

---

## 📅 Data e Hora

### Calendar

Seletor de data/hora com range, múltiplas datas e validação.

#### Props
```typescript
interface CalendarProps extends PrimeCalendarProps {
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  onChange?: (value: Date | Date[] | null) => void;
  dateFormat?: string;
  showTime?: boolean;
  hourFormat?: '12' | '24';
  selectionMode?: 'single' | 'multiple' | 'range';
  minDate?: Date;
  maxDate?: Date;
}
```

#### Exemplos

```typescript
import { Calendar } from '@prime-repo/ui';

// Data simples
<Calendar
  label="Data de Nascimento"
  value={birthDate}
  onChange={(value) => setBirthDate(value)}
  dateFormat="dd/mm/yy"
  placeholder="Selecione uma data"
  fullWidth
/>

// Com hora
<Calendar
  label="Data e Hora do Evento"
  value={eventDateTime}
  onChange={(value) => setEventDateTime(value)}
  showTime
  hourFormat="24"
  fullWidth
/>

// Range de datas
<Calendar
  label="Período de Férias"
  value={vacationRange}
  onChange={(value) => setVacationRange(value)}
  selectionMode="range"
  readOnlyInput
  fullWidth
/>

// Múltiplas datas
<Calendar
  label="Datas de Entrega"
  value={deliveryDates}
  onChange={(value) => setDeliveryDates(value)}
  selectionMode="multiple"
  fullWidth
/>

// Com limites de data
<Calendar
  label="Data da Reserva"
  value={reservation}
  onChange={(value) => setReservation(value)}
  minDate={new Date()}
  maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
  disabledDates={[new Date(2025, 11, 25)]} // Natal
  fullWidth
/>

// Apenas mês e ano
<Calendar
  label="Mês de Vencimento"
  value={expiryDate}
  onChange={(value) => setExpiryDate(value)}
  view="month"
  dateFormat="mm/yy"
  fullWidth
/>
```

---

## 🎨 Inputs Especiais

### Slider

Range slider com valor único ou range (min-max).

#### Props
```typescript
interface SliderProps extends PrimeSliderProps {
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  showValue?: boolean;
}
```

#### Exemplos

```typescript
import { Slider } from '@prime-repo/ui';

// Valor simples
<Slider
  label="Volume"
  value={volume}
  onChange={(value) => setVolume(value)}
  min={0}
  max={100}
  showValue
  fullWidth
/>

// Range (min-max)
<Slider
  label="Faixa de Preço"
  value={priceRange}
  onChange={(value) => setPriceRange(value)}
  range
  min={0}
  max={1000}
  step={10}
  showValue
  fullWidth
/>

// Com steps decimais
<Slider
  label="Avaliação"
  value={rating}
  onChange={(value) => setRating(value)}
  min={0}
  max={5}
  step={0.5}
  showValue
  fullWidth
/>
```

---

### Rating

Avaliação por estrelas.

#### Props
```typescript
interface RatingProps extends PrimeRatingProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  stars?: number;
  cancel?: boolean;
  readOnly?: boolean;
}
```

#### Exemplos

```typescript
import { Rating } from '@prime-repo/ui';

// Básico
<Rating
  label="Avaliação"
  value={rating}
  onChange={(value) => setRating(value)}
  stars={5}
/>

// Readonly (exibir apenas)
<Rating
  label="Avaliação do Produto"
  value={4.5}
  readOnly
  cancel={false}
  stars={5}
/>

// Com ícone customizado
<Rating
  label="Curtidas"
  value={likes}
  onChange={(value) => setLikes(value)}
  onIcon="pi pi-heart-fill"
  offIcon="pi pi-heart"
  stars={5}
/>
```

---

### ColorPicker

Seletor de cores com preview.

#### Props
```typescript
interface ColorPickerProps extends PrimeColorPickerProps {
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
  format?: 'hex' | 'rgb' | 'hsb';
  showPreview?: boolean;
}
```

#### Exemplos

```typescript
import { ColorPicker } from '@prime-repo/ui';

// Básico
<ColorPicker
  label="Cor do Tema"
  value={color}
  onChange={(value) => setColor(value)}
  format="hex"
  fullWidth
/>

// Com preview
<ColorPicker
  label="Cor de Fundo"
  value={bgColor}
  onChange={(value) => setBgColor(value)}
  format="hex"
  showPreview
  fullWidth
/>

// RGB
<ColorPicker
  label="Cor RGB"
  value={rgbColor}
  onChange={(value) => setRgbColor(value)}
  format="rgb"
  fullWidth
/>
```

---

### FileUpload

Upload de arquivos com validação e preview.

#### Props
```typescript
interface FileUploadProps extends PrimeFileUploadProps {
  label?: string;
  helperText?: string;
  accept?: string;
  maxFileSize?: number;
  onSelect?: (files: File[]) => void;
  multiple?: boolean;
  mode?: 'basic' | 'advanced';
}
```

#### Exemplos

```typescript
import { FileUpload } from '@prime-repo/ui';

// Básico
<FileUpload
  label="Anexar Documentos"
  accept="image/*,.pdf"
  maxFileSize={5000000} // 5MB
  onSelect={(files) => setFiles(files)}
  multiple
  helperText="Máximo 5MB por arquivo"
/>

// Drag & Drop avançado
<FileUpload
  label="Upload de Imagens"
  accept="image/*"
  maxFileSize={2000000}
  onSelect={(files) => handleUpload(files)}
  mode="advanced"
  chooseLabel="Selecionar"
  uploadLabel="Enviar"
  cancelLabel="Cancelar"
  multiple
/>

// Apenas uma imagem
<FileUpload
  label="Foto de Perfil"
  accept="image/png,image/jpeg"
  maxFileSize={1000000}
  onSelect={(files) => setProfilePic(files[0])}
  mode="basic"
/>
```

---

## 🔗 Composição com InputGroup

### InputGroup

Componente para agrupar inputs com addons (texto, ícones, botões).

#### Props
```typescript
interface InputGroupProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

interface InputGroupAddonProps {
  children: ReactNode;
  className?: string;
}
```

#### Exemplos Básicos

```typescript
import { InputGroup, InputGroupAddon, InputText } from '@prime-repo/ui';

// Com ícone
<InputGroup fullWidth>
  <InputGroupAddon>
    <i className="pi pi-user"></i>
  </InputGroupAddon>
  <InputText placeholder="Username" />
</InputGroup>

// Com texto
<InputGroup fullWidth>
  <InputGroupAddon>$</InputGroupAddon>
  <InputNumber placeholder="0.00" mode="decimal" />
  <InputGroupAddon>.00</InputGroupAddon>
</InputGroup>

// Com múltiplos addons
<InputGroup fullWidth>
  <InputGroupAddon>https://</InputGroupAddon>
  <InputText placeholder="website" />
  <InputGroupAddon>.com.br</InputGroupAddon>
</InputGroup>

// Com botão
<InputGroup fullWidth>
  <InputText placeholder="Buscar..." />
  <Button label="Buscar" icon="pi pi-search" />
</InputGroup>
```

---

### Helpers de Composição

Componentes auxiliares para padrões comuns.

#### InputWithIcon

```typescript
import { InputWithIcon, InputText } from '@prime-repo/ui';

// Ícone à esquerda
<InputWithIcon
  icon="pi pi-search"
  iconPosition="left"
  fullWidth
>
  <InputText placeholder="Buscar..." />
</InputWithIcon>

// Ícone à direita
<InputWithIcon
  icon="pi pi-envelope"
  iconPosition="right"
  fullWidth
>
  <InputText placeholder="Email" />
</InputWithIcon>
```

#### InputWithButton

```typescript
import { InputWithButton, InputText, Button } from '@prime-repo/ui';

// Botão à direita
<InputWithButton
  button={<Button label="Enviar" icon="pi pi-send" variant="primary" />}
  buttonPosition="right"
  fullWidth
>
  <InputText placeholder="Digite sua mensagem..." />
</InputWithButton>

// Botão à esquerda
<InputWithButton
  button={<Button icon="pi pi-search" variant="secondary" />}
  buttonPosition="left"
  fullWidth
>
  <InputText placeholder="Buscar..." />
</InputWithButton>
```

#### InputWithLabel

```typescript
import { InputWithLabel, InputText } from '@prime-repo/ui';

// Label à esquerda
<InputWithLabel
  label="Email"
  labelPosition="left"
  fullWidth
>
  <InputText placeholder="exemplo@email.com" />
</InputWithLabel>

// Label à direita
<InputWithLabel
  label="@gmail.com"
  labelPosition="right"
  fullWidth
>
  <InputText placeholder="username" />
</InputWithLabel>
```

---

## 💡 Padrões de Uso

### Formulário Completo

```typescript
import {
  InputText,
  InputMask,
  Dropdown,
  InputTextarea,
  Checkbox,
  Button,
  VStack,
  HStack,
  MaskPresets
} from '@prime-repo/ui';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    state: '',
    notes: '',
    terms: false
  });

  const states = [
    { label: 'São Paulo', value: 'SP' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    // ...
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <InputText
          label="Nome Completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          fullWidth
        />

        <InputMask
          label="CPF"
          mask={MaskPresets.CPF}
          value={formData.cpf}
          onChange={(value) => setFormData({ ...formData, cpf: value })}
          required
          fullWidth
        />

        <InputMask
          label="Telefone"
          mask={MaskPresets.PHONE}
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          fullWidth
        />

        <Dropdown
          label="Estado"
          options={states}
          value={formData.state}
          onChange={(value) => setFormData({ ...formData, state: value })}
          searchable
          required
          fullWidth
        />

        <InputTextarea
          label="Observações"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          fullWidth
        />

        <Checkbox
          label="Aceito os termos de uso"
          checked={formData.terms}
          onChange={(checked) => setFormData({ ...formData, terms: checked })}
          required
        />

        <HStack justify="end" spacing={2}>
          <Button label="Cancelar" variant="secondary" type="button" />
          <Button label="Salvar" variant="primary" type="submit" />
        </HStack>
      </VStack>
    </form>
  );
}
```

---

### Filtros de Busca

```typescript
import {
  InputText,
  Dropdown,
  MultiSelect,
  Calendar,
  InputGroup,
  InputGroupAddon,
  Button,
  HStack,
  VStack
} from '@prime-repo/ui';

function SearchFilters() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tags: [],
    dateRange: null
  });

  const handleFilter = () => {
    console.log('Aplicar filtros:', filters);
  };

  const handleClear = () => {
    setFilters({
      search: '',
      category: '',
      tags: [],
      dateRange: null
    });
  };

  return (
    <VStack spacing={4}>
      <InputGroup fullWidth>
        <InputGroupAddon>
          <i className="pi pi-search"></i>
        </InputGroupAddon>
        <InputText 
          placeholder="Buscar produtos..." 
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </InputGroup>

      <HStack spacing={3}>
        <Dropdown
          label="Categoria"
          options={categories}
          value={filters.category}
          onChange={(value) => setFilters({ ...filters, category: value })}
          placeholder="Todas"
          fullWidth
        />

        <MultiSelect
          label="Tags"
          options={tags}
          value={filters.tags}
          onChange={(value) => setFilters({ ...filters, tags: value })}
          placeholder="Selecione tags"
          maxSelectedLabels={2}
          fullWidth
        />
      </HStack>

      <Calendar
        label="Período"
        value={filters.dateRange}
        onChange={(value) => setFilters({ ...filters, dateRange: value })}
        selectionMode="range"
        fullWidth
      />

      <HStack justify="end" spacing={2}>
        <Button label="Limpar" variant="secondary" onClick={handleClear} />
        <Button label="Filtrar" variant="primary" onClick={handleFilter} />
      </HStack>
    </VStack>
  );
}
```

---

### Validação de Formulário

```typescript
import { InputText, Button } from '@prime-repo/ui';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (value: string) => {
    if (!value) return 'Email é obrigatório';
    if (!value.includes('@')) return 'Email inválido';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Senha é obrigatória';
    if (value.length < 6) return 'Senha deve ter no mínimo 6 caracteres';
    return '';
  };

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    setErrors({ ...errors, email: validateEmail(email) });
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    setErrors({ ...errors, password: validatePassword(password) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }

    console.log('Login:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <InputText
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched.email) {
              setErrors({ ...errors, email: validateEmail(e.target.value) });
            }
          }}
          onBlur={handleEmailBlur}
          error={touched.email && !!errors.email}
          helperText={touched.email ? errors.email : ''}
          required
          fullWidth
        />

        <Password
          label="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (touched.password) {
              setErrors({ ...errors, password: validatePassword(e.target.value) });
            }
          }}
          onBlur={handlePasswordBlur}
          error={touched.password && !!errors.password}
          helperText={touched.password ? errors.password : ''}
          feedback={false}
          toggleMask
          required
          fullWidth
        />

        <Button 
          label="Entrar" 
          variant="primary" 
          type="submit"
          className="w-full"
        />
      </VStack>
    </form>
  );
}
```

---

## 📚 Referência Rápida

### Imports

```typescript
// Text Inputs
import {
  InputText,
  InputNumber,
  InputMask,
  InputTextarea,
  Password,
  MaskPresets
} from '@prime-repo/ui';

// Selection Inputs
import {
  Dropdown,
  MultiSelect,
  AutoComplete,
  Checkbox,
  RadioButton,
  RadioGroup,
  InputSwitch
} from '@prime-repo/ui';

// Date/Time
import { Calendar } from '@prime-repo/ui';

// Special
import {
  Slider,
  Rating,
  ColorPicker,
  FileUpload
} from '@prime-repo/ui';

// Composition
import {
  InputGroup,
  InputGroupAddon,
  InputWithIcon,
  InputWithButton,
  InputWithLabel
} from '@prime-repo/ui';
```

---

### MaskPresets

```typescript
import { MaskPresets } from '@prime-repo/ui';

MaskPresets.CPF          // 999.999.999-99
MaskPresets.CNPJ         // 99.999.999/9999-99
MaskPresets.PHONE        // (99) 99999-9999
MaskPresets.PHONE_FIXED  // (99) 9999-9999
MaskPresets.CEP          // 99999-999
MaskPresets.DATE         // 99/99/9999
MaskPresets.TIME         // 99:99
MaskPresets.CREDIT_CARD  // 9999 9999 9999 9999
MaskPresets.CVV          // 999
MaskPresets.CPF_CNPJ     // 999.999.999-99||99.999.999/9999-99
```

---

### Props Comuns

```typescript
// Todas os inputs suportam
interface CommonProps {
  fullWidth?: boolean;     // Largura total
  error?: boolean;         // Estado de erro
  helperText?: string;     // Mensagem auxiliar
  label?: string;          // Label do campo
  required?: boolean;      // Asterisco (*)
  disabled?: boolean;      // Desabilitado
  className?: string;      // Classes extras
}
```

---

## 🎯 Estilos e Classes

Todos os inputs aplicam automaticamente:

- **Border normal**: `border-gray-300 hover:border-gray-400`
- **Border erro**: `border-red-500 focus:ring-red-500`
- **Focus**: `focus:outline-none focus:ring-2 focus:ring-blue-500`
- **Padding**: `px-3 py-2`
- **Rounded**: `rounded-md`
- **Transition**: `transition-colors duration-200`

Para customizar:

```typescript
<InputText
  className="!bg-gray-50 !border-purple-500"
  fullWidth
/>
```

---

**Versão:** 0.0.1  
**Última Atualização:** Janeiro 2025  
**Package:** @prime-repo/ui
