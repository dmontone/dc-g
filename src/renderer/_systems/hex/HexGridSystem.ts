import { System } from 'ecsy'
import { HexGrid, HexTile, HexMesh } from '@/components/hex'
import { Color, Dirty } from '@/components'
import { HexMath, HexCoordinates, HexIterationUtils } from '@/utils/hex'
import { ColorUtils } from '@/utils'

export class HexGridSystem extends System {
  private gridEntity: any = null

  static queries = {
    grids: { components: [HexGrid] },
    tiles: { components: [HexTile, Color, HexMesh] },
    dirtyTiles: { components: [HexTile, Color, HexMesh, Dirty] }
  }

  execute(_delta: number): void {
    this.queries.grids.results.forEach((gridEntity) => {
      if (this.gridEntity) return
      this.gridEntity = gridEntity
      this.initializeGrid(gridEntity)
    })

    this.processTiles()
  }

  private initializeGrid(gridEntity: any): void {
    const grid = gridEntity.getComponent(HexGrid)!
    const { width, height } = grid
    
    HexIterationUtils.forEach(width, height, (hex) => {
      this.createTileEntity(hex)
    })
  }

  private createTileEntity(hex: HexCoordinates): void {
    const tileEntity = this.world.createEntity()

    const faceIndex = HexMath.hexToIndex(hex, this.getGridWidth())
    const vertexOffset = faceIndex * 6
    
    tileEntity.addComponent(Color, { color: ColorUtils.generateRandomRGB() })
    tileEntity.addComponent(HexTile, { q: hex.q, r: hex.r, s: hex.s })
    tileEntity.addComponent(HexMesh, { faceIndex, vertexOffset })
    tileEntity.addComponent(Dirty, { value: true })
  }

  private getGridWidth(): number {
    const grid = this.gridEntity?.getComponent(HexGrid)
    return grid?.width ?? 10
  }

  private processTiles(): void {
    this.queries.dirtyTiles.results.forEach((tileEntity) => {
      const dirty = tileEntity.getComponent(Dirty)
      if (!dirty || !dirty.value) return
      
      tileEntity.removeComponent(Dirty)
      tileEntity.addComponent(Dirty, { value: false })
    })
  }

  public getTileCount(): number { return this.queries.tiles.results.length }
}
