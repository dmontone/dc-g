import { HexGrid } from '@/components/hex'
import { BaseEntityFactory } from './Factory'
import { HEXGRID_DEFAULTS } from './HexGrid.constants'

export class HexGridFactory extends BaseEntityFactory {
  create() {
    return this.world.createEntity().addComponent(HexGrid, HEXGRID_DEFAULTS)
  }
}
