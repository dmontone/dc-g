# DC-G Renderer Code

## Overview
Complete inline code from src/renderer directory (excluding files starting with _).

## Entry Point

### index.ts
```typescript
import { World } from './world'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) return

  console.log('Creating world...')

  const world = new World(canvas)
  world.start()
})
```

### world.ts
```typescript
import { ComponentConstructor, World as ECSYWorld } from 'ecsy'
import { SceneSystem, RendererSystem, CleanupSystem, CameraSystem, RenderSystem, GridSystem } from '@/systems'
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
    this.world.registerSystem(RenderSystem)

    console.log('Registering grid system...')
    this.world.registerSystem(GridSystem)

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
```

## Components

### components/index.ts
```typescript
export * from './renderer'
export * from './scene'
```

### components/scene.ts
```typescript
import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class SceneComponent extends Component<SceneComponent> {
  static schema = { value: { type: Types.Ref } }
  value!: THREE.Scene
}
```

### components/renderer.ts
```typescript
import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class RendererComponent extends Component<RendererComponent> {
  static schema = {
    renderer: { type: Types.Ref },
    canvas: { type: Types.Ref }
  }
  
  renderer!: THREE.WebGLRenderer
  canvas!: HTMLCanvasElement
}
```

### components/camera/index.ts
```typescript
export * from './config-ortographic'
export * from './instance'
export * from './position'
export * from './target'
```

### components/camera/config-ortographic.ts
```typescript
import { Component, Types } from 'ecsy'

export class OrthographicConfig extends Component<OrthographicConfig> {
  static schema = {
    viewSize: { type: Types.Number, default: 20 },
    near: { type: Types.Number, default: 0.1 },
    far: { type: Types.Number, default: 2000 },
    zoom: { type: Types.Number, default: 1 }
  }

  viewSize: number = 20
  near: number = 0.1
  far: number = 2000
  zoom: number = 1
}
```

### components/camera/instance.ts
```typescript
import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class CameraInstanceComponent extends Component<CameraInstanceComponent> {
  static schema = { value: { type: Types.Ref } }
  value!: THREE.OrthographicCamera
}
```

### components/camera/position.ts
```typescript
import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class CameraPositionComponent extends Component<CameraPositionComponent> {
  static schema = { value: { type: Types.Ref, default: new THREE.Vector3(0, 0, 0) } }
  value: THREE.Vector3 = new THREE.Vector3(5, 5, 10)
}
```

### components/camera/target.ts
```typescript
import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class CameraTargetComponent extends Component<CameraTargetComponent> {
  static schema = { value: { type: Types.Ref, default: new THREE.Vector3(0, 0, 0) } }
  value: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
}
```

### components/grid/index.ts
```typescript
export * from './grid'
```

### components/grid/grid.ts
```typescript
import { Component, Types } from 'ecsy'

export class GridComponent extends Component<GridComponent> {
  static schema = {
    radius: { type: Types.Number },
    tiles: { type: Types.Ref } 
  }

  radius!: number
  tiles!: Uint32Array
}
```

### components/grid/coordinate.ts
```typescript
import { Component, Types } from 'ecsy'

export class GridCoordinateComponent extends Component<GridCoordinateComponent> {
  static schema = {
    q: { type: Types.Number },
    r: { type: Types.Number }
  }

  q!: number
  r!: number
}
```

## Tag Components

### components/tags/index.ts
```typescript
export * from './camera'
export * from './dirty'
export * from './grid'
export * from './renderer'
export * from './scene'
```

### components/tags/camera.ts
```typescript
import { TagComponent } from 'ecsy'

export class CameraTag extends TagComponent {}
```

### components/tags/dirty.ts
```typescript
import { TagComponent } from 'ecsy'

export class DirtyTag extends TagComponent {}
```

### components/tags/grid.ts
```typescript
import { TagComponent } from 'ecsy'

export class GridTag extends TagComponent {}
```

### components/tags/renderer.ts
```typescript
import { TagComponent } from 'ecsy'

export class RendererTag extends TagComponent {}
```

### components/tags/scene.ts
```typescript
import { TagComponent } from 'ecsy'

export class SceneTag extends TagComponent {}
```

### components/tags/grid-tile.ts
```typescript
import { TagComponent } from 'ecsy'

export class GridTileTag extends TagComponent {}
```

## Entities

### entities/index.ts
```typescript
export * from './camera'
export * from './grid'
export * from './gird-tiles'
export * from './renderer'
export * from './scene'
```

### entities/scene.ts
```typescript
import { World as ECSYWorld } from 'ecsy'
import { SceneComponent } from '@/components'
import { SceneTag } from '@/components/tags'

export const scene = (w: ECSYWorld) =>
  w.createEntity()
    .addComponent(SceneComponent)
    .addComponent(SceneTag)
```

