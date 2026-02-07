# Sistema de Câmera

## Visão Geral
O sistema de câmera é implementado usando o padrão ECS (Entity-Component-System) e fornece uma maneira flexível de gerenciar câmeras 3D no jogo. O sistema é construído em cima do THREE.js e é integrado ao ECSY. **Configurado para OrthographicCamera (estilo League of Legends)**.

## Componentes

### CameraComponent
```typescript
{
  left: number;     // Plano esquerdo do frustum
  right: number;    // Plano direito do frustum
  top: number;      // Plano superior do frustum
  bottom: number;   // Plano inferior do frustum
  near: number;     // Plano de recorte próximo
  far: number;      // Plano de recorte distante
  zoom: number;     // Nível de zoom
  instance?: THREE.OrthographicCamera; // Instância THREE.js interna
}
```

### CameraTarget
```typescript
{
  value: THREE.Vector3; // Ponto para onde a câmera está olhando
}
```

## Sistema

### CameraSystem
O `CameraSystem` é responsável por:
1. Gerenciar o ciclo de vida da câmera
2. Atualizar as propriedades da câmera quando os componentes mudam
3. Lidar com o redimensionamento da janela
4. Manter a instância do THREE.OrthographicCamera sincronizada com os componentes ECS

## Uso

### Criando uma câmera
```typescript
const cameraEntity = world.createEntity()
  .addComponent(Position, { value: new THREE.Vector3(8, 20, 8) })
  .addComponent(CameraTarget, { value: new THREE.Vector3(0, 0, 0) })
  .addComponent(CameraComponent, {
    left: -20,
    right: 20,
    top: 15,
    bottom: -15,
    near: 1,
    far: 2000,
    zoom: 1
  });
```

### Movendo a câmera
```typescript
// Obter a entidade da câmera
const cameraEntity = world.getSystem(CameraSystem)?.queries.cameras.results[0];

// Mover a câmera
const position = cameraEntity.getMutableComponent(Position);
position.value.set(10, 10, 15);

// Mudar o alvo da câmera
const target = cameraEntity.getMutableComponent(CameraTarget);
target.value.set(5, 0, 0);
```

### Acessando a câmera ativa
```typescript
// Obter a entidade da câmera ativa
const cameraEntity = world.getSystem(CameraSystem)?.queries.cameras.results[0];

if (cameraEntity) {
  const cameraComponent = cameraEntity.getComponent(CameraComponent);
  const activeCamera = cameraComponent?.instance;
  
  if (activeCamera) {
    // Usar a câmera ativa
    renderer.render(scene, activeCamera);
  }
}
```

## Boas Práticas

1. **Sempre use os componentes** para modificar a posição e o alvo da câmera, em vez de modificar diretamente a instância do THREE.OrthographicCamera.

2. **Use o CameraSystem** para acessar a câmera ativa em vez de acessar diretamente a entidade da câmera.

3. **O redimensionamento da janela** é automático. O `CameraSystem` já inclui um `ResizeObserver` que ajusta o frustum baseado no aspect ratio.

4. **Evite múltiplas câmeras ativas** - O sistema foi projetado para ter apenas uma câmera ativa por vez.

## Limitações Conhecidas

- O sistema atualmente suporta apenas câmeras do tipo `OrthographicCamera`.
- Não há suporte nativo para transições suaves entre posições/alvos da câmera (deve ser implementado em um sistema separado).

## Exemplo Completo

```typescript
// Criar o mundo
const world = new World();

// Registrar componentes e sistemas
world.registerComponent(Position);
world.registerComponent(CameraComponent);
world.registerComponent(CameraTarget);
world.registerSystem(CameraSystem);

// Criar a câmera
const cameraEntity = world.createEntity()
  .addComponent(Position, { value: new THREE.Vector3(8, 20, 8) })
  .addComponent(CameraTarget, { value: new THREE.Vector3(0, 0, 0) })
  .addComponent(CameraComponent, {
    left: -20,
    right: 20,
    top: 15,
    bottom: -15,
    near: 1,
    far: 2000,
    zoom: 1
  });

// No loop de renderização
function animate() {
  requestAnimationFrame(animate);
  
  // Atualizar o mundo ECS
  world.execute(1/60);
  
  // Obter a câmera ativa e renderizar
  const cameraEntity = world.getSystem(CameraSystem)?.queries.cameras.results[0];
  const cameraComponent = cameraEntity?.getComponent(CameraComponent);
  const camera = cameraComponent?.instance;
  
  if (camera) {
    renderer.render(scene, camera);
  }
}
```
