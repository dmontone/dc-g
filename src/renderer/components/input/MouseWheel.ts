import { Component, Types } from 'ecsy'

export class MouseWheel extends Component<MouseWheel> {
  static schema = {
    delta: { type: Types.Number, default: 0 }
  }

  delta!: number
}
