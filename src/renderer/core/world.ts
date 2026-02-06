import { World as ECSYWorld } from 'ecsy'
import { Engine } from './engine'
import { RenderSystem, TransformSystem } from '@/systems'
import { Object3D, Visible, Position, Rotation, Scale } from '@/components'

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
  }

  private registerSystems(): void {
    this.ecsyWorld.registerSystem(RenderSystem)
    this.ecsyWorld.registerSystem(TransformSystem)
    this.ecsyWorld.execute(0)

    const renderSystem = this.ecsyWorld.getSystem(RenderSystem)
    if (renderSystem) renderSystem.setScene(this.engine.container)
  }

  public start(): void {
    const animate = () => {
      requestAnimationFrame(animate)
      this.ecsyWorld.execute(1 / 60)
      this.engine.render()
    }

    animate()
  }

  public stop(): void {}

  public dispose(): void {
    this.engine.dispose()
  }
}
