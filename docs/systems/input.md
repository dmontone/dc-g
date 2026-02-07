# Sistema de Input

## Visão Geral
Sistema completo para gerenciar entrada do usuário via ECSY. Suporta teclado, mouse e wheel com tipagem forte.

## Componentes

### KeyboardState
Estado das teclas do teclado.
- `keys`: Map<string, boolean> - teclas pressionadas
- `justPressed`: Set<string> - teclas pressionadas neste frame
- `justReleased`: Set<string> - teclas liberadas neste frame

### MouseCoord
Posição atual do mouse.
- `x`, `y`: number - coordenadas na tela

### MouseDelta
Movimento do mouse entre frames.
- `x`, `y`: number - delta de movimento
- `hasMovement`: boolean - se houve movimento

### MouseButtons
Estado dos botões do mouse.
- `buttons`: Map<string, boolean> - botões pressionados
- `justPressed`: Set<string> - botões pressionados neste frame
- `justReleased`: Set<string> - botões liberados neste frame

## Sistema Principal

### InputSystem
Gerencia todos os eventos de input e atualiza os componentes.

### InputTestSystem
Overlay de debug que mostra estado atual do input em tempo real.

## Uso Básico

```typescript
// Em qualquer sistema
execute() {
  const keyboard = this.getKeyboardState()
  if (keyboard?.keys.get('KeyW')) {
    // Tecla W pressionada
  }
  
  const mouse = this.getMouseCoord()
  console.log(`Mouse: (${mouse?.x}, ${mouse?.y})`)
}
```

## Inicialização

```typescript
world.registerSystem(InputSystem)
world.registerSystem(InputTestSystem) // Opcional, para debug
```

---

**Última atualização**: 2026-02-07
