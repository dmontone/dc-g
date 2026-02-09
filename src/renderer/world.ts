import { World as ECSYWorld } from 'ecsy'
import { RendererComponent, SceneComponent } from '@/components'
import { SceneSystem, RendererSystem, CleanupSystem } from '@/systems'
import * as EntityFactory from '@/entities'
import { DirtyTag } from '@/components/tags'

export class World {
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly world = new ECSYWorld()
  ) {
    this.registerComponents()
    this.registerSystems()
    this.registerEntities()
  }

  private registerComponents() {
    console.log('Registering tag components...')
    this.world.registerComponent<DirtyTag>(DirtyTag)
    
    console.log('Registering scene components...')
    this.world.registerComponent<SceneComponent>(SceneComponent)
    this.world.registerComponent<RendererComponent>(RendererComponent)

    console.log('Components registered!')
  }
  
  private registerEntities() {
    console.log('Registering general entities...')
    EntityFactory.scene(this.world)
    EntityFactory.renderer(this.world, this.canvas)
    console.log('Entities registered!')
  }
  
  private registerSystems() {
    console.log('Registering systems...')
    this.world.registerSystem(RendererSystem)
    this.world.registerSystem(SceneSystem)

    console.log('Registering cleanup system...')
    this.world.registerSystem(CleanupSystem)
    
    console.log('Systems registered!')
  }



  public start(): void {
      const animate = () => {
        requestAnimationFrame(animate)
        this.world.execute(1 / 60)
  
        // const cameraComp = this.ecsyWorld.getSystem(CameraSystem)?.queries.cameras.results[0]?.getComponent(CameraComponent)
        // if (cameraComp?.instance) this.engine.render(cameraComp.instance)
      }
  
      animate()
    }
}
