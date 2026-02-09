import { Entity, System } from 'ecsy'
import { DirtyTag } from '@/components/tags'

export class ModelSystem extends System {
  static queries = {
    new: {
      //@ts-ignore - example purpose
      components: [/* ... */],
      listen: { added: true }
    },
    //@ts-ignore - example purpose
    dirty: { components: [/* ... */, DirtyTag] }
  }

  execute(_delta: number): void {
    this.queries.new.added?.forEach(e => this.setup(e))
    this.queries.dirty.results?.forEach(e => this.update(e))
  }

  private setup(_entity: Entity): void { console.log('[ModelSystem]: setup') }
  
  private update(_entity: Entity): void { console.log('[ModelSystem]: update') }
}
