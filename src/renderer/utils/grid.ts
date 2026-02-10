export const getIndex = (q: number, r: number, radius: number) => (r + radius) * (radius * 2 + 1) + (q + radius)

export const gridToWorld = (q: number, r: number, size: number) => ({
  x: size * (3/2 * q),
  y: size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r)
})