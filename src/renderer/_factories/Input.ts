import { KeyboardState, MouseButtons, MouseCoord, MouseDelta } from '@/components'
import { BaseEntityFactory } from './Factory'

export class InputFactory extends BaseEntityFactory {
  private keyboard() { return this.createBaseEntity([KeyboardState]) }
  private mouse() { return this.createBaseEntity([MouseCoord, MouseDelta, MouseButtons]) }

  create() {
    return {
      keyboard: this.keyboard(),
      mouse: this.mouse()
    }
  }
}
