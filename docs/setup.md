# Setup Inicial

## Pré-requisitos

### Node.js
- Versão: 18.0.0 ou superior
- Download: [nodejs.org](https://nodejs.org/)

### Git
- Para controle de versão
- Download: [git-scm.com](https://git-scm.com/)

## Instalação do Projeto

### 1. Clone o repositório
```bash
git clone <repository-url>
cd dc-g
```

### 2. Instale dependências
```bash
npm install
```

### 3. Configure variáveis de ambiente (se necessário)
```bash
# Copie arquivo de exemplo (se existir)
cp .env.example .env
```

## Configuração do Ambiente

### VS Code (Recomendado)
Instale as seguintes extensões:
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

### Configuração do ESLint + Prettier
O projeto já está configurado com:
- `.eslintrc.json` - Regras de linting
- `.prettierrc` - Formatação de código
- `eslint-config-prettier` - Integração ESLint + Prettier

## Verificação da Instalação

### 1. Verifique se tudo está funcionando
```bash
npm start
```

### 2. Verifique linting
```bash
npm run lint
```

### 3. Verifique build
```bash
npm run make
```

## Comandos Úteis

```bash
# Desenvolvimento
npm start              # Inicia aplicação em modo dev
npm run lint           # Verifica código com ESLint
npm run package        # Empacota aplicação
npm run make           # Cria executável
npm run publish        # Publica aplicação

# Formatação
npx prettier --write . # Formata todos os arquivos
```

## Problemas Comuns

### Node.js Version
Se tiver problemas de versão:
```bash
# Verifique sua versão
node --version

# Use nvm para gerenciar versões
nvm use 18
```

### Permissões
Se tiver problemas de permissão no Windows:
```bash
# Execute como administrador ou configure permissões adequadas
```

### Dependências
Se tiver problemas com dependências:
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

## Próximos Passos

Após o setup, consulte:
- [Estrutura do Projeto](./structure.md)
- [Primeiros Passos](./getting-started.md)
- [Guia de Estilo](./style-guide.md)
