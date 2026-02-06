export class ColorUtils {
  static generateRandomRGB(): string {
    const r = Math.random() > 0.5 ? 255 : 0
    const g = Math.random() > 0.5 ? 255 : 0
    const b = Math.random() > 0.5 ? 255 : 0
    
    // Evitar cor preta (0,0,0)
    if (r === 0 && g === 0 && b === 0) {
      return this.generateRandomRGB()
    }
    
    return `rgb(${r}, ${g}, ${b})`
  }
  
  static rgbToHex(rgbString: string): string {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0')
      const g = parseInt(match[2]).toString(16).padStart(2, '0')
      const b = parseInt(match[3]).toString(16).padStart(2, '0')
      return `#${r}${g}${b}`
    }
    return '#ff0000' // Default vermelho
  }
  
  static hexToRgb(hex: string): { r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 1, g: 0, b: 0 }
  }
  
  static generateRandomHex(): string {
    const rgb = this.generateRandomRGB()
    return this.rgbToHex(rgb)
  }
}
