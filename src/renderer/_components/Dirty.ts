import { Component, Types } from 'ecsy'

export class Dirty extends Component<Dirty> {
  static schema = {
    value: { type: Types.Boolean, default: false }
  }
  
  value!: boolean
}
