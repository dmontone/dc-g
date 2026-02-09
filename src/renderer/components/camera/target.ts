import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class CameraTargetComponent extends Component<CameraTargetComponent> {
  static schema = { value: { type: Types.Ref, default: new THREE.Vector3(0, 0, 0) } }
  value: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
}
