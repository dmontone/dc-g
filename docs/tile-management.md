# Gestão de Tiles Hexagonais

## Visão Geral

O sistema de tiles hexagonais é uma parte fundamental da arquitetura do DC-G, fornecendo uma base eficiente para representação e manipulação de grades hexagonais em 3D. Este documento descreve a arquitetura, APIs e padrões para trabalhar com tiles hexagonais.

## Sistema de Coordenadas

### Coordenadas Hexagonais (Cúbicas)

Usamos o sistema de coordenadas cúbicas (q, r, s) para representar posições hexagonais:

```typescript
interface HexCoordinates {
  q: number  // Coluna
  r: number  // Linha  
  s: number  // Profundidade (calculada: -q - r)
}
```

**Vantagens do Sistema Cúbico:**
- Cálculos de distância simples
- Movimento uniforme em todas as 6 direções
- Validação fácil: `q + r + s = 0`

### Conversão para Índices

Para armazenamento eficiente, convertemos coordenadas hexagonais para índices lineares:

```typescript
// HexCoordinates -> Index
static hexToIndex(hex: HexCoordinates, width: number): number {
  return hex.q * width + hex.r
}

// Index -> HexCoordinates  
static indexToHex(index: number, width: number): HexCoordinates {
  const q = Math.floor(index / width)
  const r = index % width
  return { q, r, s: -q - r }
}
```

## API Central: HexMath

A classe `HexMath` fornece todas as operações matemáticas para tiles hexagonais.

### Localização
```typescript
import { HexMath } from '@/utils/hex'
```

### Métodos Principais

#### Vizinhança
```typescript
// Obtém os 6 vizinhos de um tile
static getNeighbors(hex: HexCoordinates): HexCoordinates[]

// Exemplo:
const neighbors = HexMath.getNeighbors({ q: 0, r: 0, s: 0 })
// Retorna: [{ q: 1, r: 0, s: -1 }, { q: 1, r: -1, s: 0 }, ...]
```

#### Distância
```typescript
// Calcula distância entre dois tiles
static getDistance(a: HexCoordinates, b: HexCoordinates): number

// Exemplo:
const distance = HexMath.getDistance(
  { q: 0, r: 0, s: 0 }, 
  { q: 2, r: -1, s: -1 }
) // Retorna: 2
```

#### Anéis e Áreas
```typescript
// Obtém tiles em um anel ao redor de um centro
static getRing(center: HexCoordinates, radius: number): HexCoordinates[]

// Exemplo:
const ring = HexMath.getRing({ q: 0, r: 0, s: 0 }, 2)
// Retorna 12 tiles formando um anel de raio 2
```

#### Validação
```typescript
// Verifica se coordenadas são válidas
static isValidHex(hex: HexCoordinates): boolean

// Exemplo:
HexMath.isValidHex({ q: 1, r: 1, s: -2 }) // true
HexMath.isValidHex({ q: 1, r: 1, s: 0 })  // false
```

## Iteração sobre Tiles

### HexIterationUtils

Para operações em massa sobre tiles, use `HexIterationUtils`:

```typescript
import { HexIterationUtils } from '@/utils/hex'

// Para cada tile em uma grade
HexIterationUtils.forEach(width, height, (hex, q, r) => {
  // Processar tile
})

// Mapear tiles para valores
const results = HexIterationUtils.map(width, height, (hex, q, r) => {
  return someCalculation(hex)
})

// Filtrar tiles
const filtered = HexIterationUtils.filter(width, height, (hex, q, r) => {
  return someCondition(hex)
})
```

### Callback Type

```typescript
type HexIterationCallback<T = void> = (
  hex: HexCoordinates, 
  q: number, 
  r: number
) => T
```

## Geometria e Renderização

### HexGeometry

A classe `HexGeometry` lida com a conversão entre coordenadas hexagonais e posições 3D:

```typescript
import { HexGeometry } from '@/utils/hex'

// Converter coordenada hex para posição 3D
const position3D = HexGeometry.hexToWorld(hex)

// Converter posição 3D para coordenada hex
const hex = HexGeometry.worldToHex(position3D)

// Obter vértices do hexágono para renderização
const vertices = HexGeometry.getHexVertices(hex)
```

## Padrões de Uso

### 1. Criação de Grid

```typescript
// Criar grid de tiles
const width = 10
const height = 10
const tiles: HexCoordinates[] = []

HexIterationUtils.forEach(width, height, (hex, q, r) => {
  tiles.push({ ...hex }) // Copiar coordenadas
})
```

### 2. Busca de Caminho

```typescript
// Algoritmo A* simplificado para hexágonos
function findPath(start: HexCoordinates, end: HexCoordinates): HexCoordinates[] {
  const openSet = [start]
  const closedSet = new Set<string>()
  const cameFrom = new Map<string, HexCoordinates>()
  
  while (openSet.length > 0) {
    const current = openSet.shift()!
    
    if (current.q === end.q && current.r === end.r) {
      // Reconstruir caminho
      return reconstructPath(cameFrom, current)
    }
    
    closedSet.add(`${current.q},${current.r}`)
    
    // Explorar vizinhos
    const neighbors = HexMath.getNeighbors(current)
    for (const neighbor of neighbors) {
      const key = `${neighbor.q},${neighbor.r}`
      if (closedSet.has(key)) continue
      
      // Adicionar ao open set com prioridade
      openSet.push(neighbor)
    }
  }
  
  return [] // Sem caminho encontrado
}
```

### 3. Seleção de Tiles

