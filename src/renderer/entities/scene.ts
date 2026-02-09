import { World as ECSYWorld } from 'ecsy'
import { SceneComponent } from '@/components'

export const scene = (w: ECSYWorld) =>
  w.createEntity()
    .addComponent(SceneComponent)