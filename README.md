# DC-G - Electron Application

## Índice

### 🚀 Guias
- [Setup Inicial](./docs/setup.md) - Configuração do ambiente de desenvolvimento
- [Getting Started](./docs/getting-started.md) - Como rodar e testar a aplicação
- [Guia de Documentação](./docs/documentation-guide.md) - Como criar e manter documentações
- [Dependências](./docs/dependencies.md) - Responsabilidades de cada ferramenta do ecossistema


## 🎯 Visão Geral

DC-G é uma aplicação Electron construída com TypeScript e Vite, seguindo as melhores práticas de desenvolvimento moderno.

### Stack Principal
- **Runtime**: Electron 40.1.0
- **Linguagem**: TypeScript
- **Build Tool**: Vite
- **Bundler**: Electron Forge
- **Linting**: ESLint + Prettier

### Estrutura Básica
```
dc-g/
├── src/
│   ├── main.ts          # Processo principal
│   ├── preload.ts       # Script de preload
│   ├── renderer.ts      # Processo renderer
│   └── index.css        # Estilos globais
├── docs/                # Documentação detalhada
├── vite.*.config.ts     # Configurações Vite
└── forge.config.ts      # Configuração Electron Forge
```

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm start
```

### Build
```bash
npm run make
```

---

**Última atualização**: 2026-02-05  
**Versão**: 1.0.0  
**Autor**: dmont

Para informações detalhadas, consulte os documentos específicos na pasta `docs/`.
