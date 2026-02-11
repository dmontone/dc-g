import { Component, Types } from 'ecsy'
import * as THREE from 'three'

export class CameraStateComponent extends Component<CameraStateComponent> {
  static schema = {
    targetPosition: { type: Types.Ref }, // Vector3
    targetAngle: { type: Types.Number, default: 0 },
    currentPosition: { type: Types.Ref }, // Vector3 (para o Damping)
    currentAngle: { type: Types.Number, default: 0 },
    damping: { type: Types.Number, default: 0.15 }
  }

  targetPosition!: THREE.Vector3
  targetAngle!: number
  currentPosition!: THREE.Vector3
  currentAngle!: number
  damping!: number
}
