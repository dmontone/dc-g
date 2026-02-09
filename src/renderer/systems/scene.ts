import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { SceneComponent } from '@/components'
import { DirtyTag } from '@/components/tags'

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
    scene.value.add(new THREE.AxesHelper(5))
  }
  
  private update(_entity: Entity): void {
    console.log('[SceneSystem]: update')
  }
}
