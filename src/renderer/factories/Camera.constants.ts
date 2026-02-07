import { CameraConfig } from './Camera.types'
import * as THREE from 'three'

export const CAMERA_DEFAULTS: CameraConfig = {
  position: new THREE.Vector3(5, 5, 10),
  target: new THREE.Vector3(0, 0, 0),
  fov: 75,
  near: 0.1,
  far: 1000,
  aspect: window.innerWidth / window.innerHeight,
  zoom: 1
}
