import { Component, Types } from 'ecsy'

export class HexGrid extends Component<HexGrid> {
  static schema = {
    width: { type: Types.Number, default: 10 },
    height: { type: Types.Number, default: 10 }
  }
  
  width!: number
  height!: number
}
