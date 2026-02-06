import { Component, Types } from 'ecsy'

export class HexTile extends Component<HexTile> {
  static schema = {
    q: { type: Types.Number, default: 0 },
    r: { type: Types.Number, default: 0 },
    s: { type: Types.Number, default: 0 }
  }
  
  q!: number
  r!: number
  s!: number
}
