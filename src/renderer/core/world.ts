import { World as ECSYWorld } from 'ecsy'
import { Engine } from './engine'
import { RenderSystem, TransformSystem, InputSystem, InputTestSystem, HexGridSystem, HexMeshSystem, CameraSystem } from '@/systems'
import { Object3D, Visible, Position, Rotation, Scale, Color, Dirty } from '@/components'
import { KeyboardState, MouseCoord, MouseDelta, MouseButtons } from '@/components/input'
import { HexTile, HexGrid, HexMesh } from '@/components/hex'
import { CameraComponent, CameraTarget } from '@/components/camera'
import { HexGridFactory, InputFactory, CameraFactory } from '@/factories'

export class World {
  public readonly ecsyWorld: ECSYWorld = new ECSYWorld()
  public readonly engine: Engine

  constructor(engine: Engine) {
    this.engine = engine

    this.registerComponents()
    this.registerEntities()
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

    this.ecsyWorld.registerComponent(HexTile)
    this.ecsyWorld.registerComponent(HexGrid)
    this.ecsyWorld.registerComponent(HexMesh)

    this.ecsyWorld.registerComponent(CameraComponent)
    this.ecsyWorld.registerComponent(CameraTarget)
  }

  private registerSystems(): void {
    this.ecsyWorld.registerSystem(InputSystem)
    this.ecsyWorld.registerSystem(InputTestSystem)

    this.ecsyWorld.registerSystem(CameraSystem)

    this.ecsyWorld.registerSystem(RenderSystem)
    this.ecsyWorld.registerSystem(TransformSystem)

    this.ecsyWorld.registerSystem(HexGridSystem)
    this.ecsyWorld.registerSystem(HexMeshSystem)

    const renderSystem = this.ecsyWorld.getSystem(RenderSystem)
    if (renderSystem) renderSystem.setScene(this.engine.container)

    const hexMeshSystem = this.ecsyWorld.getSystem(HexMeshSystem)
    if (hexMeshSystem) hexMeshSystem.setScene(this.engine.container)
  }

  private registerEntities(): void {
    new InputFactory(this.ecsyWorld, this.engine.scene)
    new CameraFactory(this.ecsyWorld, this.engine.scene)
    new HexGridFactory(this.ecsyWorld, this.engine.scene)
  }

  public start(): void {
    const animate = () => {
      requestAnimationFrame(animate)
      this.ecsyWorld.execute(1 / 60)

      const cameraComp = this.ecsyWorld.getSystem(CameraSystem)?.queries.cameras.results[0]?.getComponent(CameraComponent)
      if (cameraComp?.instance) this.engine.render(cameraComp.instance)
    }

    animate()
  }

  public stop(): void {}

  public dispose(): void {
    this.engine.dispose()
  }
}
