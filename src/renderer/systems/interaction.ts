import { System } from 'ecsy'
import { CameraInstanceComponent } from '@/components/camera'
import { GridComponent } from '@/components/grid'
import { CameraTag, GridTag } from '@/components/tags'
import { worldToGrid } from '@/utils/grid'
import * as THREE from 'three'
import { InputState } from '@/input'

export class InteractionSystem extends System {
  static queries = {
    camera: { components: [CameraTag, CameraInstanceComponent] },
    grid: { components: [GridTag, GridComponent] }
  }

  private raycaster = new THREE.Raycaster()
  private mouse = new THREE.Vector2()
  private planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) // Plano do Grid (Z=0)
  private intersection = new THREE.Vector3()
  private lastHovered = { q: Number.NaN, r: Number.NaN }

  execute() {
    // Escuta o movimento do mouse (você pode mover isso para um evento global)
    this.mouse.x = InputState.mouse.x;
    this.mouse.y = InputState.mouse.y;

    const cameraEnt = this.queries.camera.results[0]
    const gridEnt = this.queries.grid.results[0]
    if (!cameraEnt || !gridEnt) return

    const camera = cameraEnt.getComponent(CameraInstanceComponent).value
    const grid = gridEnt.getComponent(GridComponent)

    if (!camera) return

    this.raycaster.setFromCamera(this.mouse, camera)
    this.raycaster.ray.intersectPlane(this.planeZ, this.intersection)

    const hex = worldToGrid(this.intersection.x, this.intersection.y, 1)
    const dist = (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(-hex.q - hex.r)) / 2

    if (dist > grid.radius) {
      this.lastHovered.q = Number.NaN
      this.lastHovered.r = Number.NaN
      return
    }

    if (this.lastHovered.q === hex.q && this.lastHovered.r === hex.r) return

    this.lastHovered.q = hex.q
    this.lastHovered.r = hex.r
  }
}
