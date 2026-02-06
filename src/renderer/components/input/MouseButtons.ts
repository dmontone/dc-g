import { Component, Types } from 'ecsy'

export class MouseButtons extends Component<MouseButtons> {
  static schema = {
    buttons: { type: Types.Ref, default: null as any },
    justPressed: { type: Types.Ref, default: null as any },
    justReleased: { type: Types.Ref, default: null as any }
  }

  buttons!: Map<number, boolean>
  justPressed!: Set<number>
  justReleased!: Set<number>
}
