import * as THREE from 'three'
import { ColorUtils } from '@/utils'
import { HexCoordinateConverter, HexCoordinates } from './'
import { HexGeometryConfig } from './HexGeometry.types'
import { HexIterationUtils } from './HexIteration'
import { HEXAGON_VERTEX_COUNT, HEXAGON_TRIANGLE_COUNT } from './HexGeometry.constants'

export class HexGeometryBuilder {
  private config: HexGeometryConfig
  private geometry: THREE.BufferGeometry
  private vertices: number[]
  private indices: number[]
  private colors: number[]
  private centerOffset: { x: number, y: number, z: number }

  constructor(config: HexGeometryConfig) {
    this.config = config
    this.vertices = []
    this.indices = []
    this.colors = []
    this.geometry = new THREE.BufferGeometry()
    this.centerOffset = this.calculateCenterOffset()
    this.buildGeometry()
  }

  private calculateCenterOffset(): { x: number, y: number, z: number } {
    if (!this.config.centered) {
      return { x: 0, y: 0, z: 0 }
    }

    const centerTile = this.config.centerTile || { q: 0, r: 0 }
    
    // Calcular o centro do grid em coordenadas hexagonais
    const gridCenterQ = (this.config.width - 1) / 2
    const gridCenterR = (this.config.height - 1) / 2
    
    // Calcular a posição do centro do grid em coordenadas cartesianas
    const gridCenterPosition = HexCoordinateConverter.hexToCartesian(
      { q: gridCenterQ, r: gridCenterR, s: -gridCenterQ - gridCenterR },
      this.config.size
    )
    
    // Calcular a posição do tile que deve ficar no centro
    const targetCenterPosition = HexCoordinateConverter.hexToCartesian(
      { q: centerTile.q, r: centerTile.r, s: -centerTile.q - centerTile.r },
      this.config.size
    )

    // O offset é a diferença entre onde o centro do grid está e onde deveria estar
    return {
      x: -gridCenterPosition.x,
      y: -gridCenterPosition.y,
      z: 0
    }
  }

  private buildGeometry(): void {
    const { width, height } = this.config
    HexIterationUtils.forEach(width, height, (hex) => this.addHexagon(hex))
    this.updateBuffers()
  }

  private addHexagon(hex: HexCoordinates): void {
    const center = HexCoordinateConverter.hexToCartesian(hex, this.config.size, this.centerOffset)
    const hexVertices = HexCoordinateConverter.getHexVertices(center, this.config.size)
    const vertexStart = this.vertices.length / 3

    hexVertices.forEach(vertex => {
      this.vertices.push(vertex.x, vertex.y, vertex.z)
      this.colors.push(1, 0, 0)
    })

    for (let i = 0; i < HEXAGON_TRIANGLE_COUNT; i++) {
      const next = (i + 1) % HEXAGON_TRIANGLE_COUNT
      this.indices.push(vertexStart, vertexStart + i, vertexStart + next)
    }
  }

  private getFaceIndex(hex: HexCoordinates): number {
    return hex.q * this.config.height + hex.r
  }

  private updateBuffers(): void {
    const vertexBuffer = new THREE.Float32BufferAttribute(this.vertices, 3)
    const colorBuffer = new THREE.Float32BufferAttribute(this.colors, 3)

    this.geometry.setIndex(this.indices)
    this.geometry.setAttribute('position', vertexBuffer)
    this.geometry.setAttribute('color', colorBuffer)
    this.geometry.computeVertexNormals()
  }

  public updateHexagonColor(hex: HexCoordinates, color: string): void {
    const faceIndex = this.getFaceIndex(hex)
    const vertexStart = faceIndex * HEXAGON_VERTEX_COUNT
    const rgb = ColorUtils.hexToRgb(color)

    for (let i = 0; i < HEXAGON_VERTEX_COUNT; i++) {
      const colorIndex = (vertexStart + i) * 3
      const [r, g, b] = [rgb.r, rgb.g, rgb.b]
      this.colors[colorIndex] = r
      this.colors[colorIndex + 1] = g
      this.colors[colorIndex + 2] = b
    }

    const colorBuffer = this.geometry.attributes.color
    colorBuffer.array.set(this.colors)
    colorBuffer.needsUpdate = true
  }

  public updateHexagonHeight(hex: HexCoordinates, height: number): void {
    const faceIndex = this.getFaceIndex(hex)
    const vertexStart = faceIndex * HEXAGON_VERTEX_COUNT

    for (let i = 0; i < HEXAGON_VERTEX_COUNT; i++) {
      const vertexIndex = (vertexStart + i) * 3 + 2
      this.vertices[vertexIndex] = height
    }

    const vertexBuffer = this.geometry.attributes.position
    vertexBuffer.array.set(this.vertices)
    vertexBuffer.needsUpdate = true
    this.geometry.computeVertexNormals()
  }

  public getGeometry(): THREE.BufferGeometry {
    return this.geometry
  }
}
