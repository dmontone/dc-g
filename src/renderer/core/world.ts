import { World as ECSYWorld } from 'ecsy'
import { Engine } from './engine'
import { RenderSystem, TransformSystem, InputSystem, InputTestSystem, HexGridSystem, HexMeshSystem } from '@/systems'
import { Object3D, Visible, Position, Rotation, Scale, Color, Dirty } from '@/components'
import { KeyboardState, MouseCoord, MouseDelta, MouseButtons, MouseWheel } from '@/components/input'
import { HexTile, HexGrid, HexMesh } from '@/components/hex'

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
    this.ecsyWorld.registerComponent(Object3D)
    this.ecsyWorld.registerComponent(Visible)
    this.ecsyWorld.registerComponent(Position)
    this.ecsyWorld.registerComponent(Rotation)
    this.ecsyWorld.registerComponent(Scale)
    this.ecsyWorld.registerComponent(Color)
    this.ecsyWorld.registerComponent(Dirty)
    
    this.ecsyWorld.registerComponent(KeyboardState)
    this.ecsyWorld.registerComponent(MouseCoord)
    this.ecsyWorld.registerComponent(MouseDelta)
    this.ecsyWorld.registerComponent(MouseButtons)
    this.ecsyWorld.registerComponent(MouseWheel)
    
    this.ecsyWorld.registerComponent(HexTile)
    this.ecsyWorld.registerComponent(HexGrid)
    this.ecsyWorld.registerComponent(HexMesh)
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
    this.ecsyWorld.registerSystem(InputSystem)
    this.ecsyWorld.registerSystem(InputTestSystem)
    this.ecsyWorld.registerSystem(RenderSystem)
    this.ecsyWorld.registerSystem(TransformSystem)
    
    this.ecsyWorld.registerSystem(HexGridSystem)
    this.ecsyWorld.registerSystem(HexMeshSystem)
    
    this.ecsyWorld.execute(0)

    const renderSystem = this.ecsyWorld.getSystem(RenderSystem)
    if (renderSystem) renderSystem.setScene(this.engine.container)
    
    const hexMeshSystem = this.ecsyWorld.getSystem(HexMeshSystem)
    if (hexMeshSystem) hexMeshSystem.setScene(this.engine.container)
  }

  public start(): void {
    this.initializeHexGrid()
    
    const animate = () => {
      requestAnimationFrame(animate)
      this.ecsyWorld.execute(1 / 60)
      this.engine.render()
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