### entities/renderer.ts
```typescript
import { World as ECSYWorld } from 'ecsy'
import { RendererComponent } from '@/components'
import { RendererTag } from '@/components/tags'

export const renderer = (w: ECSYWorld, canvas: HTMLCanvasElement) =>
  w.createEntity()
    .addComponent(RendererComponent, { canvas })
    .addComponent(RendererTag)
```

### entities/camera.ts
```typescript
import { World as ECSYWorld } from 'ecsy'
import { CameraTag } from '@/components/tags/camera'
import { CameraInstanceComponent, OrthographicConfig, CameraPositionComponent, CameraTargetComponent } from '@/components/camera'

export const camera = (w: ECSYWorld) =>
  w.createEntity()
    .addComponent(CameraInstanceComponent)
    .addComponent(OrthographicConfig)
    .addComponent(CameraPositionComponent)
    .addComponent(CameraTargetComponent)
    .addComponent(CameraTag)
```

### entities/grid.ts
```typescript
import { World as ECSYWorld } from 'ecsy'
import { GridTag } from '@/components/tags'
import { GridComponent } from '@/components/grid'

export const grid = (w: ECSYWorld) =>
  w.createEntity()
    .addComponent(GridComponent, { radius: 5, size: 1 })
    .addComponent(GridTag)
```

### entities/gird-tiles.ts
```typescript
import { World as ECSYWorld } from 'ecsy'
import { GridTileTag } from '@/components/tags/grid-tile'
import { GridCoordinateComponent } from '@/components/grid/coordinate'

export const tile = (w: ECSYWorld, { q, r, s }: { q: number, r: number, s: number }) =>
  w.createEntity()
    .addComponent(GridCoordinateComponent, { q, r, s })
    .addComponent(GridTileTag)
```

## Systems

### systems/index.ts
```typescript
export * from './camera'
export * from './cleanup'
export * from './grid'
export * from './render'
export * from './renderer'
export * from './scene'
```

### systems/camera.ts
```typescript
import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { DirtyTag, CameraTag } from '@/components/tags'
import { CameraInstanceComponent, OrthographicConfig, CameraPositionComponent, CameraTargetComponent } from '@/components/camera'

export class CameraSystem extends System {
  static queries = {
    new: {
      components: [CameraTag],
      listen: { added: true }
    },
    dirty: { components: [CameraTag, DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.new.added?.forEach(e => this.setup(e))
    this.queries.dirty.results?.forEach(e => this.update(e))
  }

  private setup(entity: Entity): void {
    console.log('[CameraSystem]: setup')
    let instance = entity.getMutableComponent(CameraInstanceComponent)

    const config = entity.getComponent(OrthographicConfig)

    const aspect = window.innerWidth / window.innerHeight
    instance.value = new THREE.OrthographicCamera(
      -config.viewSize * aspect / 2,
       config.viewSize * aspect / 2,
       config.viewSize / 2,
      -config.viewSize / 2,
       config.near,
       config.far
    )

    instance.value.up.set(0, 0, 1)
    instance.value.updateProjectionMatrix()

    entity.addComponent(DirtyTag)
  }

  private update(entity: Entity): void {
    console.log('[CameraSystem]: update')

    let instance = entity.getMutableComponent(CameraInstanceComponent)

    const position = entity.getComponent(CameraPositionComponent).value
    instance.value.position.set(position.x, position.y, position.z)

    const target = entity.getComponent(CameraTargetComponent).value
    instance.value.lookAt(target.x, target.y, target.z)
  }
}
```

### systems/cleanup.ts
```typescript
import { Entity, System } from 'ecsy'
import { DirtyTag } from '@/components/tags'

export class CleanupSystem extends System {
  static queries = {
    dirty: { components: [DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.dirty.results?.forEach(e => {
      this.update(e)
      e.removeComponent(DirtyTag)
    })
  }

  private update(_entity: Entity): void { console.log('[CleanupSystem]: update') }
}
```

