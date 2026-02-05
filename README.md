# DC-G - Electron Application

## Índice

### 🚀 Guias
- [Setup Inicial](./docs/setup.md) - Configuração do ambiente de desenvolvimento
- [Getting Started](./docs/getting-started.md) - Como rodar e testar a aplicação
- [Guia de Documentação](./docs/documentation-guide.md) - Como criar e manter documentações
- [Dependências](./docs/dependencies.md) - Responsabilidades de cada ferramenta do ecossistema
- [Estrutura do Projeto](./docs/project-structure.md) - Organização detalhada de diretórios e arquivos
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

### Estrutura Recomendada
```
dc-g/
├── src/
│   ├── main/                 # Processo Principal (Node.js)
│   │   └── main.ts          # Entrada do Electron
│   ├── renderer/             # Processo de Renderização
│   │   ├── index.html        # Ponto de entrada HTML
│   │   ├── index.ts          # Inicialização do app
│   │   ├── index.css         # Estilos globais
│   │   ├── core/             # Engine 3D (ECSY + Three.js)
│   │   │   ├── world.ts      # Mundo ECSY
│   │   │   └── engine.ts     # Configuração Three.js
│   │   ├── components/       # Componentes ECSY
│   │   ├── systems/          # Sistemas ECSY
│   │   └── assets/           # Assets 3D
│   ├── preload/              # Script de preload
│   │   └── preload.ts
│   └── shared/               # Código compartilhado
├── docs/                     # Documentação detalhada
├── assets/                   # Ícones e recursos estáticos
└── configs/                  # Arquivos de configuração
```

> **Nota**: O projeto está em transição da estrutura atual para a recomendada. Veja [Estrutura do Projeto](./docs/project-structure.md) para detalhes completos.

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
