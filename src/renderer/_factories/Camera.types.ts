import * as THREE from 'three'
 
export type CameraConfig = {
  position: THREE.Vector3
  target: THREE.Vector3
  left: number
  right: number
  top: number
  bottom: number
  near: number
  far: number
  zoom: number
}