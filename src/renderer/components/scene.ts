import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class SceneComponent extends Component<SceneComponent> {
  static schema = { value: { type: Types.Ref } }
  value!: THREE.Scene
}
