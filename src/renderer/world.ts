import { ComponentConstructor, World as ECSYWorld } from 'ecsy'
import { SceneSystem, RendererSystem, CleanupSystem, CameraSystem, RenderSystem, GridSystem, GridMeshSystem, InteractionSystem } from '@/systems'
import * as EntityFactory from '@/entities'
import * as EngineComponents from '@/components'
import * as TagComponents from '@/components/tags'
import * as CameraComponents from '@/components/camera'
import * as GridComponents from '@/components/grid'

export class World {
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly world = new ECSYWorld()
  ) {
    this.registerComponents()
    this.registerSystems()
    this.registerEntities()
  }

  private registerComponentBatch = (Ctor: ComponentConstructor<any>) => this.world.registerComponent(Ctor)

  private registerComponents() {
    console.log('Registering components...')

    console.log('Registering tag components...')
    Object.values(TagComponents).forEach(this.registerComponentBatch)

    console.log('Registering engine components...')
    Object.values(EngineComponents).forEach(this.registerComponentBatch)

    console.log('Registering camera components...')
    Object.values(CameraComponents).forEach(this.registerComponentBatch)

    console.log('Registering grid components...')
    Object.values(GridComponents).forEach(this.registerComponentBatch)

    console.log('Components registered!')
  }

  private registerEntities() {
    console.log('Registering general entities...')
    EntityFactory.scene(this.world)
    EntityFactory.renderer(this.world, this.canvas)
    EntityFactory.camera(this.world)
    EntityFactory.grid(this.world)
    console.log('Entities registered!')
  }

  private registerSystems() {
    console.log('Registering systems...')
    this.world.registerSystem(RendererSystem)
    this.world.registerSystem(SceneSystem)
    this.world.registerSystem(CameraSystem)
    
    this.world.registerSystem(GridSystem)
    this.world.registerSystem(GridMeshSystem)

    this.world.registerSystem(InteractionSystem)
    
    this.world.registerSystem(RenderSystem)

    this.world.registerSystem(CleanupSystem)

    console.log('Systems registered!')
  }

  public start(): void {
    const animate = () => {
      requestAnimationFrame(animate)
      this.world.execute(1 / 60)
    }

    animate()
  }
}
