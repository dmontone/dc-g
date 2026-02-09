import { Component, Types } from 'ecsy'

export class MouseButtons extends Component<MouseButtons> {
  static schema = {
    buttons: { 
      type: Types.Ref, 
      default: (): Map<number, boolean> => new Map() 
    },
    justPressed: { 
      type: Types.Ref, 
      default: (): Set<number> => new Set() 
    },
    justReleased: { 
      type: Types.Ref, 
      default: (): Set<number> => new Set() 
    }
  }

  buttons!: Map<number, boolean>
  justPressed!: Set<number>
  justReleased!: Set<number>

  // Inicializa os valores quando o componente é criado
  constructor() {
    super()
    this.buttons = new Map()
    this.justPressed = new Set()
    this.justReleased = new Set()
  }
}
