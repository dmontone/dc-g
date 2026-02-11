import { World as ECSYWorld } from 'ecsy'
import { DirtyTag, GridTag } from '@/components/tags'
import { GridComponent } from '@/components/grid'

export const grid = (w: ECSYWorld) =>
  w.createEntity()
    .addComponent(GridComponent, { radius: 50 })
    .addComponent(GridTag)
    .addComponent(DirtyTag)
