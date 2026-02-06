import { System } from 'ecsy'
import * as THREE from 'three'
import { HexTile, HexMesh } from '@/components/hex'
import { Color, Dirty } from '@/components'
import { HexGeometryBuilder, HexCoordinates } from '@/utils/hex'
import { ColorUtils } from '@/utils'

export class HexMeshSystem extends System {
  private scene: THREE.Scene | THREE.Group
  private mesh: THREE.Mesh | null = null
  private geometryBuilder: HexGeometryBuilder | null = null
  private material: THREE.Material | null = null

  setScene(scene: THREE.Scene | THREE.Group): void {
    this.scene = scene
  }

  static queries = {
    tiles: { components: [HexTile, Color, HexMesh] },
    dirtyTiles: { components: [HexTile, Color, HexMesh, Dirty] },
    grids: { components: [HexTile] }
  }

  execute(_delta: number): void {
    if (!this.scene) return
    if (!this.mesh) this.initializeMesh()
    this.updateTileColors()
  }

  private initializeMesh(): void {
    const tiles = this.queries.grids.results
    if (tiles.length === 0) return

    let maxQ = 0, maxR = 0
    tiles.forEach((tileEntity) => {
      const hexTile = tileEntity.getComponent(HexTile)!
      maxQ = Math.max(maxQ, hexTile.q)
      maxR = Math.max(maxR, hexTile.r)
    })

    const width = maxQ + 1
    const height = maxR + 1
    const size = 1.0

    this.geometryBuilder = new HexGeometryBuilder({ size, width, height })
    this.material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.FrontSide })
    
    this.mesh = new THREE.Mesh(this.geometryBuilder.getGeometry(), this.material)
    this.mesh.position.set(0, 0, 0)

    this.scene.add(this.mesh)
  }

  private updateTileColors(): void {
    if (!this.geometryBuilder || !this.mesh) return

    this.queries.dirtyTiles.results.forEach(tileEntity => {
      const hexTile = tileEntity.getComponent(HexTile)!
      const color = tileEntity.getComponent(Color)!
      const dirty = tileEntity.getComponent(Dirty)

      this.geometryBuilder.updateHexagonColor({ q: hexTile.q, r: hexTile.r, s: hexTile.s }, color.color)
      
      if (!dirty || !dirty.value) return

      tileEntity.removeComponent(Dirty)
      tileEntity.addComponent(Dirty, { value: false })
    })

    if (this.queries.dirtyTiles.results.length > 0) {
      const geometry = this.mesh.geometry
      geometry.attributes.color.needsUpdate = true
    }
  }

  public getGeometryBuilder(): HexGeometryBuilder | null {
    return this.geometryBuilder
  }

  public updateHexagonHeight(hex: HexCoordinates, height: number): void {
    if (!this.geometryBuilder) return
    this.geometryBuilder.updateHexagonHeight(hex, height)

    if (!this.mesh) return
    const geometry = this.mesh.geometry
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
  }
}
