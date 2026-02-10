import { Entity, System } from 'ecsy'
import { GridComponent } from '@/components/grid'
import { GridTag } from '@/components/tags'
import { tile as tileFactory } from '@/entities/gird-tiles'
import { getIndex } from '@/utils/grid'
import { DirtyTag } from '@/components/tags/dirty'

export class GridSystem extends System {
  static queries = {
    grid: { components: [GridTag, GridComponent], listen: { added: true } }
  }

  execute() {
    const added = this.queries.grid.added?.[0]
    if (!added) return
    this.setup(added)
  }
  
  private setup(entity: Entity) {
    const grid = entity.getMutableComponent(GridComponent)
    const R = grid.radius
    const side = R * 2 + 1
    
    const bufferSize = side * side
    const tilesBuffer = new Uint32Array(bufferSize).fill(0)

    const world = this.world

    let rmin, rmax
    for (let q = -R; q <= R; q++) {
      rmin = Math.max(-R, -q - R)
      rmax = Math.min(R, -q + R)

      for (let r = rmin; r <= rmax; r++) {
        const tileEntity = tileFactory(world, { q, r })
        tilesBuffer[getIndex(q, r, R)] = tileEntity.id
      }
    }

    grid.tiles = tilesBuffer
    
    entity.addComponent(DirtyTag)
  }
}