# DC-G - Electron Application

## Índice

### 🚀 Guias
- [Setup Inicial](./docs/setup.md) - Configuração do ambiente de desenvolvimento
- [Getting Started](./docs/getting-started.md) - Como rodar e testar a aplicação
- [Guia de Documentação](./docs/documentation-guide.md) - Como criar e manter documentações
- [Dependências](./docs/dependencies.md) - Responsabilidades de cada ferramenta do ecossistema
- [Arquitetura 3D](./docs/architecture-3d.md) - ECSY + Three.js + Electron integration


## 🎯 Visão Geral

DC-G é uma aplicação Electron construída com TypeScript e Vite, seguindo as melhores práticas de desenvolvimento moderno.

### Stack Principal
- **Runtime**: Electron 40.1.0
- **Linguagem**: TypeScript
- **Build Tool**: Vite
- **Bundler**: Electron Forge
- **3D Engine**: Three.js
- **ECS Framework**: ECSY
- **Linting**: ESLint + Prettier

### Estrutura Básica
```
dc-g/
├── src/
│   ├── main.ts          # Processo principal
│   ├── preload.ts       # Script de preload
│   ├── renderer.ts      # Processo renderer
│   ├── index.css        # Estilos globais
│   └── 3d/             # Sistema 3D ECSY + Three.js
│       ├── World.ts     # Mundo principal
│       ├── components/  # Componentes ECSY
│       ├── systems/     # Sistemas ECSY
│       ├── utils/       # Utilitários 3D
│       └── assets/      # Assets 3D
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
