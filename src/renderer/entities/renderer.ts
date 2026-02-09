import { World as ECSYWorld } from 'ecsy'
import { RendererComponent } from '@/components'

export const renderer = (w: ECSYWorld, canvas: HTMLCanvasElement) =>
  w.createEntity()
    .addComponent(RendererComponent, { canvas })