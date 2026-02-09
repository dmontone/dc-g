import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class Rotation extends Component<Rotation> {
  static schema = { value: { type: Types.Ref, default: () => new THREE.Euler() } }
  value: THREE.Euler
}
