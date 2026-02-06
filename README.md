# DC-G - Hexagonal 3D Engine

[![Powered by Windsurf](https://img.shields.io/badge/Powered%20by-Windsurf-blue?style=flat-square&logo=windsurf)](https://windsurf.dev)
[![AI Assistant](https://img.shields.io/badge/AI%20Assistant-SWE--1.5-green?style=flat-square)](https://github.com)

## Índice

### 🚀 Guias
- [Setup Inicial](./docs/setup.md) - Configuração do ambiente de desenvolvimento
- [Getting Started](./docs/getting-started.md) - Como rodar e testar a aplicação
- [Guia de Documentação](./docs/documentation-guide.md) - Como criar e manter documentações
- [Dependências](./docs/dependencies.md) - Responsabilidades de cada ferramenta do ecossistema
- [Estrutura do Projeto](./docs/project-structure.md) - Organização detalhada de diretórios e arquivos
- [Arquitetura 3D](./docs/architecture-3d.md) - ECSY + Three.js + Electron integration
- [Gestão de Tiles Hexagonais](./docs/tile-management.md) - Sistema completo de tiles hexagonais


## 🎯 Visão Geral

DC-G é um motor 3D especializado em tiles hexagonais, construído com Electron, TypeScript e integrado com ECSY + Three.js. Desenvolvido com assistência de IA usando Windsurf + SWE-1.5, oferece uma base robusta para jogos e aplicações baseadas em grades hexagonais.

### 🌟 Características Principais
- **Sistema Hexagonal Completo**: Coordenadas cúbicas, vizinhança, distância e anéis
- **Renderização 3D Eficiente**: Integração otimizada Three.js + ECSY
- **Arquitetura ECS**: Componentes e sistemas para máxima flexibilidade
- **Ferramentas de Desenvolvimento**: Build rápido com Vite, TypeScript strict
- **Documentação Abrangente**: Guias completos e exemplos de código

### Stack Principal
- **Runtime**: Electron 40.1.0
- **Linguagem**: TypeScript (strict mode)
- **Build Tool**: Vite (hot reload)
- **Bundler**: Electron Forge
- **3D Engine**: Three.js (WebGL)
- **ECS Framework**: ECSY (Entity Component System)
- **Hexagonal Math**: Sistema de coordenadas cúbicas customizado
- **Linting**: ESLint + Prettier
- **AI Development**: Windsurf + SWE-1.5

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
│   │   │   ├── hex/          # Componentes hexagonais
│   │   │   └── core/         # Componentes básicos
│   │   ├── systems/          # Sistemas ECSY
│   │   │   ├── hex/          # Sistemas hexagonais
│   │   │   └── core/         # Sistemas principais
│   │   ├── factories/        # Factory pattern
│   │   ├── utils/           # Utilitários
│   │   │   ├── hex/         # Sistema hexagonal completo
│   │   │   └── core/        # Utilitários gerais
│   │   └── assets/           # Assets 3D
│   ├── preload/              # Script de preload
│   │   └── preload.ts
│   └── shared/               # Código compartilhado
├── docs/                     # Documentação detalhada
├── assets/                   # Ícones e recursos estáticos
└── configs/                  # Arquivos de configuração
```

> **Nota**: O projeto está em transição da estrutura atual para a recomendada. Veja [Estrutura do Projeto](./docs/project-structure.md) para detalhes completos.

## 🎮 Sistema Hexagonal

O DC-G implementa um sistema completo de tiles hexagonais usando coordenadas cúbicas, permitindo:

- **Navegação Eficiente**: Movimento natural em 6 direções
- **Cálculos de Distância**: Algoritmos otimizados para pathfinding
- **Renderização 3D**: Geração automática de geometria hexagonal
- **Iteração de Grid**: Operações em massa sobre grades hexagonais

Para detalhes completos da API e exemplos de uso, consulte [Gestão de Tiles Hexagonais](./docs/tile-management.md).

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

## 🤖 Desenvolvimento com IA

Este projeto é desenvolvido com assistência de IA usando:
- **Windsurf**: IDE com capacidades avançadas de desenvolvimento assistido
- **SWE-1.5**: AI Agent especializado em engenharia de software

### Benefícios
- Desenvolvimento acelerado com sugestões contextuais
- Geração automática de documentação
- Refatoração inteligente e otimizações
- Debug assistido e resolução de problemas

**Última atualização**: 2026-02-06  
**Versão**: 1.1.0  
**Autor**: dmont  
**Powered by**: Windsurf + SWE-1.5

Para informações detalhadas, consulte os documentos específicos na pasta `docs/`.
