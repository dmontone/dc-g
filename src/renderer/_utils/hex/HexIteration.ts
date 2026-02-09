import { HexCoordinates } from './HexCoordinates.types'
import { HexIterationCallback } from './HexIteration.types'

export class HexIterationUtils {
  static forEachHex<T = void>(width: number, height: number, callback: HexIterationCallback<T>): T[] {
    const results: T[] = []
    const hex: HexCoordinates = { q: 0, r: 0, s: 0 }
    
    for (let q = 0; q < width; q++) {
      hex.q = q
      for (let r = 0; r < height; r++) {
        hex.r = r
        hex.s = -q - r
        
        const result = callback(hex, q, r)
        if (result !== undefined) {
          results.push(result)
        }
      }
    }
    
    return results
  }
  
  static forEach(width: number, height: number, callback: HexIterationCallback<void>): void {
    this.forEachHex(width, height, callback)
  }
  
  static map<T>(width: number, height: number, callback: HexIterationCallback<T>): T[] {
    return this.forEachHex(width, height, callback)
  }
  
  static filter(width: number, height: number, predicate: HexIterationCallback<boolean>): HexCoordinates[] {
    return this.forEachHex(width, height, (hex, q, r) => 
      predicate(hex, q, r) ? hex : undefined
    ).filter(Boolean) as HexCoordinates[]
  }
}

