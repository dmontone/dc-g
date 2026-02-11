export const getIndex = (q: number, r: number, radius: number) => (r + radius) * (radius * 2 + 1) + (q + radius)

export const gridToWorld = (q: number, r: number, size: number): { x: number, y: number } => ({
  x: size * (3/2 * q),
  y: size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r)
})

export const worldToGrid = (x: number, y: number, size: number): { q: number, r: number } => roundToGrid(
  (x * (2/3)) / size,
  (y * (Math.sqrt(3)/3) - (x / 3)) / size
)

export const roundToGrid = (fracQ: number, fracR: number): { q: number, r: number } => {
  let q = Math.round(fracQ)
  let r = Math.round(fracR)
  let s = Math.round(-fracQ - fracR)

  const qDiff = Math.abs(q - fracQ)
  const rDiff = Math.abs(r - fracR)
  const sDiff = Math.abs(s - (-fracQ - fracR))

  if (qDiff > rDiff && qDiff > sDiff) {
    q = -r - s
  } else if (rDiff > sDiff) {
    r = -q - s
  }
  
  return { q, r }
}