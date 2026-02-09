import { World as ECSYWorld } from 'ecsy'
import { CameraTag } from '@/components/tags/camera'
import { CameraInstanceComponent, OrthographicConfig, CameraPositionComponent, CameraTargetComponent } from '@/components/camera'

export const camera = (w: ECSYWorld) =>
  w.createEntity()
    .addComponent(CameraInstanceComponent)
    .addComponent(OrthographicConfig)
    .addComponent(CameraPositionComponent)
    .addComponent(CameraTargetComponent)
    .addComponent(CameraTag)