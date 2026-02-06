import { World as ECSYWorld } from 'ecsy'
import { Engine } from './engine'
import { RenderSystem, TransformSystem, HexGridSystem, HexMeshSystem } from '@/systems'
import { Object3D, Visible, Position, Rotation, Scale, Color, Dirty } from '@/components'
import { HexTile, HexGrid, HexMesh } from '@/components/hex'

export class World {
  public readonly ecsyWorld: ECSYWorld = new ECSYWorld()
  public readonly engine: Engine

  constructor(engine: Engine) {
    this.engine = engine

    this.registerComponents()
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
    
    this.ecsyWorld.registerComponent(HexTile)
    this.ecsyWorld.registerComponent(HexGrid)
    this.ecsyWorld.registerComponent(HexMesh)
  }

  private registerSystems(): void {
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
