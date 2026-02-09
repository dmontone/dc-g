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
