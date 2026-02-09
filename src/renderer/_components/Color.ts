import { Component, Types } from 'ecsy'

export class Color extends Component<Color> {
  static schema = {
    color: { type: Types.String, default: '#ff0000' }
  }
  
  color!: string
}
