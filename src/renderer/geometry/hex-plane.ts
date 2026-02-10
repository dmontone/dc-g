import * as THREE from 'three'

export function createHexPlaneGeometry(size: number = 1): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array(7 * 3)
  const indices: number[] = []

  vertices[0] = 0; vertices[1] = 0; vertices[2] = 0

  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const x = size * Math.cos(angle)
    const y = size * Math.sin(angle)
    
    const vIdx = (i + 1) * 3
    vertices[vIdx] = x
    vertices[vIdx + 1] = y
    vertices[vIdx + 2] = 0

    indices.push(0, i + 1, i === 5 ? 1 : i + 2)
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}