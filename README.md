# Prime Repo

Monorepo utilizando Turborepo com React, TypeScript, PrimeReact e Tailwind CSS v4.

## Estrutura do Projeto

```
prime-repo/
├── apps/
│   ├── app1/          # Aplicação exemplo 1 (Dashboard, Users, Settings)
│   └── app2/          # Aplicação exemplo 2 (Home, Products, About)
├── packages/
│   ├── ui/            # Componentes UI baseados em PrimeReact
│   └── panel/         # Painel/Template base
├── docker-compose.yml
├── Dockerfile
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Stack Tecnológica

- **Gerenciamento**: Turborepo + pnpm
- **Framework**: React + TypeScript + Vite
- **UI**: PrimeReact + Tailwind CSS v4
- **Container**: Docker

## Como Usar

### Primeira Execução (Docker)

```bash
# Construir e iniciar os containers (primeira vez pode demorar)
docker-compose up --build

# O pnpm-lock.yaml será gerado automaticamente na primeira execução
```

### Desenvolvimento (Docker)

Após a primeira execução:

```bash
# Iniciar os containers
docker-compose up

# Acessar as aplicações
# App1: http://localhost:5001
# App2: http://localhost:5002
```

### Comandos Úteis

```bash
# Executar comandos dentro do container
docker-compose exec prime-repo pnpm <comando>

# Exemplo: adicionar uma dependência
docker-compose exec prime-repo pnpm add <pacote> --filter <workspace>

# Ver logs
docker-compose logs -f

# Parar os containers
docker-compose down

# Parar e remover volumes (limpar tudo)
docker-compose down -v

# Rebuild completo
docker-compose down -v && docker-compose up --build
```

### Desenvolvimento Local (Sem Docker)

Se preferir rodar localmente:

```bash
# Instalar pnpm globalmente (se não tiver)
npm install -g pnpm@9.14.4

# Instalar dependências
pnpm install

# Rodar em modo desenvolvimento
pnpm dev

# Build de produção
pnpm build
```

## Features

- ✅ Hot Module Replacement (HMR) funcionando no Docker
- ✅ Tailwind CSS v4
- ✅ PrimeReact com plugin Tailwind
- ✅ Componentes UI compartilhados
- ✅ Painel base para aplicações
- ✅ TypeScript strict mode
- ✅ 2 Aplicações exemplo completas

## Aplicações

### App1 (porta 5001)
- Dashboard com cards de métricas
- Gerenciamento de usuários com formulários
- Configurações

### App2 (porta 5002)
- Home com introdução
- Produtos com planos
- Sobre

## Troubleshooting

### Erro: "Failed to resolve entry for package"

Este erro acontece quando os packages não foram buildados. O Dockerfile já resolve isso automaticamente, mas se rodar localmente:

```bash
# Build os packages primeiro
pnpm --filter @prime-repo/ui build
pnpm --filter @prime-repo/panel build

# Depois rode o dev
pnpm dev
```

### Erro: "pnpm-lock.yaml is absent"

Na primeira execução, o Docker vai gerar o `pnpm-lock.yaml`. Se der erro, rode:

```bash
docker-compose down -v
docker-compose up --build
```

### HMR não está funcionando

Certifique-se que as portas 5001 e 5002 estão livres:

```bash
# No Linux/Mac
lsof -i :5001
lsof -i :5002

# Parar o container e iniciar novamente
docker-compose restart
```

### Mudanças no código não aparecem

O Docker está configurado com volumes para hot reload. Se não funcionar:

1. Verifique se salvou o arquivo
2. Aguarde alguns segundos (o polling está em 1000ms)
3. Veja os logs: `docker-compose logs -f`