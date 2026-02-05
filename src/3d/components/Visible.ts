import { Component, Types } from 'ecsy'

export class Visible extends Component<Visible> {
  static schema = { value: { type: Types.Boolean, default: true } }
  value!: boolean
}
