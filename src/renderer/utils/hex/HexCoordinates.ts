import { HexCoordinates, CartesianCoordinates } from './HexCoordinates.types'

export class HexCoordinateConverter {
  static hexToCartesian(hex: HexCoordinates, size: number = 1): CartesianCoordinates {
    const x = size * (3/2 * hex.q)
    const y = size * (Math.sqrt(3)/2 * hex.q + Math.sqrt(3) * hex.r)
    const z = 0
    
    return { x, y, z }
  }
  
  static cartesianToHex(cartesian: CartesianCoordinates, size: number = 1): HexCoordinates {
    const q = (2/3 * cartesian.x) / size
    const r = (-1/3 * cartesian.x + Math.sqrt(3)/3 * cartesian.y) / size
    const s = -q - r
    
    return this.roundHex({ q, r, s })
  }
  
  static roundHex(hex: HexCoordinates): HexCoordinates {
    let q = Math.round(hex.q)
    let r = Math.round(hex.r)
    let s = Math.round(hex.s)
    
    const qDiff = Math.abs(q - hex.q)
    const rDiff = Math.abs(r - hex.r)
    const sDiff = Math.abs(s - hex.s)
    
    if (qDiff > rDiff && qDiff > sDiff) q = -r - s
    else if (rDiff > sDiff) r = -q - s
    else s = -q - r
    
    return { q, r, s }
  }
  
  static getHexVertices(center: CartesianCoordinates, size: number = 1): CartesianCoordinates[] {
    const vertices: CartesianCoordinates[] = []
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      vertices.push({ x: center.x + size * Math.cos(angle), y: center.y + size * Math.sin(angle), z: center.z })
    }
    
    return vertices
  }
}
