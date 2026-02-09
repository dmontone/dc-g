import { HexCoordinates } from './'

export class HexMath {
  static getNeighbors(hex: HexCoordinates): HexCoordinates[] {
    const directions = [
      { q: 1, r: 0, s: -1 },
      { q: 1, r: -1, s: 0 },
      { q: 0, r: -1, s: 1 },
      { q: -1, r: 0, s: 1 },
      { q: -1, r: 1, s: 0 },
      { q: 0, r: 1, s: -1 }
    ]

    return directions.map((dir) => ({ q: hex.q + dir.q, r: hex.r + dir.r, s: hex.s + dir.s }))
  }

  static getDistance(a: HexCoordinates, b: HexCoordinates): number {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2
  }

  static hexToIndex(hex: HexCoordinates, width: number): number {
    return hex.q * width + hex.r
  }

  static indexToHex(index: number, width: number): HexCoordinates {
    const q = Math.floor(index / width)
    const r = index % width
    return { q, r, s: -q - r }
  }

  static isValidHex(hex: HexCoordinates): boolean {
    return hex.q + hex.r + hex.s === 0
  }

  static getRing(center: HexCoordinates, radius: number): HexCoordinates[] {
    if (radius === 0) return [center]

    const results: HexCoordinates[] = []
    const directions = [
      { q: 1, r: 0, s: -1 },
      { q: 1, r: -1, s: 0 },
      { q: 0, r: -1, s: 1 },
      { q: -1, r: 0, s: 1 },
      { q: -1, r: 1, s: 0 },
      { q: 0, r: 1, s: -1 }
    ]

    let hex = { q: center.q + radius, r: center.r - radius, s: center.s }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < radius; j++) {
        results.push(hex)
        hex = { q: hex.q + directions[i].q, r: hex.r + directions[i].r, s: hex.s + directions[i].s }
      }
    }

    return results
  }
}
