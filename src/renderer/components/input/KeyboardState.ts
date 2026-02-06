import { Component, Types } from 'ecsy'

export class KeyboardState extends Component<KeyboardState> {
  static schema = {
    keys: { type: Types.Ref, default: null as any },
    justPressed: { type: Types.Ref, default: null as any },
    justReleased: { type: Types.Ref, default: null as any }
  }

  keys!: Map<string, boolean>
  justPressed!: Set<string>
  justReleased!: Set<string>
}
