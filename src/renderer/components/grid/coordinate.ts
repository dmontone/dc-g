import { Component, Types } from 'ecsy'

export class GridCoordinateComponent extends Component<GridCoordinateComponent> {
  static schema = {
    q: { type: Types.Number },
    r: { type: Types.Number }
  }

  q!: number
  r!: number
}