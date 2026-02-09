import * as THREE from 'three'
import { Object3D, Position } from '@/components'
import { CameraComponent, CameraTarget } from '@/components/camera'
import { CameraConfig } from './Camera.types'
import { CAMERA_DEFAULTS } from './Camera.constants'
import { BaseEntityFactory } from './'

export class CameraFactory extends BaseEntityFactory {
  create(options: Partial<CameraConfig> = {}) {
    const entity = this.world.createEntity()
    const cameraObj = new THREE.Object3D()
    this.scene.add(cameraObj)

    return entity
      .addComponent(Object3D, { value: cameraObj })
      .addComponent(CameraComponent, { ...CAMERA_DEFAULTS, ...options })
      .addComponent(Position, { value: CAMERA_DEFAULTS.position })
      .addComponent(CameraTarget, { value: CAMERA_DEFAULTS.target })
  }
}
