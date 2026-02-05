import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class Transform extends Component<Transform> {
  position!: THREE.Vector3
  rotation!: THREE.Euler
  scale!: THREE.Vector3

  static schema = {
    position: { type: Types.Ref, default: () => new THREE.Vector3() },
    rotation: { type: Types.Ref, default: () => new THREE.Euler() },
    scale: { type: Types.Ref, default: () => new THREE.Vector3(1, 1, 1) }
  }

  setPosition(x: number, y: number, z: number): void { this.position.set(x, y, z) }
  setRotation(x: number, y: number, z: number): void { this.rotation.set(x, y, z) }
  setScale(x: number, y: number, z: number): void { this.scale.set(x, y, z) }

  copyFrom(transform: Transform): void {
    this.position.copy(transform.position)
    this.rotation.copy(transform.rotation)
    this.scale.copy(transform.scale)
  }

  applyToObject3D(object3D: THREE.Object3D): void {
    object3D.position.copy(this.position)
    object3D.rotation.copy(this.rotation)
    object3D.scale.copy(this.scale)
  }
}
