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
