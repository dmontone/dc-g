import { CameraConfig } from './Camera.types'
import * as THREE from 'three'

export const CAMERA_DEFAULTS: CameraConfig = {
  position: new THREE.Vector3(8, 20, 8),
  target: new THREE.Vector3(0, 0, 0),
  left: -20,
  right: 20,
  top: 15,
  bottom: -15,
  near: 1,
  far: 2000,
  zoom: 1
}
