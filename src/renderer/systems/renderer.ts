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
