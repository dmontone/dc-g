import { World as ECSYWorld } from 'ecsy'
import * as THREE from 'three'
import { Engine } from './engine'
import { RenderSystem, TransformSystem, InputSystem, InputTestSystem, HexGridSystem, HexMeshSystem, CameraSystem } from '@/systems'
import { Object3D, Visible, Position, Rotation, Scale, Color, Dirty } from '@/components'
import { KeyboardState, MouseCoord, MouseDelta, MouseButtons, MouseWheel } from '@/components/input'
import { HexTile, HexGrid, HexMesh } from '@/components/hex'
import { CameraComponent, CameraTarget } from '@/components/camera'

export class World {
  public readonly ecsyWorld: ECSYWorld = new ECSYWorld()
  public readonly engine: Engine

  constructor(engine: Engine) {
    this.engine = engine

    this.registerComponents()
    this.initializeInputEntities()
    this.registerSystems()
  }

  private registerComponents(): void {
    // Componentes básicos
    this.ecsyWorld.registerComponent(Object3D)
    this.ecsyWorld.registerComponent(Visible)
    this.ecsyWorld.registerComponent(Position)
    this.ecsyWorld.registerComponent(Rotation)
    this.ecsyWorld.registerComponent(Scale)
    this.ecsyWorld.registerComponent(Color)
    this.ecsyWorld.registerComponent(Dirty)

    // Componentes de input
    this.ecsyWorld.registerComponent(KeyboardState)
    this.ecsyWorld.registerComponent(MouseCoord)
    this.ecsyWorld.registerComponent(MouseDelta)
    this.ecsyWorld.registerComponent(MouseButtons)
    this.ecsyWorld.registerComponent(MouseWheel)

    // Componentes de hexágono
    this.ecsyWorld.registerComponent(HexTile)
    this.ecsyWorld.registerComponent(HexGrid)
    this.ecsyWorld.registerComponent(HexMesh)

    // Componente de câmera
    this.ecsyWorld.registerComponent(CameraComponent)
    this.ecsyWorld.registerComponent(CameraTarget)
  }

  private initializeInputEntities(): void {
    const inputEntity = this.ecsyWorld.createEntity()
    inputEntity.addComponent(KeyboardState)
    inputEntity.addComponent(MouseCoord)
    inputEntity.addComponent(MouseDelta)
    inputEntity.addComponent(MouseButtons)
    inputEntity.addComponent(MouseWheel)

    this.ecsyWorld.execute(0)

    const keyboardState = inputEntity.getMutableComponent(KeyboardState)!
    keyboardState.keys = new Map<string, boolean>()
    keyboardState.justPressed = new Set<string>()
    keyboardState.justReleased = new Set<string>()

    const mouseCoord = inputEntity.getMutableComponent(MouseCoord)!
    mouseCoord.x = 0
    mouseCoord.y = 0

    const mouseDelta = inputEntity.getMutableComponent(MouseDelta)!
    mouseDelta.x = 0
    mouseDelta.y = 0

    const mouseButtons = inputEntity.getMutableComponent(MouseButtons)!
    mouseButtons.buttons = new Map<number, boolean>()
    mouseButtons.justPressed = new Set<number>()
    mouseButtons.justReleased = new Set<number>()

    const mouseWheel = inputEntity.getMutableComponent(MouseWheel)!
    mouseWheel.delta = 0
  }

  private registerSystems(): void {
    // Registrar sistemas na ordem de execução desejada
    this.ecsyWorld.registerSystem(InputSystem)
    this.ecsyWorld.registerSystem(InputTestSystem)

    // Sistema de câmera deve ser executado antes do RenderSystem
    this.ecsyWorld.registerSystem(CameraSystem)

    // Sistemas de renderização e transformação
    this.ecsyWorld.registerSystem(RenderSystem)
    this.ecsyWorld.registerSystem(TransformSystem)

    // Sistemas específicos do jogo
    this.ecsyWorld.registerSystem(HexGridSystem)
    this.ecsyWorld.registerSystem(HexMeshSystem)

    // Executar uma vez para inicialização
    this.ecsyWorld.execute(0)

    // Configurar sistemas que precisam de referências adicionais
    const renderSystem = this.ecsyWorld.getSystem(RenderSystem)
    if (renderSystem) renderSystem.setScene(this.engine.container)

    const hexMeshSystem = this.ecsyWorld.getSystem(HexMeshSystem)
    if (hexMeshSystem) hexMeshSystem.setScene(this.engine.container)

    // Configurar a câmera principal
    this.setupMainCamera()
  }

  /**
   * Configura a câmera principal do jogo
   */
  private setupMainCamera(): void {
    const cameraEntity = this.ecsyWorld.createEntity()

    const cameraContainer = new THREE.Object3D()
    this.engine.container.add(cameraContainer)

    cameraContainer.position.set(5, 5, 10)
    cameraContainer.lookAt(0, 0, 0)

    cameraEntity
      .addComponent(Object3D, { value: cameraContainer })
      .addComponent(CameraComponent, { fov: 75, near: 0.1, far: 1000, zoom: 1, aspect: window.innerWidth / window.innerHeight })
      .addComponent(Position, { value: new THREE.Vector3(5, 5, 10) })
      .addComponent(CameraTarget, { value: new THREE.Vector3(0, 0, 0) })
  }

  public start(): void {
    this.initializeHexGrid()

    const animate = () => {
      requestAnimationFrame(animate)
      this.ecsyWorld.execute(1 / 60)

      // Obter a câmera ativa do ECS
      const cameraEntity = this.ecsyWorld.getSystem(CameraSystem)?.queries.cameras.results[0]
      if (cameraEntity) {
        const cameraComp = cameraEntity.getComponent(CameraComponent)
        if (cameraComp?.instance) {
          this.engine.render(cameraComp.instance)
        }
      }
    }

    animate()
  }

  private initializeHexGrid(): void {
    const gridEntity = this.ecsyWorld.createEntity()
    gridEntity.addComponent(HexGrid, { width: 10, height: 10 })
  }

  public stop(): void {}

  public dispose(): void {
    this.engine.dispose()
  }
}
