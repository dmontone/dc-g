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

  constructor(config: HexGeometryConfig) {
    this.config = config
    this.vertices = []
    this.indices = []
    this.colors = []
    this.geometry = new THREE.BufferGeometry()
    this.buildGeometry()
  }

  private buildGeometry(): void {
    const { width, height } = this.config
    HexIterationUtils.forEach(width, height, (hex) => this.addHexagon(hex))
    this.updateBuffers()
  }

  private addHexagon(hex: HexCoordinates): void {
    const center = HexCoordinateConverter.hexToCartesian(hex, this.config.size)
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
