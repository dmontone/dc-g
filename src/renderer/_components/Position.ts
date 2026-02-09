import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class Position extends Component<Position> {
  static schema = { value: { type: Types.Ref, default: () => new THREE.Vector3() } }
  value: THREE.Vector3
}
