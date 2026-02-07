import { Component, Types } from 'ecsy'

export class MouseDelta extends Component<MouseDelta> {
  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
    hasMovement: { type: Types.Boolean, default: false }
  }

  x!: number
  y!: number
  hasMovement!: boolean
}
