import { Component, Types } from 'ecsy'

/**
 * Componente que controla a visibilidade da entidade
 */
export class Visible extends Component<Visible> {
  static schema = {
    value: { type: Types.Boolean, default: true }
  }

  value!: boolean

  toggle(): void { this.value = !this.value }
  setVisible(visible: boolean): void { this.value = visible }
  isVisible(): boolean { return this.value }
}
