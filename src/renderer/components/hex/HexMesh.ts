import { Component, Types } from 'ecsy'

export class HexMesh extends Component<HexMesh> {
  static schema = {
    faceIndex: { type: Types.Number, default: -1 },
    vertexOffset: { type: Types.Number, default: -1 }
  }
  
  faceIndex!: number
  vertexOffset!: number
}
