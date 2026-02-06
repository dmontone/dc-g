import { System, Component, Entity } from 'ecsy'
import * as THREE from 'three'
import { CameraComponent, CameraTarget } from '@/components/camera'
import { CameraManager } from '@/core/camera/CameraManager'
import { Object3D } from '@/components/Object3D'
import { Position } from '@/components'

export class CameraSystem extends System {
  static queries = {
    cameras: {
      components: [CameraComponent, Object3D],
      listen: {
        added: true,
        changed: [CameraComponent]
      }
    }
  }

  private resizeObserver?: ResizeObserver

  init() {
    this.setupResizeObserver()
  }

  execute() {
    const entity = this.queries.cameras.results[0]!
    const changed = this.queries.cameras.changed

    this.setupCamera(entity)
    this.updateCamera(changed[0])
  }

  private setupCamera(entity: Entity) {
    if (!entity) return

    const component = entity.getMutableComponent(CameraComponent)!
    const position = entity.getMutableComponent(Position)!
    const target = entity.getMutableComponent(CameraTarget)!
    const object = entity.getMutableComponent(Object3D)!
    
    if (component.instance) return

    const camera = new THREE.PerspectiveCamera(component.fov, component.aspect, component.near, component.far)
    camera.position.copy(position.value)
    camera.lookAt(target.value)
    camera.zoom = component.zoom
    camera.updateProjectionMatrix()

    object.value = camera
    component.instance = camera

    CameraManager.setActiveCamera(camera, entity)
  }

  private updateCamera(entity: Entity) {
    if (!entity) return

    const cameraComp = entity.getComponent(CameraComponent)!
    if (!cameraComp.instance) return

    const { fov, near, far, zoom, aspect } = cameraComp
    const camera = cameraComp.instance as THREE.PerspectiveCamera

    const needsUpdate = Object.entries({ fov, near, far, zoom, aspect }).some(([prop, value]) => 
      camera[prop as keyof typeof camera] !== value
    )

    if (needsUpdate) {
      Object.assign(camera, { fov, near, far, zoom, aspect })
      camera.updateProjectionMatrix()
    }
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(entries => {
      const entity = this.queries.cameras.results[0]
      if (!entity) return

      const entry = entries[0]
      if (!entry) return

      const component = entity.getMutableComponent(CameraComponent)
      if (!component || !component.instance) return

      const { width, height } = entry.contentRect
      const aspect = width / height

      if (Math.abs(component.aspect - aspect) > 0.0001) {
        component.aspect = aspect
        this.updateCamera(entity)
      }
    })

    const canvas = document.querySelector('canvas')
    if (canvas) this.resizeObserver.observe(canvas)
  }

  dispose() {
    this.resizeObserver?.disconnect()
  }
}
