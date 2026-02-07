import * as THREE from 'three'
 
export type CameraConfig = {
  position: THREE.Vector3
  target: THREE.Vector3
  fov: number
  near: number
  far: number
  aspect: number
  zoom: number
}