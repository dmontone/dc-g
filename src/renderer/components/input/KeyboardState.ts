import { Component, Types } from 'ecsy'

export class KeyboardState extends Component<KeyboardState> {
  static schema = {
    keys: { 
      type: Types.Ref, 
      default: (): Map<string, boolean> => new Map() 
    },
    justPressed: { 
      type: Types.Ref, 
      default: (): Set<string> => new Set() 
    },
    justReleased: { 
      type: Types.Ref, 
      default: (): Set<string> => new Set() 
    }
  }

  keys!: Map<string, boolean>
  justPressed!: Set<string>
  justReleased!: Set<string>

  // Inicializa os valores quando o componente é criado
  constructor() {
    super()
    this.keys = new Map()
    this.justPressed = new Set()
    this.justReleased = new Set()
  }
}
