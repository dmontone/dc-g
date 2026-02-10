import { World as ECSYWorld } from 'ecsy'
import { GridTileTag } from '@/components/tags/grid-tile'
import { GridCoordinateComponent } from '@/components/grid/coordinate'

export const tile = (w: ECSYWorld, { q, r }: { q: number, r: number }) =>
  w.createEntity()
    .addComponent(GridCoordinateComponent, { q, r })
    .addComponent(GridTileTag)
