# Sistema Hexagonal

## Visão Geral
Sistema completo de grids hexagonais com renderização otimizada e integração ECSY.

## Coordenadas Hexagonais

### Sistema Cúbico
```typescript
interface HexCoordinates {
  q: number  // Coluna
  r: number  // Linha  
  s: number  // Profundidade (calculada: -q - r)
}
```

**Vantagens:**
- Cálculos de distância simples
- Movimento uniforme em 6 direções
- Validação fácil: `q + r + s = 0`

## Componentes ECS

### HexTile
Representa um tile individual:
```typescript
export class HexTile {
  q: number  // Coordenada cúbica Q
  r: number  // Coordenada cúbica R  
  s: number  // Coordenada cúbica S (-q - r)
}
```

### HexGrid
Configuração do grid:
```typescript
export class HexGrid {
  width: number   // Largura
  height: number  // Altura
  size: number    // Tamanho do hexágono
}
```

### HexMesh
Informações de renderização:
```typescript
export class HexMesh {
  faceIndex: number    // Índice na geometria
  vertexOffset: number // Offset dos vértices
}
```

## HexMath - API Central

### Operações Principais
```typescript
// Vizinhança
HexMath.getNeighbors({ q: 0, r: 0, s: 0 })

// Distância
HexMath.getDistance(hexA, hexB)

// Anel ao redor de centro
HexMath.getRing(center, radius)

// Validação
HexMath.isValidHex(hex)

// Conversão para índice linear
HexMath.hexToIndex(hex, width)
HexMath.indexToHex(index, width)
```

### Iteração em Massa
```typescript
// Para cada tile
HexIterationUtils.forEach(width, height, (hex, q, r) => {
  // Processar tile
})

// Mapear para valores
const results = HexIterationUtils.map(width, height, (hex, q, r) => {
  return someCalculation(hex)
})

// Filtrar tiles
const filtered = HexIterationUtils.filter(width, height, (hex, q, r) => {
  return someCondition(hex)
})
```

## Sistemas ECS

### HexGridSystem
- Cria entidades de tiles automaticamente
- Gerencia ciclo de vida dos tiles
- Processa estados sujos (dirty flags)

### HexMeshSystem
- Renderização otimizada com buffer geometry
- Atualização dinâmica de cores e alturas
- Gerenciamento de geometria

## Geometria e Renderização

### HexGeometryBuilder
Constrói geometrias hexagonais otimizadas:

```typescript
const config = {
  size: 1.0,
  width: 10,
  height: 10,
  centered: true
}

const builder = new HexGeometryBuilder(config)
```

### Funcionalidades

#### Atualização de Cores
```typescript
builder.updateHexagonColor({ q: 2, r: 3, s: -5 }, '#ff0000')
```

#### Modificação de Altura
```typescript
builder.updateHexagonHeight({ q: 2, r: 3, s: -5 }, 2.5)
```

## Uso Básico

```typescript
// Criar grid via factory
const gridFactory = new HexGridFactory(world, scene, {
  width: 10,
  height: 10,
  size: 1.0
})

// Acessar tiles
const tiles = world.createQuery({
  components: [HexTile, Color]
}).results
```

## Padrões de Uso

### Pathfinding Básico
```typescript
function findPath(start: HexCoordinates, end: HexCoordinates): HexCoordinates[] {
  const openSet = [start]
  const closedSet = new Set<string>()
  
  while (openSet.length > 0) {
    const current = openSet.shift()!
    
    if (current.q === end.q && current.r === end.r) {
      return reconstructPath(cameFrom, current)
    }
    
    // Explorar vizinhos
    const neighbors = HexMath.getNeighbors(current)
    // ... implementação A*
  }
  
  return []
}
```

### Seleção de Área
```typescript
// Selecionar tiles em formato de losango
function selectDiamond(center: HexCoordinates, radius: number): HexCoordinates[] {
  const selected = []
  
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

## Performance

### Buffer Geometry
- Único mesh para todo o grid
- Buffer attributes para posição e cor
- Atualizações incrementais via dirty flags

### Memory Management
```typescript
// Sempre dispose recursos
public dispose(): void {
  this.geometry?.dispose()
  this.material?.dispose()
  if (this.mesh) {
    this.scene.remove(this.mesh)
  }
}
```

---

**Última atualização**: 2026-02-07
