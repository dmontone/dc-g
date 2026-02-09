import { World as ECSYWorld } from 'ecsy'
import { SceneComponent } from '@/components'
import { SceneTag } from '@/components/tags'

export const scene = (w: ECSYWorld) =>
  w.createEntity()
    .addComponent(SceneComponent)
    .addComponent(SceneTag)