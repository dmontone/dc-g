export interface HexGeometryConfig {
  size: number
  width: number
  height: number
  centerTile?: { q: number, r: number } // Tile que deve ficar no centro (padrão: 0,0)
  centered?: boolean // Se true, centraliza o grid na origem
}
