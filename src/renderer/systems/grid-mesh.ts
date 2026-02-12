import * as THREE from 'three'
import { Entity, System } from 'ecsy'
import { SceneComponent } from '@/components'
import { GridTag, SceneTag, DirtyTag } from '@/components/tags'
import { createHexPlaneGeometry } from '@/geometry'
import { gridToWorld } from '@/utils/grid'
import { GridComponent, GridMeshComponent } from '@/components/grid'

export class GridMeshSystem extends System {
  static queries = {
    // Escutamos apenas quando o Grid é adicionado ou marcado como Dirty
    grid: { components: [GridTag, GridComponent, DirtyTag], listen: { removed: true } },
    scene: { components: [SceneTag, SceneComponent] }
  }

  private geometry = createHexPlaneGeometry(0.98)
  private material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    precision: 'lowp',
    wireframe: true
  })
  private dummy = new THREE.Object3D()

  execute() {
    const sceneEnt = this.queries.scene.results[0]
    if (!sceneEnt) return
    const scene = sceneEnt.getComponent(SceneComponent).value

    this.queries.grid.results.forEach(e => this.syncMesh(e, scene))
    this.queries.grid.removed?.forEach(e => this.disposeMesh(e, scene))
  }

  private syncMesh(entity: Entity, scene: THREE.Scene) {
    const grid = entity.getComponent(GridComponent)
    const R = grid.radius
    let instance = entity.getMutableComponent(GridMeshComponent)

    if (!instance) {
      const totalTiles = grid.tiles.length
      const mesh = new THREE.InstancedMesh(this.geometry, this.material, totalTiles)
      mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage)
      mesh.receiveShadow = true
      mesh.castShadow = true // Opcional para planos
      
      scene.add(mesh)
      entity.addComponent(GridMeshComponent, { mesh })
      instance = entity.getMutableComponent(GridMeshComponent)
    }

    const mesh = instance.mesh
    const size = 1
    let idx = 0

    for (let q = -R; q <= R; q++) {
      const rMin = Math.max(-R, -q - R)
      const rMax = Math.min(R, -q + R)

      for (let r = rMin; r <= rMax; r++) {
        const { x, y } = gridToWorld(q, r, size)

        this.dummy.position.set(x, y, 0)
        this.dummy.updateMatrix()
        mesh.setMatrixAt(idx, this.dummy.matrix)

        idx++
      }
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    
  }

  private disposeMesh(entity: Entity, scene: THREE.Scene) {
    // O ECSY não nos dá o componente no removed, então idealmente 
    // você gerencia isso no nível de componente ou via tags de destruição.
    console.log('[GridMeshSystem]: Grid removed, clearing resources...')
  }
}