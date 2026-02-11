import { Entity, System } from 'ecsy'
import { DirtyTag } from '@/components/tags'
import { InputState } from '../input'

export class CleanupSystem extends System {
  static queries = {
    dirty: { components: [DirtyTag] }
  }

  execute(_delta: number): void {
    this.update()
  }

  private update(_entity?: Entity): void {  
    this.queries.dirty.results?.forEach(e => e.removeComponent(DirtyTag))
    InputState.reset()
  }
}
