# Sistema de Câmera

## Visão Geral
O sistema de câmera é implementado usando o padrão ECS (Entity-Component-System) e fornece uma maneira flexível de gerenciar câmeras 3D no jogo. O sistema é construído em cima do THREE.js e é integrado ao ECSY.

## Componentes

### CameraComponent
```typescript
{
  fov: number;      // Campo de visão em graus
  aspect: number;   // Proporção da tela (largura/altura)
  near: number;     // Plano de recorte próximo
  far: number;      // Plano de recorte distante
  zoom: number;     // Nível de zoom
  instance?: THREE.PerspectiveCamera; // Instância THREE.js interna
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
4. Manter a instância do THREE.PerspectiveCamera sincronizada com os componentes ECS

## Uso

### Criando uma câmera
```typescript
const cameraEntity = world.createEntity()
  .addComponent(Position, { value: new THREE.Vector3(5, 5, 10) })
  .addComponent(CameraTarget, { value: new THREE.Vector3(0, 0, 0) })
  .addComponent(CameraComponent, {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
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
const activeCamera = CameraManager.getActiveCamera();
if (activeCamera) {
  // Usar a câmera ativa
  renderer.render(scene, activeCamera);
}
```

## Gerenciamento de Estado

### CameraManager
O `CameraManager` é um singleton que fornece acesso global à câmera ativa e notifica os ouvintes quando a câmera ativa muda.

```typescript
// Adicionar um listener para mudanças na câmera ativa
const unsubscribe = CameraManager.onCameraChanged((camera) => {
  console.log('Câmera ativa mudou:', camera);
});

// Remover o listener quando não for mais necessário
unsubscribe();
```

## Boas Práticas

1. **Sempre use os componentes** para modificar a posição e o alvo da câmera, em vez de modificar diretamente a instância do THREE.PerspectiveCamera.

2. **Use o CameraManager** para acessar a câmera ativa em vez de acessar diretamente a entidade da câmera.

3. **Atualize o aspect ratio** quando a janela for redimensionada. O `CameraSystem` já inclui um `ResizeObserver` para isso.

4. **Evite múltiplas câmeras ativas** - O sistema foi projetado para ter apenas uma câmera ativa por vez.

## Limitações Conhecidas

- O sistema atualmente suporta apenas câmeras do tipo `PerspectiveCamera`.
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
  .addComponent(Position, { value: new THREE.Vector3(5, 5, 10) })
  .addComponent(CameraTarget, { value: new THREE.Vector3(0, 0, 0) })
  .addComponent(CameraComponent, {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    zoom: 1
  });

// No loop de renderização
function animate() {
  requestAnimationFrame(animate);
  
  // Atualizar o mundo ECS
  world.execute(1/60);
  
  // Obter a câmera ativa e renderizar
  const camera = CameraManager.getActiveCamera();
  if (camera) {
    renderer.render(scene, camera);
  }
}
```
