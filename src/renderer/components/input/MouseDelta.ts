import { Component, Types } from 'ecsy'

export class MouseDelta extends Component<MouseDelta> {
  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 }
  }

  x!: number
  y!: number
}
