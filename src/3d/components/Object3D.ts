import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class Object3D extends Component<Object3D> {
  static schema = { value: { type: Types.Ref } }
  value!: THREE.Object3D
}
