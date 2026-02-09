import { World as ECSYWorld } from 'ecsy'
import { RendererComponent } from '@/components'
import { RendererTag } from '@/components/tags'

export const renderer = (w: ECSYWorld, canvas: HTMLCanvasElement) =>
  w.createEntity()
    .addComponent(RendererComponent, { canvas })
    .addComponent(RendererTag)
