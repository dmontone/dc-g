# Arquitetura DC-G

## Visão Geral
Arquitetura 3D combinando ECSY + Three.js + Electron com separação clara de responsabilidades.

## Separação de Processos

### Main Process (Node.js)
- **Responsabilidades**: Sistema operacional, janelas, arquivos, IPC
- **Limitações**: Sem acesso direto ao WebGL ou Three.js
- **Comunicação**: Apenas eventos de alto nível via IPC

### Renderer Process (Chromium)  
- **Responsabilidades**: Renderização 3D, UI, loop do jogo
- **Tecnologias**: Three.js e ECSY rodam inteiramente aqui
- **Canvas**: Elemento HTML para renderização WebGL

## Estrutura de Diretórios

### Organização por Tipo

#### `src/main/` - Processo Principal
Contém código Node.js para infraestrutura Electron.

#### `src/renderer/` - Processo de Renderização
Contém toda a lógica 3D e UI:
- `core/` - Engine e configuração
- `components/` - Componentes ECSY
- `systems/` - Sistemas ECSY
- `factories/` - Criação de entidades
- `utils/` - Utilitários

#### `src/preload/` - Script de Ponte
Segurança entre processos Main e Renderer.

#### `src/shared/` - Código Compartilhado
Tipos e constantes usados por múltiplos processos.

## Loop ECSY + Three.js

### Fluxo Principal
1. `requestAnimationFrame` → ECSY World.execute
2. Sistemas processam entidades (Input, Camera, Render, Transform, Hex, etc.)
3. RenderSystem configura cena Three.js
4. Engine.render() renderiza com câmera ativa
5. Próximo frame

### Sincronização
- **ECSY**: Gerencia estado (dados) através de componentes
- **Three.js**: Gerencia visualização (objetos) através da engine
- **Sistemas**: Fazem a ponte entre os dois
- **RenderSystem**: Configura cena Three.js para renderização
- **TransformSystem**: Sincroniza transformações ECSY → Three.js

## Organização de Código

### Tipos e Constantes
- **Arquivos `[filename].types.ts`**: Definições TypeScript compartilhadas
- **Arquivos `[filename].constants.ts`**: Valores de configuração centralizados

### Padrão de Organização
- **Separação clara**: Tipos, constantes e configurações em arquivos dedicados
- **Nomenclatura consistente**: Sufixos `.types.ts` e `.constants.ts`
- **Escopo definido**: Constantes globais vs específicas de módulo

## Comunicação IPC

### Correto
```typescript
window.electronAPI.onWindowEvent(callback)
window.electronAPI.loadAsset(path)
```

### Incorreto
```typescript
// Não enviar geometrias ou texturas via IPC
```

---

**Última atualização**: 2026-02-07