### systems/grid.ts
```typescript
import { Entity, System } from 'ecsy'
import { GridComponent } from '@/components/grid'
import { GridTag } from '@/components/tags'

export class GridSystem extends System {
  static queries = {
    grid: { components: [GridTag], listen: { added: true } }
  }

  execute() {
    this.queries.grid.added?.forEach(e => this.setup(e))
  }
  
  private setup(entity: Entity) {
    console.log('[GridSystem]: setup')

    const grid = entity.getMutableComponent(GridComponent)

    const totalTiles = 3 * (grid.radius * grid.radius) + 3 * grid.radius + 1
    grid.tiles = new Uint32Array(totalTiles)

    let i = 0, r1: number, r2: number
    for (let q = -grid.radius; q <= grid.radius; q++) {
      r1 = Math.max(-grid.radius, -q - grid.radius)
      r2 = Math.min(grid.radius, -q + grid.radius)

      for (let r = r1; r <= r2; r++) {
        const s = -q - r

        // const tileEntity = this.world.createEntity()
        //   .addComponent(HexCoordinate, { q, r, s })
        
        grid.tiles[i] = i
        // grid.tiles[i] = tileEntity.id
        i++
      }
    }

    console.log(`[GridSystem]: Allocating buffer for ${totalTiles} tiles`)
  }
}

// export class HexMapSystem extends System {
//   static queries = {
//     // maps: { components: [HexMapComponent], listen: { added: true } }
//   }

//   execute() {
//     this.queries.grid.added?.forEach(e => this.generateMap(e))
//   }

//   private generateMap(entity: Entity) {
//     // const config = entity.getComponent(HexMapComponent)!
//     // const gridMap = config.grid

//     console.log(`[HexMapSystem]: Generating map with radius ${config.radius}`)

//     for (let q = -config.radius; q <= config.radius; q++) {
//       const r1 = Math.max(-config.radius, -q - config.radius)
//       const r2 = Math.min(config.radius, -q + config.radius)

//       for (let r = r1; r <= r2; r++) {
//         const s = -q - r

//         // Criamos uma entidade para cada posição do hexágono
//         const hexEntity = this.world.createEntity()
//           .addComponent(HexCoordinate, { q, r, s })

//         // Armazenamos no gestor para acesso rápido por coordenadas
//         gridMap.set(`${q},${r}`, hexEntity)
//       }
//     }

//     console.log(`[HexMapSystem]: Created ${gridMap.size} hex tiles.`)
//   }
// }
```

### systems/render.ts
```typescript
import * as THREE from 'three'
import { System } from 'ecsy'
import { CameraTag, RendererTag, SceneTag } from '@/components/tags'
import { RendererComponent, SceneComponent } from '@/components'
import { CameraInstanceComponent } from '@/components/camera'

export class RenderSystem extends System {
  static queries = {
    renderer: { components: [RendererTag] },
    camera: { components: [CameraTag] },
    scene: { components: [SceneTag] }
  }

  execute(_delta: number): void {
    const { renderer } = this.queries.renderer.results?.[0]?.getComponent(RendererComponent)
    const { value: instance } = this.queries.camera.results?.[0]?.getComponent(CameraInstanceComponent)
    const { value: scene } = this.queries.scene.results?.[0]?.getComponent(SceneComponent)
    
    if (renderer && instance && scene) this.update(renderer, instance, scene)
  }
  
  private update(renderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): void {
    // console.log('[RenderSystem]: update')
    renderer.render(scene, camera)
  }
}
```

### systems/renderer.ts
```typescript
import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { RendererComponent } from '@/components'
import { DirtyTag } from '@/components/tags'

export class RendererSystem extends System {
  static queries = {
    new: {
      components: [RendererComponent],
      listen: { added: true }
    },
    dirty: { components: [RendererComponent, DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.new.added?.forEach((e) => this.setup(e))
    this.queries.dirty.results?.forEach((e) => this.update(e))
  }

  private setup(e: Entity): void {
    console.log('[RendererSystem]: setup')
    const component = e.getMutableComponent(RendererComponent)
    component.renderer = new THREE.WebGLRenderer({ canvas: component.canvas })
    component.renderer.setSize(window.innerWidth, window.innerHeight)
    component.renderer.setPixelRatio(window.devicePixelRatio)
  }

  private update(_entity: Entity): void {
    console.log('[RendererSystem]: update')
  }
}
```

### systems/scene.ts
```typescript
import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { SceneComponent } from '@/components'
import { DirtyTag } from '@/components/tags'
import Stats from 'three/examples/jsm/libs/stats.module.js'

export class SceneSystem extends System {
  static queries = {
    new: {
      components: [SceneComponent],
      listen: { added: true }
    },
    dirty: { components: [SceneComponent, DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.new.added?.forEach(e => this.setup(e))
    this.queries.dirty.results?.forEach(e => this.update(e))
  }

  private setup(e: Entity): void {
    console.log('[SceneSystem]: setup')

    const scene = e.getMutableComponent(SceneComponent)
    scene.value = new THREE.Scene()

    const stats = new Stats()
    stats.showPanel(2)
    document.body.appendChild(stats.dom)

    const axes = new THREE.AxesHelper(15)
    scene.value.add(axes)
  }
  
  private update(_entity: Entity): void {
    console.log('[SceneSystem]: update')
  }
}
```

## Utilities

### utils/grid.ts
```typescript
export const getIndex = (q: number, r: number, radius: number) => (r + radius) * (radius * 2 + 1) + (q + radius)
```

## Summary

This codebase implements a 3D hexagonal grid engine using:
- **ECSY** for Entity Component System architecture
- **Three.js** for 3D rendering
- **TypeScript** for type safety

The architecture is organized into:
- **Components**: Data containers for entities
- **Systems**: Logic processors that operate on entities with specific components
- **Entities**: Game objects composed of components
- **Tags**: Marker components for entity categorization

Key features:
- Orthographic camera system with configurable parameters
- Hexagonal grid generation with coordinate system
- Scene management with Three.js integration
- Renderer setup and management
- Clean separation of concerns through ECS pattern