import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class Scale extends Component<Scale> {
  static schema = { value: { type: Types.Ref, default: () => new THREE.Vector3(1, 1, 1) } }
  value: THREE.Vector3
}
