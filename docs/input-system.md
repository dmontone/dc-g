# Sistema de Entrada (Input System)

## Visão Geral
O Sistema de Entrada (Input System) é responsável por gerenciar todas as entradas do usuário, incluindo teclado, mouse e scroll. Ele foi implementado usando o ECSY (Entity Component System) e fornece uma interface unificada para acessar o estado dos dispositivos de entrada.

## Componentes

### KeyboardState
Gerencia o estado do teclado, incluindo teclas pressionadas, liberadas e o estado atual das teclas.

### MouseCoord
Armazena as coordenadas atuais do cursor do mouse na tela.

### MouseDelta
Rastreia o movimento do mouse entre os frames.

### MouseButtons
Gerencia o estado dos botões do mouse, incluindo botões pressionados, liberados e o estado atual.

### MouseWheel
Rastreia o movimento da roda de rolagem do mouse.

## Sistemas

### InputSystem
O sistema principal que gerencia a inicialização e limpeza dos estados de entrada.

### InputTestSystem
Um sistema de depuração que exibe o estado atual das entradas em uma sobreposição na tela.

## Como Usar

### Inicialização
```typescript
import { World } from 'ecsy'
import { InputSystem, InputTestSystem } from '@/systems'

const world = new World()
world.registerSystem(InputSystem)
// Opcional: Adicione o InputTestSystem para depuração
world.registerSystem(InputTestSystem)
```

### Acessando Estados de Entrada
```typescript
// Em qualquer sistema que herde de System
execute() {
  // Obter estado do teclado
  const keyboardState = this.getKeyboardState()
  if (keyboardState?.isKeyDown('KeyW')) {
    // Lógica para movimento para frente
  }

  // Obter posição do mouse
  const mouseCoord = this.getMouseCoord()
  console.log(`Mouse position: (${mouseCoord?.x}, ${mouseCoord?.y})`)
}
```

### Testando Entradas
O `InputTestSystem` fornece uma sobreposição que mostra o estado atual das entradas. Basta adicioná-lo ao mundo e você verá um painel no canto superior esquerdo da tela mostrando:
- Teclas pressionadas/liberadas
- Posição e movimento do mouse
- Estado dos botões do mouse
- Movimento da roda de rolagem

## Boas Práticas
1. Sempre verifique se o componente existe antes de acessá-lo
2. Use `justPressed`/`justReleased` para detectar eventos de um único toque
3. Para movimentos suaves, use o estado atual das teclas/controles
4. Use o `InputTestSystem` durante o desenvolvimento para depuração

## Limitações
- Atualmente suporta apenas um dispositivo de cada tipo (teclado, mouse)
- A entrada tátil não está implementada
- O mapeamento de teclas é baseado em códigos de tecla físicos, não em layouts de teclado específicos

## Próximos Passos
- [ ] Adicionar suporte a múltiplos dispositivos
- [ ] Implementar sistema de mapeamento de controles
- [ ] Adicionar suporte a gamepads
- [ ] Implementar sistema de entrada tátil para dispositivos móveis
