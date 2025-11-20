# @prime-repo/utils

Utilitários modulares para validação, formatação e helpers.

## 📦 Estrutura

```
@prime-repo/utils
├── /validations  - Validações para formulários
├── /formatters   - Formatadores (moeda, data, máscaras)
└── /helpers      - Utilitários gerais
```

## 🔍 Validations

Todas as validações retornam `ValidationResult`:
```typescript
interface ValidationResult {
  valid: boolean;
  error?: string;
}
```

### Uso Básico

```typescript
import { email, cpf, required, minLength } from '@prime-repo/utils/validations';

// Validar campo
const result = email('user@example.com');
if (!result.valid) {
  console.log(result.error);
}

// Validar formulário completo
import { validateForm } from '@prime-repo/utils/validations';

const { valid, errors } = validateForm(formData, {
  email: { validator: email },
  password: [
    { validator: required },
    { validator: minLength(8) }
  ]
});
```

### Validadores Disponíveis

**Comuns:**
- `required(value)` - Campo obrigatório
- `minLength(min)` - Mínimo de caracteres
- `maxLength(max)` - Máximo de caracteres
- `min(value)` - Valor mínimo (números)
- `max(value)` - Valor máximo (números)
- `pattern(regex, message)` - Padrão customizado
- `onlyLetters(value)` - Apenas letras
- `onlyNumbers(value)` - Apenas números
- `alphanumeric(value)` - Letras e números
- `equalTo(other, field)` - Igual a outro campo
- `oneOf(values)` - Um dos valores

**Específicos:**
- `email(value)` - Email válido
- `cpf(value)` - CPF válido
- `cnpj(value)` - CNPJ válido
- `phone(value)` - Telefone BR
- `password(value)` - Senha (8+ chars, 1 upper, 1 lower, 1 num)
- `strongPassword(value)` - Senha forte (+ caractere especial)
- `url(value)` - URL válida

### Com Zod (React Hook Form)

```typescript
import { z, emailSchema, cpfSchema, passwordSchema } from '@prime-repo/utils/validations';

const schema = z.object({
  email: emailSchema,
  cpf: cpfSchema,
  password: passwordSchema,
});
```

### Helpers de Formulário

```typescript
import { validateField, validateForm, withMessage } from '@prime-repo/utils/validations';

// Validar campo com múltiplas regras
const result = validateField(email, [
  { validator: required },
  { validator: email }
]);

// Mensagem customizada
const rules = [
  withMessage(required, 'Por favor, preencha este campo'),
  withMessage(minLength(8), 'Mínimo de 8 caracteres obrigatório')
];
```

---

## 🎨 Formatters

### Moeda

```typescript
import { currency, parseCurrency, number, percentage, compact } from '@prime-repo/utils/formatters';

currency(1234.56);          // 'R$ 1.234,56'
parseCurrency('R$ 1.234,56'); // 1234.56
number(1234567);            // '1.234.567'
percentage(45.678);         // '45.68%'
compact(1000000);           // '1 mi'
```

### Data

```typescript
import { date, datetime, time, relative } from '@prime-repo/utils/formatters';

date(new Date());                    // '20/11/2024'
date(new Date(), 'dd/MM/yy');        // '20/11/24'
datetime(new Date());                // '20/11/2024 às 15:30'
time(new Date());                    // '15:30'
relative(new Date());                // 'há 2 dias'
```

### Máscaras

```typescript
import { cpf, cnpj, phone, cep, creditCard, maskCreditCard } from '@prime-repo/utils/formatters';

cpf('12345678909');            // '123.456.789-09'
cnpj('12345678000190');        // '12.345.678/0001-90'
phone('11987654321');          // '(11) 98765-4321'
cep('12345678');               // '12345-678'
creditCard('1234567890123456'); // '1234 5678 9012 3456'
maskCreditCard('1234567890123456'); // '**** **** **** 3456'
```

---

## 🛠️ Helpers

### Array

```typescript
import { unique, groupBy, chunk, sortBy, sample, shuffle } from '@prime-repo/utils/helpers';

unique([1, 2, 2, 3]);          // [1, 2, 3]
groupBy(users, 'role');        // { admin: [...], user: [...] }
chunk([1,2,3,4,5], 2);         // [[1,2], [3,4], [5]]
sortBy(users, 'name', 'asc');  // Ordenado por nome
sample([1,2,3,4,5]);           // 3 (aleatório)
shuffle([1,2,3,4,5]);          // [3,1,5,2,4]
```

### String

```typescript
import { capitalize, capitalizeWords, slugify, truncate, removeAccents, mask } from '@prime-repo/utils/helpers';

capitalize('hello');           // 'Hello'
capitalizeWords('hello world'); // 'Hello World'
slugify('Hello World!');       // 'hello-world'
truncate('Long text', 10);     // 'Long te...'
removeAccents('José');         // 'Jose'
mask('1234567890', 3);         // '123****890'
```

### Async

```typescript
import { sleep, debounce, throttle, retry } from '@prime-repo/utils/helpers';

await sleep(1000);  // Aguarda 1 segundo

const debouncedFn = debounce((query) => {
  console.log('Searching:', query);
}, 300);

const throttledFn = throttle(() => {
  console.log('Scrolling');
}, 100);

await retry(async () => {
  return await fetch('/api/data');
}, { retries: 3, delay: 1000 });
```

---

## 🚀 Como Usar

### Instalação

```bash
# Build do package
pnpm --filter @prime-repo/utils build
```

### Importação

```typescript
// Modular (recomendado)
import { email, cpf } from '@prime-repo/utils/validations';
import { currency, date } from '@prime-repo/utils/formatters';
import { unique, debounce } from '@prime-repo/utils/helpers';

// Ou tudo do root
import { email, currency, unique } from '@prime-repo/utils';
```

---

## 💡 Exemplos Práticos

### Formulário Simples

```typescript
import { validateForm, required, email, minLength } from '@prime-repo/utils/validations';

function handleSubmit(data) {
  const { valid, errors } = validateForm(data, {
    name: { validator: required },
    email: { validator: email },
    password: [
      { validator: required },
      { validator: minLength(8) }
    ]
  });

  if (!valid) {
    setErrors(errors);
    return;
  }

  // Submit form
}
```

### Com React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, emailSchema, passwordSchema } from '@prime-repo/utils/validations';

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
    </form>
  );
}
```

### Formatação em Componentes

```typescript
import { currency, date, cpf } from '@prime-repo/utils/formatters';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Preço: {currency(product.price)}</p>
      <p>Data: {date(product.createdAt)}</p>
      <p>Vendedor: {cpf(product.sellerCpf)}</p>
    </div>
  );
}
```

---

## 📋 Padrões

**Todas as validações:**
- Retornam `ValidationResult`
- São opcionais por padrão (use `required` se necessário)
- Aceitam valores formatados ou não

**Todos os formatadores:**
- Retornam string
- Lidam com valores vazios
- Seguem padrão brasileiro

**Todos os helpers:**
- São pure functions
- Sem side effects
- Type-safe
