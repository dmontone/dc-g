import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class CameraInstanceComponent extends Component<CameraInstanceComponent> {
  static schema = { value: { type: Types.Ref } }
  value!: THREE.OrthographicCamera
}
