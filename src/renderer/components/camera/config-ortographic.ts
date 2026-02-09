import { Component, Types } from 'ecsy'

export class OrthographicConfig extends Component<OrthographicConfig> {
  static schema = {
    viewSize: { type: Types.Number, default: 20 },
    near: { type: Types.Number, default: 0.1 },
    far: { type: Types.Number, default: 2000 },
    zoom: { type: Types.Number, default: 1 }
  }

  viewSize: number = 20
  near: number = 0.1
  far: number = 2000
  zoom: number = 1
}
