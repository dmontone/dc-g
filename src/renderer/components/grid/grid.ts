import { Component, Types } from 'ecsy'

export class GridComponent extends Component<GridComponent> {
  static schema = {
    radius: { type: Types.Number },
    tiles: { type: Types.Ref } 
  }

  radius!: number
  tiles!: Uint32Array
}