```typescript
// Selecionar tiles em forma de losango
function selectDiamond(center: HexCoordinates, radius: number): HexCoordinates[] {
  const selected: HexCoordinates[] = []
  
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius)
    const r2 = Math.min(radius, -q + radius)
    
    for (let r = r1; r <= r2; r++) {
      selected.push({
        q: center.q + q,
        r: center.r + r,
        s: center.s - q - r
      })
    }
  }
  
  return selected
}
```

## Performance e Otimização

### 1. Pool de Objetos

```typescript
// Reutilizar objetos HexCoordinates para evitar GC
class HexPool {
  private pool: HexCoordinates[] = []
  
  acquire(): HexCoordinates {
    return this.pool.pop() || { q: 0, r: 0, s: 0 }
  }
  
  release(hex: HexCoordinates): void {
    this.pool.push(hex)
  }
}
```

### 2. Cache de Cálculos

```typescript
// Cache para vizinhos e distâncias frequentemente usados
class HexCache {
  private neighborCache = new Map<string, HexCoordinates[]>()
  private distanceCache = new Map<string, number>()
  
  getNeighbors(hex: HexCoordinates): HexCoordinates[] {
    const key = `${hex.q},${hex.r},${hex.s}`
    return this.neighborCache.get(key) || HexMath.getNeighbors(hex)
  }
}
```

### 3. Spatial Hashing

```typescript
// Para lookup rápido de tiles por posição
class SpatialHash {
  private hash = new Map<string, HexCoordinates>()
  
  insert(hex: HexCoordinates): void {
    const key = `${Math.floor(hex.q)},${Math.floor(hex.r)}`
    this.hash.set(key, hex)
  }
  
  query(hex: HexCoordinates): HexCoordinates | undefined {
    const key = `${Math.floor(hex.q)},${Math.floor(hex.r)}`
    return this.hash.get(key)
  }
}
```

## Integração com ECS

### Componentes

```typescript
// TileComponent.ts
export class TileComponent {
  coordinates: HexCoordinates
  type: TileType
  walkable: boolean
  
  constructor(hex: HexCoordinates, type: TileType) {
    this.coordinates = hex
    this.type = type
    this.walkable = type !== TileType.WALL
  }
}

// GridComponent.ts
export class GridComponent {
  width: number
  height: number
  tiles: Map<string, Entity> // key: "q,r" -> Entity
  
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.tiles = new Map()
  }
}
```

### Sistemas

```typescript
// GridSystem.ts
export class GridSystem extends System {
  static queries = {
    tiles: { components: [TileComponent] },
    grid: { components: [GridComponent] }
  }
  
  execute(): void {
    const { grid } = this.queries
    const gridEntity = grid.results[0]
    const gridComponent = gridEntity.getComponent(GridComponent)
    
    // Processar tiles...
  }
}
```

## Testes

### Testes Unitários

```typescript
describe('HexMath', () => {
  test('deve calcular distância corretamente', () => {
    const a = { q: 0, r: 0, s: 0 }
    const b = { q: 2, r: -1, s: -1 }
    
    expect(HexMath.getDistance(a, b)).toBe(2)
  })
  
  test('deve retornar 6 vizinhos', () => {
    const hex = { q: 0, r: 0, s: 0 }
    const neighbors = HexMath.getNeighbors(hex)
    
    expect(neighbors).toHaveLength(6)
  })
})
```

### Testes de Performance

```typescript
// Benchmark para operações críticas
function benchmarkHexOperations() {
  const iterations = 100000
  const hex = { q: 5, r: 3, s: -8 }
  
  console.time('getNeighbors')
  for (let i = 0; i < iterations; i++) {
    HexMath.getNeighbors(hex)
  }
  console.timeEnd('getNeighbors')
}
```

## Boas Práticas

### 1. Imutabilidade

```typescript
// ✅ Bom - criar novos objetos
const newHex = { q: hex.q + 1, r: hex.r, s: hex.s - 1 }

// ❌ Ruim - modificar objetos existentes
hex.q += 1
hex.s -= 1
```

### 2. Validação

```typescript
// Sempre validar coordenadas
function safeHexOperation(hex: HexCoordinates): void {
  if (!HexMath.isValidHex(hex)) {
    throw new Error('Coordenadas hexagonais inválidas')
  }
  // Operação segura...
}
```

### 3. Nomenclatura

```typescript
// Prefixos claros para diferentes tipos de coordenadas
const hexCoords: HexCoordinates = { q: 0, r: 0, s: 0 }
const worldPos: Vector3 = new Vector3(0, 0, 0)
const screenPos: Vector2 = new Vector2(0, 0)
```

## Troubleshooting

### Problemas Comuns

1. **Coordenadas Inválidas**: Sempre verifique `q + r + s === 0`
2. **Performance**: Use pooling para objetos frequentemente criados
3. **Precisão Numérica**: Cuidado com coordenadas muito grandes
4. **Memory Leaks**: Limpe caches e pools quando não forem mais necessários

### Debug Tools

```typescript
// Helper para visualizar coordenadas
function debugHex(hex: HexCoordinates): string {
  return `Hex(${hex.q}, ${hex.r}, ${hex.s}) [${HexMath.isValidHex(hex) ? 'VALID' : 'INVALID'}]`
}

// Visualizar grid
function debugGrid(width: number, height: number): void {
  HexIterationUtils.forEach(width, height, (hex, q, r) => {
    console.log(`${q},${r}: ${debugHex(hex)}`)
  })
}
```

---

**Atualizado**: 2026-02-06  
**Versão**: 1.0.0  
**Autor**: dmont
