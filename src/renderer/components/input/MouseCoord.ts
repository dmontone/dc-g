import { Component, Types } from 'ecsy'

export class MouseCoord extends Component<MouseCoord> {
  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 }
  }

  x!: number
  y!: number
}
